// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

import {
  Edit,
} from "react-feather";

// ** Store & Actions
import { store } from '../../../../redux/storeConfig/store'
import { getUser, deleteUser } from './store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
// const renderClient = row => {
//   if (row.avatar?.length) {
//     return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
//   } else {
//     return (
//       <Avatar
//         initials
//         className='me-1'
//         color={row.avatarColor || 'light-primary'}
//         content={row.fullName || 'John Doe'}
//       />
//     )
//   }
// }

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    subscriber: {
      class: 'text-primary',
      icon: User
    },
    maintainer: {
      class: 'text-success',
      icon: Database
    },
    editor: {
      class: 'text-info',
      icon: Database
    },
    author: {
      class: 'text-warning',
      icon: Settings
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
      {row.role}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: "Transaction ID",
    selector: (row) => row.eventId,
    sortable: true,
  },
  {
    name: "Rule Category",
    selector: (row) => row.eventName,
    sortable: true,
    selector: row => row.eventName,
  },
  {
    name: "Event Name",
    selector: (row) => row.eventDescription,
    sortable: true,
  },
  {
    name: "Rule ID",
    selector: (row) => row.eventDescription,
    sortable: true,
  },
  {
    name: "Rule Name",
    selector: (row) => row.eventDescription,
    sortable: true,
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <Edit
              size={15}
              onClick={() => {
                setResetInfo({
                  eventId: row.eventId,
                  eventName: row.eventName,
                  eventDescription: row.eventDescription,
                  eventCategory: row.eventCategory,
                  fields: row.fields,
                }),
                  setWizardOpen(false);
              }}
            />
      </div>
    )
  }
]
