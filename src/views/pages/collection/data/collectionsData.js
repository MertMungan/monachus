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

export let data

// ** Get initial Data
axios.get('/api/mata/initial-items').then(response => {
  data = response.data
})

// ** Table Zero Config Column
export const basicColumns = [
  {
    name: 'itemId',
    selector: 'itemId',
    sortable: true,
    minWidth: '150px',
  },
  {
    name: 'deleted',
    selector: 'deleted',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'handle',
    selector: 'handle',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'image',
    selector: 'image',
    sortable: true,
    minWidth: '100px',
  },
  {
    name: 'link',
    selector: 'link',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'note',
    selector: 'note',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'price',
    selector: 'price',
    sortable: true,
    minWidth: '100px',
  },
  {
    name: 'product_title',
    selector: 'product_title',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'type',
    selector: 'type',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'vendor',
    selector: 'vendor',
    sortable: true,
    minWidth: '100px'
  }
]

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
export const columns = [
  {
    name: 'itemId',
    selector: 'itemId',
    sortable: true,
    minWidth: '150px',
  },
  {
    name: 'deleted',
    selector: 'deleted',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'handle',
    selector: 'handle',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'image',
    selector: 'image',
    sortable: true,
    minWidth: '100px',
  },
  {
    name: 'link',
    selector: 'link',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'note',
    selector: 'note',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'price',
    selector: 'price',
    sortable: true,
    minWidth: '100px',
  },
  {
    name: 'product_title',
    selector: 'product_title',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'type',
    selector: 'type',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'vendor',
    selector: 'vendor',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <FileText size={15} />
                <span className='align-middle ml-50'>Details</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Archive size={15} />
                <span className='align-middle ml-50'>Archive</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Trash size={15} />
                <span className='align-middle ml-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      )
    }
  }
]

// ** Table Intl Column
export const multiLingColumns = [
  {
    name: 'itemId',
    selector: 'itemId',
    sortable: true,
    minWidth: '150px',
  },
  {
    name: 'deleted',
    selector: 'deleted',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'handle',
    selector: 'handle',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'image',
    selector: 'image',
    sortable: true,
    minWidth: '100px',
  },
  {
    name: 'link',
    selector: 'link',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'note',
    selector: 'note',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'price',
    selector: 'price',
    sortable: true,
    minWidth: '100px',
  },
  {
    name: 'product_title',
    selector: 'product_title',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'type',
    selector: 'type',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'vendor',
    selector: 'vendor',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <FileText size={15} />
                <span className='align-middle ml-50'>Details</span>
              </DropdownItem>
              <DropdownItem>
                <Archive size={15} />
                <span className='align-middle ml-50'>Archive</span>
              </DropdownItem>
              <DropdownItem>
                <Trash size={15} />
                <span className='align-middle ml-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      )
    }
  }
]

// ** Table Server Side Column
export const serverSideColumns = [
  {
    name: 'itemId',
    selector: 'itemId',
    sortable: true,
    minWidth: '150px',
  },
  {
    name: 'deleted',
    selector: 'deleted',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'handle',
    selector: 'handle',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'image',
    selector: 'image',
    sortable: true,
    minWidth: '100px',
  },
  {
    name: 'link',
    selector: 'link',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'note',
    selector: 'note',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'price',
    selector: 'price',
    sortable: true,
    minWidth: '100px',
  },
  {
    name: 'product_title',
    selector: 'product_title',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'type',
    selector: 'type',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'vendor',
    selector: 'vendor',
    sortable: true,
    minWidth: '100px'
  }
]

// ** Table Adv Search Column
export const advSearchColumns = [
  {
    name: 'itemId',
    selector: 'itemId',
    sortable: true,
    minWidth: '150px',
  },
  {
    name: 'deleted',
    selector: 'deleted',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'handle',
    selector: 'handle',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'image',
    selector: 'image',
    sortable: true,
    minWidth: '100px',
  },
  {
    name: 'link',
    selector: 'link',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'note',
    selector: 'note',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'price',
    selector: 'price',
    sortable: true,
    minWidth: '100px',
  },
  {
    name: 'product_title',
    selector: 'product_title',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'type',
    selector: 'type',
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'vendor',
    selector: 'vendor',
    sortable: true,
    minWidth: '100px'
  }
]

export default ExpandableTable
