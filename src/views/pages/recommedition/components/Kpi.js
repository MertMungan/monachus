import classnames from 'classnames'
import Avatar from '@components/avatar'
import { TrendingUp, User, Box, DollarSign } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap'


const StatsCard = ({ cols={ lg: '2', md: '3', sm: '6', xs: '12' } }) => {
  const data = [
    {
      title: '230k',
      subtitle: 'Views',
      color: 'light-primary',
      icon: <TrendingUp size={24} />
    },
    {
      title: '8.549k',
      subtitle: 'Bookmarks',
      color: 'light-info',
      icon: <User size={24} />
    },
    {
      title: '1.423k',
      subtitle: 'Cart Additions',
      color: 'light-secondary',
      icon: <Box size={24} />
    },
    {
      title: '$9745',
      subtitle: 'Ratings',
      color: 'light-success',
      icon: <DollarSign size={24} />
    },
    {
      title: '1.423k',
      subtitle: 'View portions',
      color: 'light-info',
      icon: <Box size={24} />
    },
    {
      title: '1.423k',
      subtitle: 'Purchases',
      color: 'light-success',
      icon: <DollarSign size={24} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const margin = Object.keys(cols)
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-1`]: index !== data.length - 1
          })}
        >
          <Media>
            <Avatar color={item.color} icon={item.icon} className='mr-1' />
            <Media className='my-auto' body>
              <h4 className='font-weight-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </Media>
          </Media>
        </Col>
      )
    })
  }

  return (
    <>
    <div class="card" style={{width: "100%", height: "35rem"}}></div>

    <Card className='card-statistics'>
      <CardHeader>
        <h4 class="card-title font-weight-bolder">Number of Interactions</h4>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
    </>
  )
}

export default StatsCard
