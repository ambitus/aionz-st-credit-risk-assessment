# CICS-COBOL application using REST API

We can use our deployed MLz Credit Risk Assessment AI model and integrate it into different types of applications. Guidance on integrating the AI model into a sample CICS-COBOL application using REST API is below.

In this type of CICS-COBOL program, we will be inferencing the Credit Risk Assessment model deployed into the MLz using REST API calls to a hosted UI. The UI will be making call to the MLz for scoring and the result will be sent back to the CICS-COBOL program.

All sample code for this section is within
```
ai-st-credit-risk-assessment/zST-model-integration-CICS
```

Prerequisuties:
- Must have access to z/OS CICS Environment
- Must have MLz installed
- Must have model deployed with the CICS scoring server as scoring service

## Get the model details for inferencing
1. Go to MLz UI
2. Go to deployment tab
3. Click on action button for your deployed model (on right side)
4. Click view details
5. Copy scoring endpoint

## Integrate into CICS application
A sample COBOL file for the below integration can be found here: `ai-st-credit-risk-assessment/zST-model-integration-CICS/CRAURL.cbl`

1. Create connection with the hosted UI, using the Web Open command. Mention the host number & port number where the UI is hosted.
    # ![alt text](./imgs/1.png)

2. Using CICS ASSIGN get the  application id of the UI.
    # ![alt text](./imgs/2.png)

3. Supply all the inputs required by the UI service along with the API path of the inference.
    # ![alt text](./imgs/3.png)

4. Prepare the json data for the REST API call using COBOL’s String statement.
    # ![alt text](./imgs/4.png)

5. Use the web converse command in CICS to pass the data to the UI backend service and get the response.
    # ![alt text](./imgs/5.png)

6. Close the web connection to the server.
    # ![alt text](./imgs/6.png)

7. Process the response received from API call.
    # ![alt text](./imgs/7.png)

8. Handle the error codes as needed.
    # ![alt text](./imgs/8.png)

9. Compile the COBOL program (sample compile jcl provided here: `ai-st-credit-risk-assessment/zST-model-integration-CICS/COMPILE.jcl`).
    # ![alt text](./imgs/9.png)

10. Define the Transaction: (COPY PASTE THE LINES ONE-BY-ONE)
    ```
    CEDA DEFINE TRANS(<transaction name>) GROUP(<group name>)                
    PROGRAM(<program name>)                                 
    DESCRIPTION(<transaction description>)
    ```
    # ![alt text](./imgs/10.png)

11. Define the Program:
    ```
    CEDA DEFINE PROGRAM(<program name>) GROUP(<group name>)                
    LANGUAGE(COBOL) DESCRIPTION(<program description>)
    ```
    # ![alt text](./imgs/11.png)

12. Install the transaction and program in the CICS region. Execute the below mentioned command to define the transaction replacing  `transaction name` with the transaction name,  `group name` with the name of the group &  `program name` with name of the COBOL program,  `transaction description` with appropriate description for the transaction, finally,  `program description` with appropriate description for the program.
    ```
    CEDA INS TRANS(<transaction name>) GROUP(<group name>)
    ```
    # ![alt text](./imgs/12.png)
    ```
    CEDA INS PROGRAM(<program name>) GROUP(<group name>)
    ```
    # ![alt text](./imgs/13.png)

13. To invoke the transaction Type the transaction name and hit Enter. 
    # ![alt text](./imgs/14.png)

14. Verify the result 
- Lets go back to the TSO screen. Navigate to the Spool.
    # ![alt text](./imgs/15.png)

- To check the started task
    - Go to Spool pre `CICS*`. This will list the active CICS regions.
        # ![alt text](./imgs/16.png)
        # ![alt text](./imgs/17.png)
    - Put `?` to see the details of the Spool job.
        # ![alt text](./imgs/18.png)
    - Check the `CEEMSG` dataset name
        # ![alt text](./imgs/19.png)
    - Check the displays from the module.
        # ![alt text](./imgs/20.png)
