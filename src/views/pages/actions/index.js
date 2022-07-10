import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import EngDndGraphDoc from './doc/EngDndGraphDoc'
import './index.scss'
import BreadCrumbs from '@components/breadcrumbs'

const index = (props) => {
  return (
  <>
  <BreadCrumbs breadCrumbParent='Applications' breadCrumbActive='Connectors' />
  <EngDndGraphDoc />
  </>
  )
}

index.propTypes = {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(index)
