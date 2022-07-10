import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import TemplatesCard from './cards/TemplatesCard'
import MessagingTemplates from './cards/MessagingTemplates'
import EmailTemplate from './cards/EmailTemplate'
const Design = () => {
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="nav-vertical">
      <Nav tabs className="nav-left">
        <NavItem>
          <NavLink
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            Templates
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            Messaging Templates
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "3"}
            onClick={() => {
              toggle("3");
            }}
          >
            Email Templates
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <TemplatesCard />
        </TabPane>
        <TabPane tabId="2">
          <MessagingTemplates />
        </TabPane>
        <TabPane tabId="3">
          <EmailTemplate />
        </TabPane>
      </TabContent>
    </div>
  );
};
export default Design;
