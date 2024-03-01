import { InlineNotification, Select, SelectItem } from "@carbon/react";
import React, { useState } from "react";
import {
  Toggletip,
  ToggletipLabel,
  ToggletipButton,
  ToggletipContent,
  FormGroup,
  Button
} from "@carbon/react";
import { Information } from "@carbon/react/icons";
import classes from "./FcCalculatorPage.module.scss";
import { NumberInput, Stack } from "@carbon/react";


const FcCalculatorPage = React.forwardRef((props, ref) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [ageInput, setAgeInput] = useState(18);
  const [employeeLength, setEmployeeLength] = useState(0);
  const [salaryAmount, setSalaryAmount] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanIntent, setloanIntent] = useState("EDUCATION");
  const [homeOwnership, sethomeOwnership] = useState("RENT");
  function onChangeLoan(eventData) {
    setloanIntent(eventData.target.value);
  }
  function onChangeOwner(eventData) {
    sethomeOwnership(eventData.target.value);
  }
  const onChangeAge = (_eventData, eventValue) => {
    setAgeInput(eventValue.value);
  };
  const onChangeEmpLength = (_eventData, eventValue) => {
    setEmployeeLength(eventValue.value);
  };
  const onChangeSalaryAmount = (_eventData, eventValue) => {
    setSalaryAmount(eventValue.value);
  };
  const onChangeLoanAmount = (_eventData, eventValue) => {
    setLoanAmount(eventValue.value);
  };


  const Allowance = () => {
    var prefix_url = "http://"+ window.location.host;
    var url=prefix_url+'/cra/predictwml';
    var input_data = '{"age":'+ ageInput + ',"annual_income":' + salaryAmount + ',"emp_length":' + employeeLength + ',"loan_amount":'+ loanAmount + ',"loan_intent":"' + loanIntent + '","home_ownership":"' + homeOwnership+'"}'
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: input_data,
    }).then(response => {     
      if (response.ok) {
          return response.json();
        } else {
          response.json().then(msg => 
            setErrorMessage(msg))
           throw new Error('Error fetching the results');
        }
   }).then(data => {
          props.setIsCalculated(true);
          var x = data[0];
          props.setX(x);
        }).catch(error => 
          setErrorMessage('Error fetching the results'));
  }

  let errorTemplate;
  if (errorMessage) {
    errorTemplate = (
      <InlineNotification
        statusIconDescription="notification"
        subtitle={errorMessage}
        title="Error"
        timeout={10000}
      />
    );
  } else {
    errorTemplate = null;
  }
  return (
    <>
      {errorTemplate}

      <div className={classes.PageContainer} ref={ref}>

        <Stack gap={6} ref={ref}>

          <NumberInput
            id="ageInput"
            invalidText="Age should be in between 18 to 120"
            label="Age(in years)"
            max={100}
            min={18}
            step={10}
            value={ageInput}
            onChange={onChangeAge}
          />
          <NumberInput
            id="employeeLength"
            invalidText="Employement length should be less than 100"
            label="Employement Length(in years)"
            max={100}
            min={0}
            step={10}
            value={employeeLength}
            onChange={onChangeEmpLength}
          />
          <NumberInput
            id="salaryAmount"
            invalidText="Please enter the correct Income"
            label="Income(in dollars)"
            max={1000000}
            min={0}
            step={1000}
            value={salaryAmount}
            onChange={onChangeSalaryAmount}
          />
          <NumberInput
            id="loanAmount"
            invalidText="Please enter the correct Loan Amount"
            label="Loan Amount(in dollars)"
            max={1000000}
            min={0}
            step={1000}
            value={loanAmount}
            onChange={onChangeLoanAmount}
          />
          <FormGroup legendText=" " ref={ref} className="hide-when-print">
            <ToggletipLabel>Loan Intent</ToggletipLabel>
            <Toggletip className={classes.TooltipSpacing}>
              <ToggletipButton>
                <Information className="hide-when-print" />
              </ToggletipButton>
              <ToggletipContent>
                <p>
                  The person's intent for the loan.
                </p>
              </ToggletipContent>
            </Toggletip>
            <br></br>
            <Select
              id="loanIntent"
              hideLabel={true}
              defaultValue="placeholder-item"
              onChange={onChangeLoan}
            >
              <SelectItem
                disabled
                hidden
                value={loanIntent}
                text="Choose an option"
              />
              <SelectItem value="EDUCATION" text="EDUCATION" />
              <SelectItem value="PERSONAL" text="PERSONAL" />
              <SelectItem value="DEBTCONSOLIDATION" text="DEBTCONSOLIDATION" />
              <SelectItem value="MEDICAL" text="MEDICAL" />
              <SelectItem value="VENTURE" text="VENTURE" />
              <SelectItem value="HOMEIMPROVEMENT" text="HOMEIMPROVEMENT" />
            </Select>
          </FormGroup>
          <FormGroup legendText=" " ref={ref} className="hide-when-print">
            <ToggletipLabel>Home Ownership</ToggletipLabel>
            <Toggletip className={classes.TooltipSpacing}>
              <ToggletipButton>
                <Information className="hide-when-print" />
              </ToggletipButton>
              <ToggletipContent>
                <p>
                  The type of home ownership.
                </p>
              </ToggletipContent>
            </Toggletip>
            <Select
              id="homeOwnership"
              hideLabel={true}
              defaultValue="placeholder-item"
              onChange={onChangeOwner}
            >
              <SelectItem
                disabled
                hidden
                value={homeOwnership}
                text="Choose an option"
              />
              <SelectItem value="RENT" text="RENT" />
              <SelectItem value="OWN" text="OWN" />
              <SelectItem value="MORTGAGE" text="MORTGAGE" />
            </Select>
          </FormGroup>

          <Button onClick={Allowance} className="hide-when-print">
            Submit
          </Button>
        </Stack>

      </div>

    </>
  );
});
export default FcCalculatorPage;