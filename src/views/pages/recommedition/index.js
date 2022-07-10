import React, { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Kpi from "./components/Kpi";
import Users from "./components/Users";
import Items from "./components/Items";
import { useSkin } from "@hooks/useSkin";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import "./disableFocus.css";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [active, setActive] = useState("1");
  const [value, setValue] = useState(0);
  const [skin, setSkin] = useSkin();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <>
      <Nav
        className="header-navbar container-fluid navbar-light position-fixed pt-1"
        style={{
          zIndex: 2,
          backgroundColor: skin === "dark" ? "#161d31" : "#f8f8f8",
          color: skin === "dark" ? "#d0d2d6" : "black",
          marginTop: "-28px",
        }}
        tabs
      >
        <NavItem>
          <NavLink
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            KPI
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            Users
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "3"}
            onClick={() => {
              toggle("3");
            }}
          >
            Items
          </NavLink>
        </NavItem>
      </Nav>
      <br />
      <br />
      <br />
      <br />
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <Kpi />
        </TabPane>
        <TabPane tabId="2">
          <Users />
        </TabPane>
        <TabPane tabId="3">
          <Items />
        </TabPane>
      </TabContent>
    </>
  );
}
