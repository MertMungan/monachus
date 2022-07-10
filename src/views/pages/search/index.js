import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useSkin } from "@hooks/useSkin";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

// COMPONENTS //
import Browse from "./Tabs/Browse";
import Stats from "./Tabs/Stats";
import ConfigurationComponent from "./search/search";
// COMPONENTS //

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.grey[50],
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

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
  const [value, setValue] = React.useState(0);
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
      <div class="row">
        <Nav
          className="header-navbar navbar container-fluid navbar navbar-expand-lg navbar-light position-fixed"
          style={{
            zIndex: 2,
            backgroundColor: skin === "dark" ? "#161d31" : "#f8f8f8",
            color: skin === "dark" ? "#d0d2d6" : "black",
            marginTop: "-28px",
          }}
          tabs
        >
          <div className="navbar-container d-flex content">
            <NavItem></NavItem>
            <NavItem>
              <NavLink
                active={active === "1"}
                onClick={() => {
                  toggle("1");
                }}
              >
                Browse
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "2"}
                onClick={() => {
                  toggle("2");
                }}
              >
                Configuration
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === "3"}
                onClick={() => {
                  toggle("3");
                }}
              >
                Stats
              </NavLink>
            </NavItem>
          </div>
        </Nav>
      </div>
      <br />
      <br />
      <br />
      <br />

      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <Browse />
        </TabPane>
        <TabPane tabId="2">
          <ConfigurationComponent />
        </TabPane>
        <TabPane tabId="3">
          <Stats />
        </TabPane>
      </TabContent>
    </>
  );
}
