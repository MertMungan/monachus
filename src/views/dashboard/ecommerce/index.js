import React, { useContext, useState, useEffect } from 'react'
import { Row, Col, Button, Input, Card, ButtonGroup } from 'reactstrap'
import CompanyTable from './CompanyTable'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import RevenueReport from './components/RevenueReport'
import MyResponsiveBar from './components/MyResponsiveBar'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'

import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// Constants
import { dayTime } from './data/constants'
import {
  query_01,
  query_02,
  query_03,
  query_04,
  query_05
} from './data/cubeQueries'

//CUBEJS_TOKEN
import { useCubeQuery } from '@cubejs-client/react'

const EcommerceDashboard = () => {
  const { colors } = useContext(ThemeColors),
    trackBgColor = '#e9ecef'

  const dayTimeList = dayTime()
  const [handleGranularity, setHandleGranularity] = useState('This year')
  const [justEventsCount, setJustEventsCount] = useState(0)
  const [rSelected, setRSelected] = useState(0)

  const firstQuery = useCubeQuery(query_01(handleGranularity))
  const secondQuery = useCubeQuery(query_02(handleGranularity))
  const barQuery = useCubeQuery(query_03(handleGranularity))
  const onlyEventsCount = useCubeQuery(query_04())
  const supportQuery = useCubeQuery(query_05(handleGranularity))

  useEffect(() => {
    setHandleGranularity(dayTimeList[rSelected])
  }, [rSelected])

  useEffect(() => {
    if (supportQuery?.resultSet) {
      setJustEventsCount(
        onlyEventsCount?.resultSet?.loadResponse?.results[0]?.data[0][
          'Events.count'
        ]
      )
    }
  }, [supportQuery])

  const renderButtonGroup = () => {
    return (
      <ButtonGroup size='sm'>
        {dayTimeList?.map((item, index) => {
          return (
            <Button
              outline
              key={index}
              color='primary'
              onClick={() => setRSelected(index)}
              active={rSelected === index}
            >
              {item}
            </Button>
          )
        })}
      </ButtonGroup>
    )
  }

  return (
    <>
      <Card>
        <div className='invoice-list-table-header w-100 py-2'>
          <Row className='match-height'>
            <Col lg='12' className='d-flex align-items-end px-0 px-lg-1'>
              <div className='d-flex align-items-center mr-2'>
                {renderButtonGroup()}
              </div>
            </Col>
          </Row>
        </div>
      </Card>
      <div id='dashboard-ecommerce'>
        <Row className='match-height'>
          <Col lg='12' xs='12'>
            <RevenueReport
              barQueryData={barQuery}
              onlyEventCount={justEventsCount}
              supportQuery={supportQuery}
            />
          </Col>
        </Row>

        <Row className='match-height' style={{ height: 500 }}>
          <Col md='6' xs='12'>
            <MyResponsiveBar cubeQuery={firstQuery} legend='Events' />
          </Col>
          <Col md='6' xs='12'>
            <MyResponsiveBar cubeQuery={secondQuery} legend='Alerts' />
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
      </div>
    </>
  )
}

export default EcommerceDashboard
