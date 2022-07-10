import React from 'react'
import ReactEcharts from "echarts-for-react"; 

export default function Stats() {

  const option = {
    xAxis: {
      type: 'category',
      data: ['Apr 15', 'Apr 17', 'Apr 19', 'Apr 21', 'Apr 23', 'Apr 25', 'Apr 26']
    },
    yAxis: {
      type: 'value',
      
    },
    textStyle: {
      color: "red",
    },
    itemStyle: { color: "red"},
    series: [
      {
        data: [
        0, { value:10, itemStyle: { color: "red"}}, { value:20, itemStyle: { color: "red"}}, 
        { value:30, itemStyle: { color: "red"}}, { value:40, itemStyle: { color: "red"}}, { value:50, itemStyle: { color: "red"}},
        { value:60, itemStyle: { color: "red"}}
      ],
        type: 'bar'
      }
    ]
  };

  const option2 = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value'
    },
    textStyle: {
      color: "red"
    },
    lineStyle: {
      color: "red",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };

  return (
    <>
    <ReactEcharts option={option} />
    <ReactEcharts option={option2} />
    </>
  )
}
