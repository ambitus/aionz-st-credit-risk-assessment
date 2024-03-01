import classes from "./CalculationResult.module.scss";
import { Stack } from "@carbon/react";
import {
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  ToggletipLabel
} from "@carbon/react";
import { Information } from "@carbon/react/icons";
export default function CalculationResultsPage(props) {
  const { x } = props;
  return (
    <Stack>
      <p>
        <span className={classes.Heading1}>{"CREDIT REQUEST : "}</span>

        <span style={{ color: x?.loan_status ? "red" : "green", fontSize: "36px" }} className={classes.P2}><b>
          {x?.loan_status ? "REJECTED" : "APPROVED"}
        </b>
        </span>
        <br></br>
        <span> {x?.loan_status ? "*Bank will connect with you soon for more information and then revalidate your request" : "*Bank will connect with you soon for further details and then do disbursement of the Loan"} </span>
      </p>

      <div
        className={[classes.CalcResultContainer, classes.DivBorderBottom].join(
          " "
        )}
      >
        <div>
          <p className={classes.P1}>
          </p>
        </div>
        <div></div>
        <div></div>
      </div>
      <p>
        <span style={{ fontSize: "24px" }} className={classes.Heading1}><b>{"CREDIT EXPLAINABILITY"}</b></span>
      </p>
      <br></br>
      <br></br>
      <table>
          <tr style={{ minBlockSize: "12px" }}>
            <td>
              <p>
                <span className={classes.P2}>{props.x?.loan_percent_income}</span>
                <span style={{ fontSize: "24px" }} className={classes.P2}>%</span>
              </p>
            </td>
            <td>
              <p>
                <span className={classes.P2}>{props.x?.loan_int_rate}</span>
                <span style={{ fontSize: "24px" }} className={classes.P2}>%</span>
              </p>
            </td>
            <td>
              <p style={{ textAlign: "Left" }} className={classes.P2}>{props.x?.cb_person_cred_hist_length}</p>
            </td>
            <td>
              <p style={{ textAlign: "Left" }} className={classes.P2}>{props.x?.cb_person_default_on_file}</p>
            </td>
            <td>
              <p style={{ textAlign: "Left" }} className={classes.P2}>{props.x?.loan_grade}</p>
            </td>
          </tr>
          <br></br>
          <tr>
            <td>
            
            <p> <span className={classes.P3}> Loan Percent Income</span>
            &nbsp;
            <span>
            <Toggletip className={classes.TooltipSpacing}>
              <ToggletipButton>
                <Information className="hide-when-print" />
              </ToggletipButton>
              <ToggletipContent>
                <p>
                The percentage of person's income dedicated for the mortgage.
                </p>
              </ToggletipContent>
            </Toggletip>
            </span>
            </p>
            </td>
            <td>
            <p> <span className={classes.P3}> Loan Interest Rate</span>
            &nbsp;
            <span>
            <Toggletip className={classes.TooltipSpacing}>
              <ToggletipButton>
                <Information className="hide-when-print" />
              </ToggletipButton>
              <ToggletipContent>
                <p>
                The loan interest rate.
                </p>
              </ToggletipContent>
            </Toggletip>
            </span>
            </p>
            </td>
            <td>
            <p> <span className={classes.P3}> Credit History</span>
            &nbsp;
            <span>
            <Toggletip className={classes.TooltipSpacing}>
              <ToggletipButton>
                <Information className="hide-when-print" />
              </ToggletipButton>
              <ToggletipContent>
                <p>
                The person's credit history.
                </p>
              </ToggletipContent>
            </Toggletip>
            </span>
            </p>
            </td>
            <td>
            <p> <span className={classes.P3}> Defaulter History</span>
            &nbsp;
            <span>
            <Toggletip className={classes.TooltipSpacing}>
              <ToggletipButton>
                <Information className="hide-when-print" />
              </ToggletipButton>
              <ToggletipContent>
                <p>
                If the person has a default history with any Bank(Yes; No).
                </p>
              </ToggletipContent>
            </Toggletip>
            </span>
            </p>
            </td>
            <td>
            <p> <span className={classes.P3}>Loan Grade</span>
            &nbsp;
            <span>
            <Toggletip className={classes.TooltipSpacing}>
              <ToggletipButton>
                <Information className="hide-when-print" />
              </ToggletipButton>
              <ToggletipContent>
                <p>
                The loan grade (A, B, C, D, E, F, G).
                </p>
              </ToggletipContent>
            </Toggletip>
            </span>
            </p>
            </td>
          </tr>
        </table>
      <div
        className={[classes.CalcResultContainer, classes.DivBorderBottom].join(
          " "
        )}
      >
      </div>
      <div
        className={[classes.CalcResultContainer, classes.DivBorderBottom].join(
          " "
        )}
      >
        <div>
          <p className={classes.P4}>
          <span className={classes.bold}>
            Adopting artificial intelligence (AI){" "}
            </span>
            can help financial institution to make faster and
            smarter data driven decisions on credit risks. It handles extensive volume of borrower’s
            financial data in real time to identify meaningful insights and speed up credit applications to enhance customer satisfaction.<br></br>
            <br></br>
            Running advanced AI models directly in the mainframe environment is a 
            powerful innovation in an industry where an estimated 70% of global credit
            requests received to banks runs on IBM mainframes.<br></br>
            <br></br>
            <span style={{ fontSize: "24px" }} className={classes.bold}>
            AI models are compute-intensive.<br></br>
            <br></br>
            </span>
            When running these models off your transactional platform, the
            resulting latency and throughput can severely limit the percentage
            of transactions which can be scored in real time.
            <br></br>
            <br></br>
            With the IBM z16, you can{" "}
            <span className={classes.bold}>
              co-locate these models with your transactional systems
            </span>
            , driving significant new savings with real-time credit risk prevention.
          </p>
        </div>
        <div className={classes.div2}></div>
        <div className={classes.div3}>
          <p className={classes.P2}>
            Credit Risk Assessment
          </p>
          <p className={classes.P3A}>
            Leveraging AI on Z Systems
          </p>
        </div>
      </div>
      {/* <div>
        <Link href="https://www.ibm.com/downloads/cas/DOXY3Q94" target="_blank">
          <span className={classes.fakeLink}>
            *“Operationalizing Credit Risk on IBM z16”. Celent. April 2022.
          </span>
        </Link>
      </div> */}
    </Stack>
  );
}
