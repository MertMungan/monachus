import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import { useSkin } from '@hooks/useSkin'
import PropTypes from 'prop-types';
import Integration from './components/Integration'
import Topic from './components/Topic'
import Design from './components/Design'
import Users from './components/Users'

function index() {
  const [active, setActive] = useState('1')
  const [value, setValue] = useState(0);
  const [skin, setSkin] = useSkin()

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  
  return (
    <>
        <Nav className='header-navbar container-fluid navbar-light position-fixed pt-1' style={{ zIndex: 2, backgroundColor: skin === "dark" ? "#161d31" : "#f8f8f8", color: skin === "dark" ? "#d0d2d6" : "black", marginTop: "-28px"}} tabs>
          <NavItem>
            <NavLink
              active={active === '1'}
              onClick={() => {
                toggle('1')
              }}
            >
              Integration
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '2'}
              onClick={() => {
                toggle('2')
              }}
            >
              Topic
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '3'}
              onClick={() => {
                toggle('3')
              }}
            >
              Design
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '4'}
              onClick={() => {
                toggle('4')
              }}
            >
              Users
            </NavLink>
          </NavItem>
        </Nav>
        <br/>
        <br/>
        <br/>
        <br/>
        <TabContent className='py-50' activeTab={active}>
          <TabPane tabId='1'>
            <Integration/>
          </TabPane>
          <TabPane tabId='2'>
          <Topic/>
          </TabPane>
          <TabPane tabId='3'>
            <Design/>
          </TabPane>
          <TabPane tabId='4'>
            <Users/>
          </TabPane>
        </TabContent>
    </>
  )
}

export default index