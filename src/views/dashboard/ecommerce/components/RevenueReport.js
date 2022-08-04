import { useEffect, useState } from 'react'
import { Card, CardTitle, Row, Col } from 'reactstrap'
import Chart from 'react-apexcharts'
import { useCubeQuery } from '@cubejs-client/react'
import SupportTracker from './SupportTracker'
import { useContext } from 'react'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { chartOptionsData } from '../data/cubeQueries'

// import Spinner from '../../@core/components/spinner/Fallback-spinner'
import ComponentSpinner from '../../../../@core/components/spinner/Loading-spinner'

const RevenueReport = ({ barQueryData, onlyEventCount, supportQuery }) => {
  const [chartOptions, setChartOptions] = useState(null)
  const [allEventsCount, setAllEventsCount] = useState(0)
  const [eventsCountList, setEventsCountList] = useState([0])
  const [alertsCountList, setAlertsCountList] = useState([0])
  const { colors } = useContext(ThemeColors)

  const pivot = barQueryData?.resultSet?.pivot()

  useEffect(() => {
    if (pivot?.length > 0) {
      const categoriesForDisplay = pivot?.map(
        (item) => item.xValues[0].split('T')[0]
      )
      const eventsValues = pivot?.map((item) =>
        item.yValuesArray?.length > 0 ? parseInt(item.yValuesArray[1][1]) : 0
      ) || [0]
      const alarmsValues = pivot.map((item) =>
        item.yValuesArray?.length > 0 ? -parseInt(item.yValuesArray[0][1]) : 0
      )

      const options = chartOptionsData(
        categoriesForDisplay,
        eventsValues,
        alarmsValues,
        colors
      )
      setEventsCountList(eventsValues)
      setAlertsCountList(alarmsValues)
      setChartOptions(options)
    }
  }, [barQueryData])

  useEffect(() => {
    if (onlyEventCount > 0) {
      setAllEventsCount(onlyEventCount)
    }
  }, [onlyEventCount])

  return (
    <Card className='card-revenue-budget'>
      <Row className='mx-0'>
        <Col className='revenue-report-wrapper' lg='8' md='12' sm='12' xs='12'>
          <div className='d-sm-flex justify-content-between align-items-center mb-3'>
            <CardTitle className='mb-50 mb-sm-0'>
              Alert - Event Report
            </CardTitle>
            <div className='d-flex align-items-center'>
              <div className='d-flex align-items-center mr-2'>
                <span className='bullet bullet-primary mr-50 cursor-pointer'></span>
                <span>Alert</span>
              </div>
              <div className='d-flex align-items-center'>
                <span className='bullet bullet-warning mr-50 cursor-pointer'></span>
                <span>Events</span>
              </div>
            </div>
          </div>
          {chartOptions &&
          chartOptions?.series?.length > 0 &&
          chartOptions?.series[0]?.data !== null &&
          chartOptions?.series[1]?.data !== null ? (
            <Chart
              id='revenue-report-chart'
              type='bar'
              height='400'
              options={chartOptions.options}
              series={chartOptions.series}
            />
          ) : (
            <div style={{ height: 400 }}>
              <ComponentSpinner />
            </div>
          )}
        </Col>
        <Col className='budget-wrapper' lg='4' md='12' sm='12' xs='12'>
          {allEventsCount > 0 ? (
            <SupportTracker
              primary={colors.primary.main}
              danger={colors.danger.main}
              allEventsCountList={allEventsCount}
              eventsValues={eventsCountList}
              alarmsValues={alertsCountList}
              supportQuery={supportQuery}
            />
          ) : (
            <div style={{ height: 400 }}>
              <ComponentSpinner />
            </div>
          )}
        </Col>
      </Row>
    </Card>
  )
}

export default RevenueReport
