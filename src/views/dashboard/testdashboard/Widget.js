import React, { useState, useEffect, useRef } from 'react'
import { makeStyles, styled } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TextField from '@mui/material/TextField';
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import ReactECharts from 'echarts-for-react'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import CardActions from '@material-ui/core/CardActions'
import {
  Button,
} from "reactstrap";

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    marginBottom: 10,
    backgroundColor: '#f5f5f5'
  },
  root2: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    marginBottom: 10,
    backgroundColor: '#3c4f86'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  spacer: {
    flexGrow: 1
  },
  body: {
    padding: '0.5rem',
    flexGrow: 1
  },
  content: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    padding: 5
  },
  contentB: {
    width: '100%',
    height: '0%',
    display: 'flex',
    flexDirection: 'column',
    padding: 5
  }
})

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

// DONE: ADD CARD FUNCTIONALITY
// TODO: Add editor support

function Widget({
  id,
  onRemoveItem = () => { },
  toggleWidgetLayout = () => { },
  chartType = '',
  chartData = {}
}) {
  const [expanded, setExpanded] = React.useState(false)
  const [textInput, setTextInput] = useState('');
  const [manualJsonData, setManualJsonData] = useState("");
  const [jsonDataError, setJsonDataError] = useState("");
  const [defultData, setDefultData] = useState("Please enter an array")
  const [skin, setSkin] = React.useState(localStorage.getItem('skin'))
  const handleExpandClick = () => {
    setExpanded(!expanded)
    toggleWidgetLayout()

  }
  const classes = useStyles()

  useEffect(() => {
    setSkin(localStorage.getItem('skin'))
  }, [])
  
  const isJsonString = (str = '') => {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }

  // ADD MANUALLY MODAL DATA
  const handleChange = (e) => {
    setDefultData(e.target.value);
  };

  // MANUAL JSON EKLEME
  const handleSend = () => {
    const isJson = isJsonString(defultData);

    if (isJson) {
      if (Object.keys(JSON.parse(defultData)).length < 1) {
        setJsonDataError("Please add an non empty array");
      } else {
        setJsonDataError("çal keke çal")
      }
    } else
      setJsonDataError("Your text cannot be converted to JSon please check");
  };
  const handleClear = () => {
    setDefultData("")
  }
  return (
    <>
      <Card className={skin === 'dark' ? classes.root2 : classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label='delete' onClick={() => onRemoveItem(id)}>
              <CloseIcon fontSize='small' />
            </IconButton>
          }
          title={chartData.title.text}
          subheader={new Date().toLocaleString()}
          style={{ color: '#ED2419' }}
          titleTypographyProps={{ variant: 'h5' }}
        />
        {!expanded && (
          <CardContent className={classes.content}>
            <ReactECharts
              option={chartData}
              style={{ height: '100%', width: '100%' }}
            />
            <Typography variant='body2' color='textSecondary' component='p'>
            </Typography>
          </CardContent>
        )}
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon style={{ color: '#ED2419' }} />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon style={{ color: '#ED2419' }} />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
            style={{ color: '#ED2419' }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto'>
          <CardContent>
            <Typography paragraph>{jsonDataError}</Typography>
            <TextField
              fullWidth
              style={{ backgroundColor: "white" }}
              id="outlined-multiline-static"
              multiline
              rows={6}
              defaultValue="Test"
              value={defultData}
              onChange={handleChange}
            />
            <Button className='add-new-user' color='primary' onClick={() => { handleSend() }}>
              Send
            </Button>
            <Button className='add-new-user ml-1' color='primary' outline onClick={() => { handleClear() }}>
              Clear
            </Button>
            <Typography paragraph>
            </Typography>
            <Typography paragraph>
            </Typography>
            <Typography>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  )
}
export default Widget
