import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import TopicCard from './cards/TopicCard'
import { fetchTopicData } from '../../../../redux/actions/notificationTopic'

export const Topic = ({ fetchTopicData = () => {}, topicData = {} }) => {
  const [currentTopicData, setcurrentTopicData] = useState(topicData)
  
  useEffect(() => {
    fetchTopicData()
  }, [])

  useEffect(() => {
    setcurrentTopicData(topicData)
  }, [topicData])

  return <TopicCard topicData={currentTopicData.items} />
}

Topic.propTypes = {
  fetchTopicData: PropTypes.func,
  topicData: PropTypes.object
}

const mapStateToProps = (state) => ({
  topicData: state.notificationTopicReducer
})

export default connect(mapStateToProps, { fetchTopicData })(Topic)
