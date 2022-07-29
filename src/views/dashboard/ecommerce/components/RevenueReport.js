import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardTitle,
  Row,
  Col,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CardBody,
  CardText,
  Media
} from 'reactstrap'
import Chart from 'react-apexcharts'
import cubejs from '@cubejs-client/core'
import { useCubeQuery } from '@cubejs-client/react'
import SupportTracker from './SupportTracker'
import { useContext } from 'react'
import { ThemeColors } from '@src/utility/context/ThemeColors'

const API_URL = 'http://164.90.232.177:4000'
const CUBEJS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTg5MTE5MzcsImV4cCI6MTY1ODk5ODMzN30._h730j598j57D_2BYNtMEPm4YV0Rmz4yCKjLv4AUY9c'
const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: `${API_URL}/cubejs-api/v1`
})

const RevenueReport = (setSelectedGarnule, selectedGarnule = 'Last 7 days') => {
  const [data, setData] = useState(null)
  const [chartOptions, setChartOptions] = useState({})
  const { colors } = useContext(ThemeColors)

  const { resultSet, isLoading, error, progress } = useCubeQuery({
    measures: ['Alarms.count', 'Events.count'],
    timeDimensions: [
      {
        dimension: 'Alarms.alarmDatetime',
        granularity: 'day'
        // dateRange: 'All time'
      }
    ],
    order: {
      'Alarms.alarmDatetime': 'asc'
    },
    limit: 7
  })

  useEffect(() => {
    axios
      .get('/card/card-analytics/revenue-report')
      .then((res) => setData(res.data))
  }, [])

  useEffect(() => {
    if (resultSet?.loadResponse) {
      const { data } = resultSet.loadResponse.results[0]
      const categoriesForDisplay = data.map(
        (item) => item['Alarms.alarmDatetime'].split('T')[0]
      )
      const eventsValues = data.map((item) => parseInt(item['Events.count']))
      const alarmsValues = data.map((item) => -parseInt(item['Alarms.count']))
      setChartOptions({
        options: {
          chart: {
            stacked: true,
            type: 'bar',
            toolbar: { show: false }
          },
          grid: {
            padding: {
              top: -20,
              bottom: -10
            },
            yaxis: {
              lines: { show: false }
            }
          },
          xaxis: {
            categories: categoriesForDisplay,
            labels: {
              style: {
                colors: '#b9b9c3',
                fontSize: '0.86rem'
              }
            },
            axisTicks: {
              show: false
            },
            axisBorder: {
              show: false
            }
          },
          legend: {
            show: false
          },
          dataLabels: {
            enabled: false
          },
          colors: [colors.primary.main, colors.warning.main],
          plotOptions: {
            bar: {
              columnWidth: '17%',
              endingShape: 'rounded'
            },
            distributed: true
          },
          yaxis: {
            labels: {
              style: {
                colors: '#b9b9c3',
                fontSize: '0.86rem'
              }
            }
          }
        },
        series: [
          {
            name: 'Events',
            data: eventsValues
          },
          {
            name: 'Alarms',
            data: alarmsValues
          }
        ]
      })
    }
  }, [resultSet])

  return data !== null ? (
    <Card className='card-revenue-budget'>
      <Row className='mx-0'>
        <Col className='revenue-report-wrapper' md='8' xs='12'>
          <div className='d-sm-flex justify-content-between align-items-center mb-3'>
            <CardTitle className='mb-50 mb-sm-0'>
              Alarm - Event Report
            </CardTitle>
            <div className='d-flex align-items-center'>
              <div className='d-flex align-items-center mr-2'>
                <span className='bullet bullet-primary mr-50 cursor-pointer'></span>
                <span>Alarams</span>
              </div>
              <div className='d-flex align-items-center'>
                <span className='bullet bullet-warning mr-50 cursor-pointer'></span>
                <span>Events</span>
              </div>
            </div>
          </div>
          {chartOptions?.options && (
            <Chart
              id='revenue-report-chart'
              type='bar'
              height='400'
              options={chartOptions.options}
              series={chartOptions.series}
            />
          )}
        </Col>
        <Col className='budget-wrapper' md='4' xs='12'>
          <UncontrolledButtonDropdown>
            <DropdownToggle
              className='budget-dropdown'
              outline
              color='primary'
              size='sm'
              caret
            >
              2020
            </DropdownToggle>
            <DropdownMenu>
              {data.years.map((item) => (
                <DropdownItem className='w-100' key={item}>
                  {item}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <SupportTracker
            primary={colors.primary.main}
            danger={colors.danger.main}
            setSelectedGarnule={setSelectedGarnule}
            selectedGarnule={selectedGarnule}
          />
        </Col>
      </Row>
    </Card>
  ) : null
}

export default RevenueReport
