import React from "react";
import { Theme, Content } from "@carbon/react";
import FcContent from "./components/FcContent";
import FcHeader from "./components/FcHeader";
import "./App.scss";

const App = () => {
  const printRef = React.useRef();
  return (
    <div ref={printRef}>
      <Theme theme="g100">
        <FcHeader />
        <Content>
          <FcContent/>
        </Content>
      </Theme>
    </div>
  );
};

export default App;
