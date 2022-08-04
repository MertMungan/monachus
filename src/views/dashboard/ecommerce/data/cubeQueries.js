import { safeDate } from './constants'
export const query_01 = (dateRangeValue = 'Last 7 days') => ({
  timeDimensions: [
    {
      dimension: 'Alarms.alarmDatetime',
      granularity: safeDate(dateRangeValue),
      dateRange: dateRangeValue
    }
  ],
  order: {
    'Alarms.count': 'desc'
  },
  measures: ['Alarms.count'],
  dimensions: ['Alarms.ruleId']
})
export const query_02 = (dateRangeValue = 'Last 7 days') => ({
  timeDimensions: [
    {
      dimension: 'Alarms.alarmDatetime',
      granularity: safeDate(dateRangeValue),
      dateRange: dateRangeValue
    }
  ],
  order: {
    'Alarms.count': 'desc'
  },
  measures: ['Alarms.count'],
  dimensions: ['Alarms.eventType']
})
export const query_03 = (dateRangeValue = 'Last 7 days') => ({
  measures: ['Alarms.count', 'Events.count'],
  timeDimensions: [
    {
      dimension: 'Alarms.alarmDatetime',
      granularity: safeDate(dateRangeValue),
      dateRange: dateRangeValue
    }
  ],
  order: {
    'Alarms.alarmDatetime': 'asc'
  }
})
export const query_04 = () => ({
  measures: ['Events.count']
})

export const query_05 = (dateRangeValue = 'Last 7 days') => ({
  measures: ['Alarms.count', 'Alarms.countDistinctEvent'],
  order: {
    'Alarms.alarmDatetime': 'asc'
  },
  limit: 3500,
  timeDimensions: [
    {
      dimension: 'Alarms.alarmDatetime',
      granularity: safeDate(dateRangeValue),
      dateRange: dateRangeValue
    }
  ]
})

export const chartOptionsData = (
  categoriesForDisplay = ['22/07/2022'],
  eventsValues = [],
  alarmsValues = [],
  colors = {}
) => ({
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
