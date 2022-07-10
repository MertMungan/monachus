export default {
  id: 'bb989b9b-89ab-4cde-b012-317c73bb873d',
  type: 'group',
  children1: {
    'ab989888-89ab-4cde-b012-317c73c40ab0': {
      type: 'rule',
      properties: {
        field: 'price',
        operator: 'equal',
        value: [10],
        valueSrc: ['value'],
        valueType: ['number']
      }
    },
    'b89a9a9a-4567-489a-bcde-f17c73c45644': {
      type: 'group',
      properties: {
        conjunction: 'AND'
      },
      children1: {
        'a99aba8b-0123-4456-b89a-b17c73c45644': {
          type: 'rule',
          properties: {
            field: 'color',
            operator: 'select_equals',
            value: ['green'],
            valueSrc: ['value'],
            valueType: ['select']
          }
        }
      }
    }
  }
}
