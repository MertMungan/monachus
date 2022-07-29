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
import { useCubeQuery } from '@cubejs-client/react'

const SupportTracker = ({
  primary,
  danger,
  setSelectedGarnule,
  selectedGarnule = 'Last 7 days'
}) => {
  const [data, setData] = useState(null)
  const [chartSeries, setChartSeries] = useState([0])

  const { resultSet, isLoading, error, progress } = useCubeQuery({
    measures: ['Alarms.count', 'Events.count'],
    timeDimensions: [
      {
        dimension: 'Alarms.alarmDatetime'
      }
    ],
    order: {}
  })

  const rawData = resultSet?.rawData()
  useEffect(() => {
    if (rawData) {
      const alarmPercent = parseFloat(
        (rawData[0]['Events.count'] / rawData[0]['Alarms.count']) * 100
      )
      setChartSeries([alarmPercent])
    }
  }, [rawData])

  useEffect(() => {
    axios
      .get('/card/card-analytics/support-tracker')
      .then((res) => setData(res.data))
  }, [])

  const dayTime = [
    'Last 7 days',
    'Yesterday',
    'This week',
    'This month',
    'This quarter',
    'This year',
    'Last 30 days',
    'Last week',
    'Last month',
    'Last month',
    'Last quarter',
    'Last year'
  ]

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
    labels: ['Completed Tickets']
  }

  console.log(selectedGarnule)

  return data !== null ? (
    <Card>
      <CardHeader className='pb-0'>
        <CardTitle tag='h4'>Alarm Tracker</CardTitle>
        <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle
            color=''
            className='bg-transparent btn-sm border-0 p-50'
          >
            {selectedGarnule}
          </DropdownToggle>
          <DropdownMenu right>
            {dayTime.map((item, i) => (
              <DropdownItem className='w-100' key={`${item}-${i}`}>
                <span onClick={(e) => console.log(e.currentTarget)}>
                  {item}
                </span>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm='2' className='d-flex flex-column flex-wrap text-center'>
            <h1 className='font-large-2 font-weight-bolder mt-2 mb-0'></h1>
            {/* <CardText>Tickets</CardText> */}
          </Col>
          <Col sm='10' className='d-flex justify-content-center'>
            <Chart
              options={options}
              series={chartSeries}
              type='radialBar'
              height={270}
              id='support-tracker-card'
            />
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-1'>
          <div className='text-center'>
            <CardText className='mb-50'>Events</CardText>
            <span className='font-large-1 font-weight-bold'>
              {rawData && rawData[0]['Events.count']}
            </span>
          </div>
          <div className='text-center'>
            <CardText className='mb-50'>Alarms</CardText>
            <span className='font-large-1 font-weight-bold'>
              {rawData && rawData[0]['Alarms.count']}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  ) : null
}
export default SupportTracker
