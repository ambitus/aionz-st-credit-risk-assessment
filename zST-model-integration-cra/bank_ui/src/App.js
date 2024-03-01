import React, { useState } from "react";
import { Theme,Content } from "@carbon/react";
import CraHeader from "./components/CraHeader";
import FcContent from "./components/CraContent";
import "./App.scss";


const App = () => {
  const [isDashboard, setIsDashboard] = useState(true);

  const printRef = React.useRef();
  return (
    <div ref={printRef}>
      <Theme>
        <CraHeader setIsDashboard={setIsDashboard}/>
      { <Content>
          <FcContent isDashboard={isDashboard}/>
        </Content>} 
      </Theme>
    </div>
  );
};

// export default App;
// import React, { Component } from 'react';
// import CanvasJSReact from './canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
// class App extends Component {	
// 	render() {
// 		const options = {
// 			animationEnabled: true,
// 			exportEnabled: true,
// 			theme: "dark2", // "light1", "dark1", "dark2"
// 			title:{
// 				text: "Trip Expenses"
// 			},
// 			data: [{
// 				type: "pie",
// 				indexLabel: "{label}: {y}%",		
// 				startAngle: -90,
// 				dataPoints: [
// 					{ y: 20, label: "Airfare" },
// 					{ y: 24, label: "Food & Drinks" },
// 					{ y: 20, label: "Accomodation" },
// 					{ y: 14, label: "Transportation" },
// 					{ y: 12, label: "Activities" },
// 					{ y: 10, label: "Misc" }	
// 				]
// 			}]
// 		}
		
// 		return (
// 		<div>
// 			<CanvasJSChart options = {options} 
// 				/* onRef={ref => this.chart = ref} */
// 			/>
// 			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 		</div>
// 		);
// 	}
// }
 
export default App;  