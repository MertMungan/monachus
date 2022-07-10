import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchComponent from "../search/search";
import Browse from "./Browse";
import Stats from "./Stats";

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        centered
        className="mt-5"
        TabIndicatorProps={{
          style: { background: "#ed2419", color: "#ed2419 !important" },
        }}
      >
        <Tab label="Browse" {...a11yProps(0)} />
        <Tab label="Configuration" {...a11yProps(1)} />
        <Tab label="Stats" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Browse />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SearchComponent />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Stats />
      </TabPanel>
    </>
  );
}
