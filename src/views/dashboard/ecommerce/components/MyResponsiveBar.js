import { ResponsiveBar } from '@nivo/bar'
import { useCubeQuery } from '@cubejs-client/react'
import { Card, CardTitle, CardBody, CardText, Media } from 'reactstrap'
import { useSkin } from '@hooks/useSkin'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsiveBar = ({ cubeQuery, legend = '' }) => {
  const [skin, setSkin] = useSkin()
  const { resultSet, isLoading, error, progress } = useCubeQuery(cubeQuery)
  const seriesName = resultSet?.seriesNames()
  const pivot = resultSet?.chartPivot()

  // const rawData = resultSet?.rawData()
  // const seriesData = resultSet?.series()
  // const deneme = resultSet?.decompose()
  // const deneme2 = resultSet?.chartPivot()
  // const deneme4 = resultSet?.tableColumns()
  // const data = resultSet?.tablePivot()

  // console.log('pivot', pivot)
  // console.log('seriesName', seriesName)
  // console.log('seriesData', seriesData)
  // console.log('rawData', rawData)
  // console.log('data', data)
  // console.log('deneme', deneme)
  // console.log('deneme2', deneme2)
  // console.log('deneme4', deneme4)

  return (
    <>
      {pivot && !isLoading && (
        <Card>
          <ResponsiveBar
            data={pivot}
            keys={seriesName.map((series) => series.key)}
            indexBy='x'
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
            ]}
            // fill={[
            //   {
            //     match: {
            //       id: 'fries'
            //     },
            //     id: 'dots'
            //   },
            //   {
            //     match: {
            //       id: 'sandwich'
            //     },
            //     id: 'lines'
            //   }
            // ]}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 1.6]]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'country',
              legendPosition: 'middle',
              legendOffset: 32
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: legend,
              legendPosition: 'middle',
              legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 1.6]]
            }}
            legends={[
              {
                dataFrom: 'PATATES',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                toggleSerie: true,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
            role='application'
            ariaLabel='Bar Chart'
            barAriaLabel={function (e) {
              return (
                e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
              )
            }}
          />
        </Card>
      )}
    </>
  )
}

export default MyResponsiveBar
