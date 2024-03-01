import {
  SideNav, SideNavItems, SideNavMenuItem,
 Header, SkipToContent, HeaderName
} from "@carbon/react";
import { Dashboard, Table, User} from "@carbon/react/icons";
import React from "react";
import classes from "./CraHeader.module.scss";

const CraHeader = React.forwardRef((props) => {
  const {setIsDashboard, onClickSideNavExpand, isSideNavExpanded} = props;
  
  const showDashboard = ()=>{
    setIsDashboard(true);
  };
  const showInci = ()=>{
    setIsDashboard(false);
  };

  
    return (
    <Header aria-label="Acme Credit Risk Assessment Demo">
    <SkipToContent />  
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
            ADMIN XYZ BANK  
          </p>
          <p className={classes.P3A}>
            BANKXYZ###
          </p>
  </div>

 

    </div>
    <span>&nbsp;</span>
    <User className={classes.iconUser}></User>

    </HeaderName>


     <SideNav
       aria-label="Side navigation"
       isRail
       expanded={isSideNavExpanded}
       onOverlayClick={onClickSideNavExpand}
      >
       <SideNavItems >
       <SideNavMenuItem  onClick={showDashboard}>
       <Dashboard></Dashboard> Credit Risk Activity Dashboard
                </SideNavMenuItem>
       <SideNavMenuItem  className="demo-icon-example" onClick={showInci}>
       <Table></Table> Credit Risk Incident
                </SideNavMenuItem>
       </SideNavItems>
     </SideNav>
   </Header>);
})


export default CraHeader;