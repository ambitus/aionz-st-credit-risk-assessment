import os
import json
import random
import requests
import logging
import sqlalchemy
import urllib.parse
from sys import exit
from contextlib import asynccontextmanager
from pydantic import BaseModel
from sqlalchemy.sql import text
from fastapi import FastAPI, Query, status
from fastapi.logger import logger
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.ext.declarative import declarative_base
from fastapi.middleware.cors import CORSMiddleware


DEBUG = False
DEMO_MODE = True
if ('DEBUG' in os.environ):
    DEBUG = os.environ['DEBUG']

class InvalidWMLzPasswordException(Exception):
    "Raised when the WMLz Password has been expired"
    pass

# Logging
LOGLEVEL = os.environ.get('LOGLEVEL', 'DEBUG' if DEBUG else 'INFO').upper()
logger.setLevel(LOGLEVEL)

@asynccontextmanager
async def lifespan(app: FastAPI):
    get_authentication()
    yield

app = FastAPI(lifespan=lifespan, debug=True)

def get_authentication():
    if ('WML_URL' in os.environ):
        url = os.environ['WML_URL'] + '/auth/generateToken'
    else:
        print("WML_URL environment variable not set")
        exit(16)
    if ('WML_USER' in os.environ):
        username = os.environ['WML_USER']
    else:
        print("WML_USER environment variable not set")
        exit(16)
    if ('WML_PASS' in os.environ):
        password = os.environ['WML_PASS']
    else:
        print("WML_PASS environment variable not set")
        exit(16)
    payload = json.dumps({
        "username": username,
        "password": password
    })
    headers = {
        'Content-Type': 'application/json',
        'Control': 'no-cache'
    }
    response = requests.request(
        "POST", url, headers=headers, data=payload, verify=False)
    auth_response_json = response.json()
    try:
        auth_token = auth_response_json["token"]
    except:
        raise InvalidWMLzPasswordException
    with open("token.txt","w") as fw:
        fw.write(auth_token)
    return auth_token

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static", html=True), name="static")

def get_token():
    with open("token.txt","r") as fr:
        auth_token=fr.read()
    return auth_token

class User(BaseModel):
    age: int
    annual_income: int
    emp_length: int
    loan_amount: int
    loan_intent: str = Query("PERSONAL", enum=["EDUCATION", "PERSONAL", "MEDICAL", "VENTURE",
                                                                        "HOMEIMPROVEMENT", "DEBTCONSOLIDATION"])
    home_ownership: str = Query("RENT", enum=["RENT", "OWN", "MORTGAGE"])

def get_predictiion(result):
    url = "set SCORING_URL env var"
    if ('SCORING_URL' in os.environ):
        url = os.environ['SCORING_URL']
    else:
        print("SCORING_URL environment variable not set")
        exit(16)
    payload = json.dumps(result)
    token = get_token()
    headers = {
    'Authorization': "Bearer %s" % token,
    'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, data=payload, verify=False)
    x = response.json()
    if type(x)!= list and(x['code'] == "WML_OS_0015" or x['code'] == "WML_OS_0016"):
        try:
            token=get_authentication()
        except InvalidWMLzPasswordException:
            raise InvalidWMLzPasswordException
        headers = {
        'Authorization': "Bearer %s" % token,
        'Content-Type': 'application/json'
        }
        response = requests.request("POST", url, headers=headers, data=payload, verify=False)
    return (response.text)

@app.post('/cra/predictwml')
async def triton_prediction_data(user:User):
    random_loan_percent_income = round(random.uniform(0.09, 0.63), 2)
    random_loan_grade = random.choice(["A", "B", "C", "D"])
    random_loan_int_rate = round(random.uniform(7.9, 13.47), 2)
    random_cb_person_default_on_file = random.choice(["Y", "N"])
    random_cb_person_cred_hist_length = random.randint(2, 20)
    my_data = {
        "person_age": user.age,
        "person_income": user.annual_income,
        "person_emp_length": user.emp_length,
        "person_home_ownership": user.home_ownership,
        "loan_intent": user.loan_intent,
        "loan_amnt": user.loan_amount,
        "loan_percent_income": random_loan_percent_income,
        "loan_grade": random_loan_grade,
        "loan_int_rate": random_loan_int_rate,
        "cb_person_default_on_file": random_cb_person_default_on_file,
        "cb_person_cred_hist_length": random_cb_person_cred_hist_length,
        "loan_status": -1
    }
    result = [my_data]

    headers = {'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'}

    try:
        updated_data = json.loads(get_predictiion(result))
    except InvalidWMLzPasswordException:
        return JSONResponse(content="Invalid WMLz Password. Please contact the administrator", status_code=400)
    if updated_data:
        for i, data1 in enumerate(updated_data):
            print(data1)
            if data1['probability(0)'] >= data1['probability(1)']:
                result[i]["loan_status"] = 0
            else:
                result[i]["loan_status"] = 1

    return JSONResponse(content=result, status_code=200, headers=headers)
