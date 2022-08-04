export const dayTime = () => [
  'This year',
  'Yesterday',
  'This week',
  'This month',
  'This quarter',
  'Last 7 days',
  'Last 30 days',
  'Last week',
  'Last month',
  'Last quarter',
  'Last year'
]

export const buttonNamesToShow = () => [
  'This year',
  'Yesterday',
  'This week',
  'This month',
  'This quarter',
  'Last 7 days',
  'Last 30 days',
  'Last week',
  'Last month',
  'Last quarter',
  'Last year'
]

export const safeDate = (dayTime) => {
  const list = {
    'Last 7 days': 'day',
    Yesterday: 'hour',
    Today: 'hours',
    'This week': 'day',
    'This month': 'week',
    'This quarter': 'month',
    'This year': 'month',
    'Last 30 days': 'week',
    'Last week': 'day',
    'Last month': 'week',
    'Last quarter': 'month',
    'Last year': 'month'
  }
  return list[dayTime]
}

export const basicTimeDates = () => ('hour', ['day', 'week', 'month', 'year'])
