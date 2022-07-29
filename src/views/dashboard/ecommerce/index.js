import { useContext, useState } from 'react'
import { Row, Col } from 'reactstrap'
import CompanyTable from './CompanyTable'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import RevenueReport from './components/RevenueReport'
import MyResponsiveBar from './components/MyResponsiveBar'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'

// CUBEJS
import cubejs from '@cubejs-client/core'
import { CubeProvider } from '@cubejs-client/react'

const API_URL = 'http://164.90.232.177:4000'
const CUBEJS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTg5MTE5MzcsImV4cCI6MTY1ODk5ODMzN30._h730j598j57D_2BYNtMEPm4YV0Rmz4yCKjLv4AUY9c'
const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: `${API_URL}/cubejs-api/v1`
})
// CUBEJS

import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

const EcommerceDashboard = () => {
  const { colors } = useContext(ThemeColors),
    trackBgColor = '#e9ecef'

  const [selectedGarnule, setSelectedGarnule] = useState('Last 7 days')

  const queryData = {
    timeDimensions: [
      {
        dimension: 'Alarms.alarmDatetime',
        granularity: 'day'
      }
    ],
    order: {
      'Alarms.count': 'desc'
    },
    measures: ['Alarms.count'],
    dimensions: ['Alarms.ruleId']
  }
  const queryData2 = {
    timeDimensions: [
      {
        dimension: 'Alarms.alarmDatetime',
        granularity: 'day'
      }
    ],
    order: {
      'Alarms.count': 'desc'
    },
    measures: ['Alarms.count'],
    dimensions: ['Alarms.eventType']
  }

  return (
    <div id='dashboard-ecommerce'>
      <CubeProvider cubejsApi={cubejsApi}>
        {/* <Row className='match-height'>
          <Col xl='4' md='6' xs='12'>
            <CardMedal />
          </Col>
          <Col xl='8' md='6' xs='12'>
            <StatsCard cols={{ xl: '3', sm: '6' }} />
          </Col>
        </Row> */}
        <Row className='match-height'>
          {/* <Col lg='4' md='12'>
            <Row className='match-height'>
              <Col lg='6' md='3' xs='6'>
                <OrdersBarChart warning={colors.warning.main} />
              </Col>
              <Col lg='6' md='3' xs='6'>
                <ProfitLineChart info={colors.info.main} />
              </Col>
              <Col lg='12' md='6' xs='12'>
                <Earnings success={colors.success.main} />
              </Col>
            </Row>
          </Col> */}
          <Col lg='12' md='12' xs='12'>
            <RevenueReport
              setSelectedGarnule={setSelectedGarnule}
              selectedGarnule={selectedGarnule}
            />
          </Col>
        </Row>
        <Row className='match-height' style={{ height: 500, width: '100%' }}>
          <Col md='6' xs='12'>
            <MyResponsiveBar cubeQuery={queryData} legend='Events' />
          </Col>
          <Col md='6' xs='12'>
            <MyResponsiveBar cubeQuery={queryData2} legend='Alerts' />
          </Col>
        </Row>
        <Row className='match-height'>
          <Col lg='8' xs='12'>
            <CompanyTable />
          </Col>
          <Col lg='4' md='6' xs='12'>
            <CardMeetup />
          </Col>
          <Col lg='4' md='6' xs='12'>
            <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />
          </Col>
          <Col lg='4' md='6' xs='12'>
            <GoalOverview success={colors.success.main} />
          </Col>
          <Col lg='4' md='6' xs='12'>
            <CardTransactions />
          </Col>
        </Row>
      </CubeProvider>
    </div>
  )
}

export default EcommerceDashboard
