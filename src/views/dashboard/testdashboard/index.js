/*eslint-disable */
import React, { useState, Fragment, useEffect } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout'
import { withSize } from 'react-sizeme'
import Widget from './Widget'
import TopBar from './TopBar'
import ChartOptions from './chart-options.json'
import axios from 'axios'

const initialLayouts = {
  lg: [
    { i: 'a', x: 0, y: 0, w: 1, h: 4 },
    { i: 'b', x: 1, y: 0, w: 3, h: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 4 },
    { i: 'd', x: 0, y: 4, w: 2, h: 4 }
  ]
}

function getFromLS(key) {
  let ls = {}
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {}
    } catch (e) {}
  }
  return ls[key]
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'rgl-8',
      JSON.stringify({
        [key]: value
      })
    )
  }
}

const Content = ({ size: { width } }) => {
  const [items, setItems] = useState(ChartOptions)
  const [layOutState, setLayOutState] = useState({
    w: 6,
    h: 6,
    x: 0,
    y: Infinity
  })
  const [layouts, setLayouts] = useState(getFromLS('layouts') || initialLayouts)
  const onLayoutChange = (_, allLayouts) => {
    setLayouts(allLayouts)
  }

  const getChartData = async () => {
    const response = await axios.get('https://apps.belgesakla.com/monitor', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
    if (response) {
      setItems(response.data)
    }
  }

  const myInterVal = () => {
    setInterval(() => {
      void (async () => {
        await getChartData()
      })()
    }, 1000)
  }
  useEffect(() => {
    myInterVal()
  }, [])

  const onLayoutSave = () => {
    saveToLS('layouts', layouts)
  }
  const onRemoveItem = (itemId) => {
    const itemIndex = items.findIndex((item) => item.id === itemId)
    items[itemIndex].show = false
    setItems([...items])
  }
  const onAddItem = (itemId) => {
    const itemIndex = items.findIndex((item) => item.id === itemId)
    items[itemIndex].show = true
    setItems([...items])
  }
  const toggleWidgetLayout = () => {
    if (layOutState.h === 6) {
      
      setLayOutState({ w: 6, h: 12, x: 0, y: Infinity })
    } else {
      setLayOutState({ w: 6, h: 6, x: 0, y: Infinity })
    }
  }
  const renderWidgets = (item) => {
    if (item.show) {
      return (
        <div key={item.id} className='widget' data-grid={layOutState}>
          <Widget
            id={item.id}
            chartData={item}
            chartType={item.series.type}
            onRemoveItem={onRemoveItem}
            toggleWidgetLayout={toggleWidgetLayout}
            backgroundColor='#867ae9'
          />
        </div>
      )
    }
  }

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle='Event'
        breadCrumbParent='CEP'
        breadCrumbActive='Event Monitor'
      />
      <TopBar
        onLayoutSave={onLayoutSave}
        items={items}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
      />
      <ResponsiveGridLayout
        className='layout'
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        width={width}
        onLayoutChange={onLayoutChange}
      >
        {items.map((item) => renderWidgets(item))}
      </ResponsiveGridLayout>
    </Fragment>
  )
}

const withSizeHOC = withSize({ refreshMode: 'debounce', refreshRate: 60 })
const SizeAwareComponent = withSizeHOC(Content)

export default SizeAwareComponent
/*eslint-disable */
