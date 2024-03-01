import classes from "./CraDashboard.module.scss";
import { Stack } from "@carbon/react";
import React, { Component } from 'react';
import CanvasJSReact from '../../canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class CalculationResultDashboard extends Component {
  constructor() {
    super();
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }
  toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }
  render() {
    const amount_options = {
      animationEnabled: true,
      title: {
        text: "High Credit Risk Amount($) Trend Analytics"
      },
      axisY: {
        title: "Loan Amount",
        suffix: "K ($)"
      },
      data: [{
        type: "splineArea",
        xValueFormatString: "",
        yValueFormatString: "",
        showInLegend: true,
        legendText: " ",
        dataPoints: [
          { y: 4228, label: "Jan'22" },
          { y: 3643, label: "Feb'22" },
          { y: 3833, label: "Mar'22" },
          { y: 3866, label: "Apr'22" },
          { y: 3854, label: "May'22" },
          { y: 3774, label: "Jun'22" },
          { y: 3775, label: "Jul'22" },
          { y: 3908, label: "Aug'22" },
          { y: 3860, label: "Sept'22" },
          { y: 3262, label: "Oct'22" },
          { y: 3857, label: "Nov'22" },
          { y: 4049, label: "Dec'22" },
          { y: 4243, label: "Jan'23" },
          { y: 3831, label: "Feb'23" },
          { y: 4179, label: "Mar'23" }
        ]
      }]
    }
    const options = {
      animationEnabled: true,
      title: {
        text: "Credit Risk by HomeOwnership"
      },
      subtitles: [{
        text: "Home Ownership",
        verticalAlign: "center",
        fontSize: 18,
        dockInsidePlotArea: true
      }],
      legend: {
        horizontalAlign: "right",
        verticalAlign: "center",
        reversed: false
      },
      data: [{
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: "RENT", y: 57.06 },
          { name: "MORTGAGE", y: 34.71 },
          { name: "OWN", y: 7.73 },
          { name: "OTHER", y: 0.5 }
        ]
      }]
    }
    const full_options = {
      animationEnabled: true,
      title: {
        text: "Credit Risk Cases"
      },
      subtitles: [{
        text: "Credit Risk Cases",
        verticalAlign: "center",
        fontSize: 18,
        dockInsidePlotArea: true
      }],
      legend: {
        horizontalAlign: "right",
        verticalAlign: "center",
        reversed: false
      },
      data: [{
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}:{y}",
        yValueFormatString: "#,###",
        dataPoints: [
          { color: "#D64550", name: "HIGH RISK", y: 5745 },
          { color: "#408D40", name: "LOW RISK", y: 26836 },
        ]
      }]
    }
    const otherOptions = {
      animationEnabled: true,
      title: {
        text: "Credit Risk Trend Analytics"
      },
      axisY: {
        title: "Number of Requests"
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "spline",
        name: "Low Risk",
        color: "#408D40",
        showInLegend: true,
        dataPoints: [
          { y: 1875, label: "Jan'22" },
          { y: 1651, label: "Feb'22" },
          { y: 1850, label: "Mar'22" },
          { y: 1785, label: "Apr'22" },
          { y: 1801, label: "May'22" },
          { y: 1793, label: "Jun'22" },
          { y: 1807, label: "Jul'22" },
          { y: 1762, label: "Aug'22" },
          { y: 1760, label: "Sept'22" },
          { y: 1847, label: "Oct'22" },
          { y: 1763, label: "Nov'22" },
          { y: 1762, label: "Dec'22" },
          { y: 1863, label: "Jan'23" },
          { y: 1641, label: "Feb'23" },
          { y: 1876, label: "Mar'23" }
        ]
      },
      {
        type: "spline",
        name: "High Risk",
        showInLegend: true,
        dataPoints: [
          { y: 416, label: "Jan'22" },
          { y: 365, label: "Feb'22" },
          { y: 396, label: "Mar'22" },
          { y: 381, label: "Apr'22" },
          { y: 398, label: "May'22" },
          { y: 367, label: "Jun'22" },
          { y: 379, label: "Jul'22" },
          { y: 391, label: "Aug'22" },
          { y: 358, label: "Sept'22" },
          { y: 343, label: "Oct'22" },
          { y: 376, label: "Nov'22" },
          { y: 398, label: "Dec'22" },
          { y: 416, label: "Jan'23" },
          { y: 354, label: "Feb'23" },
          { y: 407, label: "Mar'23" }
        ]
      }]
    }
    const data_options = {
      animationEnabled: true,
      theme: "light1",
      title: {
        text: "Credit Risk By Loan Intent"
      },
      axisX: {
        valueFormatString: ""
      },
      axisY: {
        prefix: ""
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries
      },
      data: [{
        type: "stackedBar",
        name: "High Credit Risks",
        showInLegend: "true",
        color: "#D64550",
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: [
          { label: "EDUCATION", y: 1102 },
          { label: "MEDICAL", y: 1062 },
          { label: "VENTURE", y: 992 },
          { label: "PERSONAL", y: 958 },
          { label: "DEBTCONSOLIDATION", y: 935 },
          { label: "HOMEIMPROVEMENT", y: 696 }
        ]
      },
      {
        type: "stackedBar",
        name: "Low Credit Risks",
        showInLegend: "true",
        color: "#408D40",
        xValueFormatString: "",
        yValueFormatString: "",
        dataPoints: [
          { label: "EDUCATION", y: 5351 },
          { label: "MEDICAL", y: 5009 },
          { label: "VENTURE", y: 4727 },
          { label: "PERSONAL", y: 4563 },
          { label: "DEBTCONSOLIDATION", y: 4277 },
          { label: "HOMEIMPROVEMENT", y: 2909 }
        ]
      }
      ]
    }

    return (
      <Stack>
        <p>
          <span style={{ fontSize: "24px" }} className={classes.Heading1}><b>{"Credit Risk Activity"}</b></span>
        </p>
        <br></br>
        <p>
          <table>
            <tr style={{ minBlockSize: "12px" }}>
              <td>
                <p className={classes.P3}>Credit Risk Customers</p>
              </td>
              <td>
                <p>
                  <span style={{ color: "orange", fontSize: "36px" }} className={classes.P2}>17%↓</span>
                  <span className={classes.P1}> of Active Customer</span>
                </p>
              </td>
              <td>
                <p className={classes.P3}>Growth of Credit Risk</p>
              </td>

              <td>
                <p className={classes.P3}>Loss(current)($)</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style={{ color: "grey", fontSize: "36px" }} className={classes.P2}>5745↓</p>
              </td>
              <td>
                <p style={{ textAlign: "left" }} className={classes.P3}>Active Customers:32581</p>
              </td>
              <td>
                <p style={{ color: "orange", fontSize: "36px" }} className={classes.P2}>-25%↓</p>
              </td>
              <td>
                <p style={{ color: "orange", fontSize: "36px" }} className={classes.P2}>58158700↓</p>
              </td>
            </tr>
          </table>
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
          <span style={{ fontSize: "24px" }} className={classes.Heading1}><b>{"CREDIT RISK ASSESSMENT"}</b></span>
        </p>
        <div
          className={[classes.DivBorderBottom].join(
            " "
          )}
        >
          <div>
            <CanvasJSChart options={data_options}
              onRef={ref => this.chart = ref}
            />
            </div>
        </div>
        <div
          className={[classes.CalcResultContainer, classes.DivBorderBottom].join(
            " "
          )}
        >
          <div style={{ width: "80%" }}>
            <CanvasJSChart options={options}
              onRef={ref => this.chart = ref}
            />
          </div>
          <div style={{ width: "150%" }}>
            <CanvasJSChart options={full_options}
              onRef={ref => this.chart = ref}
            />
          </div>


        </div>
        <div
          className={[classes.DivBorderBottom].join(
            " "
          )}
        >
          <div>
            <CanvasJSChart options={otherOptions}
              onRef={ref => this.chart = ref}
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
          </div>
        </div>
        <div
          className={[classes.DivBorderBottom].join(
            " "
          )}
        >
          <div>
            <CanvasJSChart options={amount_options}
              onRef={ref => this.chart = ref}
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
          </div>
        </div>
      </Stack>
    );
  }
}
export default CalculationResultDashboard;
