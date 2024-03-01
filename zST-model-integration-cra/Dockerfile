FROM icr.io/ibmz/python:3.9
RUN mkdir /app
WORKDIR /app
COPY . .
WORKDIR /app/api
RUN pip install --upgrade pip
RUN apt-get update \
&& apt-get install gcc libxml2 -y \
&& apt-get clean
RUN pip install --no-cache-dir -r requirements.txt
CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--port=80"]