import React from "react";
import { Header, HeaderName} from "@carbon/react";
import classes from "./FcHeader.module.scss";
import {User} from "@carbon/react/icons";

export default function FcHeader(){
    return (<Header aria-label="Acme Credit Risk Assessment Demo">
    
    <HeaderName href="#" prefix="">
      
    <div
        className={[classes.CalcResultContainer, classes.ResultContainer].join(
          " "
        )}
    >
    <div>
    <p>
    <span className={classes.P5}>Acme Credit Risk Assessment Demo</span>
    <br></br>
    <span className={classes.P3}>
    *This application is only a Prototype not an IBM offering application
    </span>
    </p>
    </div>
    <div className={classes.div2}></div>
    <div className={classes.div2}>
          <p className={classes.P3A}>
            JAXXXXXX HXXX  
          </p>
          <p className={classes.P3A}>
            US123####
          </p>
  </div>
    </div>
    <span>&nbsp;</span>
    <User className={classes.iconUser}></User>

    </HeaderName>
    
  </Header>
  );
}
