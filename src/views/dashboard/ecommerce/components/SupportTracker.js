import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Row,
  Col
} from 'reactstrap'
import Chart from 'react-apexcharts'

const SupportTracker = ({
  primary,
  danger,
  allEventsCountList = 0,
  eventsValues = [0],
  alarmsValues = [0],
  supportQuery
}) => {
  const options = {
    plotOptions: {
      radialBar: {
        size: 150,
        offsetY: 20,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: '65%'
        },
        track: {
          background: '#fff',
          strokeWidth: '100%'
        },
        dataLabels: {
          name: {
            offsetY: -5,
            fontFamily: 'Montserrat',
            fontSize: '1rem'
          },
          value: {
            offsetY: 15,
            fontFamily: 'Montserrat',
            fontSize: '1.714rem'
          }
        }
      }
    },
    colors: [danger],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [primary],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      dashArray: 8
    },
    labels: ['Triggered Events']
  }

  const [chartSeries, setChartSeries] = useState([0])
  const [alarmsCount, setAlarmsCount] = useState(0)
  const [eventsCount, setEventsCount] = useState(0)
  const [totalEventsCountState, setTotalEventsCountState] = useState(0)

  const rawData = supportQuery?.resultSet?.rawData()

  useEffect(() => {
    if (rawData?.length > 0) {
      const totalAlarmsList = rawData.map((rawData) => rawData['Alarms.count'])
      const totalEventsList = rawData.map(
        (rawData) => rawData['Alarms.countDistinctEvent']
      )
      const totalAlarms = alarmsValues.reduce(
        (a, b) => parseInt(a) + parseInt(b),
        0
      )
      const totalEvents = eventsValues.reduce(
        (a, b) => parseInt(a) + parseInt(b),
        0
      )
      setAlarmsCount(-totalAlarms)
      setEventsCount(totalEvents)
    }
  }, [alarmsValues, eventsValues])

  useEffect(() => {
    if (allEventsCountList) {
      setTotalEventsCountState(allEventsCountList)
    }
  }, [allEventsCountList])

  useEffect(() => {
    const alarmPercent = parseFloat(
      (eventsCount / totalEventsCountState) * 100
    ).toFixed(2)
    setChartSeries([alarmPercent])
  }, [totalEventsCountState, eventsCount])

  return chartSeries !== null ? (
    <Card>
      <CardHeader className='pb-0'>
        <CardTitle tag='h4'>Alert Tracker</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm='12' className='d-flex justify-content-center'>
            {chartSeries[0] && (
              <Chart
                options={options}
                series={chartSeries}
                type='radialBar'
                height={270}
                id='support-tracker-card'
              />
            )}
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-1'>
          <div className='text-center'>
            <CardText className='mb-50'>Triggered Events</CardText>
            <span className='font-large-1 font-weight-bold'>{eventsCount}</span>
          </div>
          <div className='text-center'>
            <CardText className='mb-50'>Alert</CardText>
            <span className='font-large-1 font-weight-bold'>{alarmsCount}</span>
          </div>
          <div className='text-center'>
            <CardText className='mb-50'>Total Events</CardText>
            <span className='font-large-1 font-weight-bold'>
              {totalEventsCountState}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  ) : null
}
export default SupportTracker
