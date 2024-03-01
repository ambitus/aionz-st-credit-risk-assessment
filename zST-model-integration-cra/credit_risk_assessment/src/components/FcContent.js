import React, { useState } from "react";
import classes from "./FcContent.module.scss";
import FcCalculatorPage from "./FcCalculatorPage";
import FcBackground from "./FcBackground";
import CalculationResultsPage from "./modules/CalculationResult";
const FcContent = React.forwardRef((props, ref) => {
  const [isCalculated, setIsCalculated] = useState(false);
  const [x, setX] = useState(null);

  return (
    <div className={classes.CalcContainer} ref={ref}>
      <div>
        <FcCalculatorPage setX={setX} setIsCalculated={setIsCalculated} />
      </div>
      <div className={classes.ResultContainer}>
        {isCalculated ? <CalculationResultsPage x={x} />
          : <FcBackground className="hide-when-print" />}
      </div>
    </div>
  );
})
export default FcContent;
