       IDENTIFICATION DIVISION.
       PROGRAM-ID. CRAURL.
       DATA DIVISION.
       WORKING-STORAGE SECTION.

      * AUTHOR - MAHALAKSHMI V************************************
      *
      * SAMPLE PROGRAM TO SCORE RISK IN PROVIDING CREDIT
      * OUTPUT WILL BE IN FORM OF PROBABILITY(0) & PROBABILITY(1)
      * FIND FOR
      *   - @HOSTNAME and replace it with the Host name of URL
      *.  - @PORTNUM and replace it with the Port number of URL
      ************************************************************

       01 WS-WORK.
         03  ws-resp                   pic s9(8) BINARY.
         03  ws-resp2                  pic s9(8) BINARY.
         03  ws-sesstoken              pic x(8).
         03  ws-MESSAGE                pic x(40).
         03  ws-STEP                   pic x(40).
         03  ws-mediatype              pic x(56).
         03  ws-applid                 pic x(8).
         03  ws-recdata                pic x(500).
         03  ws-reclen                 pic s9(8) BINARY.
         03  ws-status                 pic s9(4) BINARY.
         03  ws-statuslen              pic s9(8) BINARY.
         03  ws-statusdata             pic x(50).
         03  ws-from                   pic x(250).
         03  ws-from-len               pic s9(3) BINARY.
         03  ws-path                   pic x(15).
         03  ws-path-len               pic s9(8) BINARY.
         03  ws-host                   pic x(17) value
                               '@HOSTNAME'.
         03  ws-portnumber             pic s9(8) BINARY value
                               @PORTNUM.
         03  ws-ownership              pic x(1).
         03  ws-loan-intent            pic x(1).
         03  ws-loan-grade             pic x(1).
         03  ws-default-onfile         pic x(1).

       01 WS-input.
          03 ws-input-age         PIC X(3).
          03 ws-input-income      PIC X(8).
          03 ws-input-ownership   PIC X(20).
          03 ws-input-length      PIC X(3).
          03 ws-input-intent      PIC X(20).
          03 ws-input-amt         PIC X(10).
          03 ws-input-PERC-INCOME PIC X(10).
          03 ws-input-grade       PIC X(1).
          03 ws-input-rate        PIC X(6).
          03 ws-input-default     PIC X(50).
          03 ws-input-hist-len    PIC X(2).

       01 WS-output.
          03 ws-model             pic x(25).
          03 ws-version           pic x(25).
          03 ws-outputs           pic x(25).
          03 ws-datatype          pic x(25).
          03 ws-shape             pic x(25).
          03 ws-loan-status       pic x(25).

       01  error-msg.
         03  err-msg                   pic x(40).
         03  err-resp                  pic x(8).
         03  err-resp2                 pic x(8).

       PROCEDURE DIVISION.

           PERFORM 0100-INITIALIZE.
           PERFORM 0200-CICS-INIT.
           PERFORM 0310-PASS-input.
           PERFORM 0400-CICS-MAIN.
           PERFORM 0600-CICS-RET.

           STOP RUN.

      *****************
       0100-initialize.
      *****************

           move spaces to ws-message
                          ws-step
                          ws-recdata
                          WS-statusdata
                          WS-PATH
                          ws-from
                          WS-STR4
                          WS-loan-intent
                          ws-ownership
                          ws-loan-grade
                          ws-default-onfile.

           move 0      to ws-status
                           ws-from-len.

       0100-initialize-END. EXIT.

      ****************
       0200-cics-init.
      ****************

      *Open URIMAP

           move 'web open '              to ws-step.
           EXEC CICS WEB OPEN
                     http
                     host(ws-host)
                     portnumber(ws-portnumber)
                     SESSTOKEN(ws-sesstoken)
                     RESP(ws-resp)
                     RESP2(ws-resp2)
           END-EXEC.

           PERFORM 0700-CHK-RESP
      * Using EXEC CICS ASSIGN extract the CICS APPLID

           move 'ASSIGN APPLID '         to ws-step.
           EXEC CICS ASSIGN
                     APPLID(ws-applid)
           END-EXEC.

           PERFORM 0700-CHK-RESP.

       0200-cics-init-END. EXIT.

      *****************
       0310-PASS-input.
      *****************

           move 'application/json' to ws-mediatype.
           move 50                 to ws-statuslen.
           move 200                to ws-reclen.

      *supply all the input values
           MOVE '25'               TO ws-input-age
           MOVE '6960'             TO ws-input-income
           MOVE 'MORTGAGE'         TO ws-input-ownership
           MOVE '1'                TO ws-input-length
           MOVE '55000'            TO ws-input-amt
           MOVE '/cra/predictwml' to ws-path
           MOVE LENGTH OF WS-PATH TO WS-PATH-LEN

           STRING '{"age":"' DELIMITED BY SPACES
                  ws-input-age        dELIMITED BY SPACES
                  '","annual_income":"' DELIMITED BY SPACES
                  ws-input-income     DELIMITED BY SPACES
                  '","emp_length":"'    DELIMITED BY SPACES
                  ws-input-length     DELIMITED BY SPACES
                  '","home_ownership":"' DELIMITED BY SPACES
                  ws-input-ownership   DELIMITED BY SPACES
                  '","loan_amount":"'    DELIMITED BY SPACES
                  ws-input-amt         DELIMITED BY SPACES
               '"}'                        DELIMITED BY SPACES
             INTO WS-FROM.


       0310-PASS-input-END. EXIT.
      ****************
       0400-CICS-MAIN.
      ****************

           move 'WEB CONVERSE '        to ws-step.

           EXEC CICS WEB CONVERSE
               SESSTOKEN   (WS-SESSTOKEN)
               POST
               MEDIATYPE   (WS-MEDIATYPE)
               PATH        (WS-PATH)
               PATHLENGTH  (WS-PATH-LEN)
               FROM        (ws-FROM)
               STATUSCODE  (WS-status)
               STATUSTEXT  (WS-statusdata)
               STATUSLEN   (Ws-statuslen)
               INTO        (Ws-recdata)
               TOLENGTH    (Ws-reclen)
               CLOSE
               RESP        (WS-RESP)
               RESP2       (WS-RESP2)
           END-EXEC.
           PERFORM 0700-CHK-RESP
           if ws-STATUS = 200
              perform 0510-gen-output
           end-if

           MOVE 'WEB CLOSE '      TO WS-STEP.
      * Close the Session to the Remote Server
           EXEC CICS WEB CLOSE SESSTOKEN(ws-sesstoken)
           END-EXEC.
           PERFORM 0700-CHK-RESP.

       0400-CICS-MAIN-end. exit.

      *****************
       0510-gen-output.
      *****************

           UNSTRING ws-recdata delimited by '"loan_status":'
               into ws-str4
                    ws-loan-status
           END-UNSTRING.

           DISPLAY  'Age: ' ws-INPUT-age
           DISPLAY  'Income: ' ws-INPUT-income
           DISPLAY  'Home Ownership: ' ws-INPUT-ownership
           DISPLAY  'Employment Length: ' ws-INPUT-length
           DISPLAY  'Loan amt: ' ws-INPUT-amt

           DISPLAY '***************************************'
           IF ws-loan-status(1:1) = '1'
              DISPLAY '***           HIGH RISK             ***'
           ELSE
              DISPLAY '***           LOW  RISK             ***'
           END-IF.
           DISPLAY '***************************************'.

       0510-gen-output-END. EXIT.

      ***************
       0600-CICS-RET.
      ***************
      * Return
           EXEC CICS RETURN
           END-EXEC.

       0600-CICS-END. EXIT.

      ***************
       0700-CHK-RESP.
      ***************

            MOVE SPACES     TO WS-MESSAGE
            IF WS-RESP NOT EQUAL ZERO
               MOVE WS-RESP     TO err-resp
               MOVE WS-RESP2    TO ERR-RESP2
               STRING WS-STEP DELIMITED BY SPACES
                      'failed with RESP = '
                      ERR-resp delimited by spaces
                      'RESP2 = '
                      ERR-resp2 delimited by spaces
                     into ws-message
               END-STRING
               display 'failure for ' ws-step
               display ws-message
               EXEC CICS RETURN
               END-EXEC
            else
               DISPLAY 'SUCCESS FOR ' WS-STEP
            end-if.

       0700-CHK-RESP-END. EXIT.