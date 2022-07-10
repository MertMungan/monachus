// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const status = {
  1: { title: 'Current', color: 'light-primary' },
  2: { title: 'Professional', color: 'light-success' },
  3: { title: 'Rejected', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' }
}

export let data = []

// ** Get initial Data
axios.get('/api/mata/initial-data').then(response => {
  data = response.data
})

// updatedData = data.filter((item) => {
//   const startsWith = Object.keys(item).some((key) => {
//     return {
//       name: key.toString(),
//       selector: key.toString(),
//       sortable: true,
//       minWidth: '250px'
//   }
//   });

// ** Table Zero Config Column
export const basicColumns = data.filter((item) => {
  return Object.keys(item).some((key) => {
    return {
      name: key.toString(),
      selector: key.toString(),
      sortable: true,
      minWidth: '250px'
  }
  })});

// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>City:</span> {data.city}
      </p>
      <p>
        <span className='font-weight-bold'>Experience:</span> {data.experience}
      </p>
      <p className='m-0'>
        <span className='font-weight-bold'>Post:</span> {data.post}
      </p>
    </div>
  )
}

// ** Table Common Column
export const columns = data.map((item) => {
  return Object.keys(item).map((key) => {
    return {
      name: key.toString(),
      selector: key.toString(),
      sortable: true,
      minWidth: '250px'
  }
  })});
// ** Table Intl Column
export const multiLingColumns = data.filter((item) => {
  return Object.keys(item).some((key) => {
    return {
      name: key.toString(),
      selector: key.toString(),
      sortable: true,
      minWidth: '250px'
  }
  })});

// ** Table Server Side Column
export const serverSideColumns = data.filter((item) => {
  return Object.keys(item).some((key) => {
    return {
      name: key.toString(),
      selector: key.toString(),
      sortable: true,
      minWidth: '250px'
  }
  })});

// ** Table Adv Search Column
export const advSearchColumns = data.filter((item) => {
  return Object.keys(item).some((key) => {
    return {
      name: key.toString(),
      selector: key.toString(),
      sortable: true,
      minWidth: '250px'
  }
  })});

export default ExpandableTable
