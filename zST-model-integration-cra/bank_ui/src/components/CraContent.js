import React, { useState } from "react";
import classes from "./CraContent.module.scss";
import CalculationResultDashboard from "./module/CalculationResultDashboard";
import CalculationResultsPage from "./module/CraIncident";
const FcContent = React.forwardRef((props, ref) => {


  return (
    <div className={classes.CalcContainer} ref={ref}>
      <div></div>
      <div className={classes.ResultContainer}>
        {
      props.isDashboard?
      <CalculationResultDashboard />
      :<CalculationResultsPage/>}
      </div>
    </div>
  );
})
export default FcContent;
