// ** React Imports
import { Fragment, useState, useEffect, forwardRef } from 'react'

// ** Add New Modal Component
import ReactPaginate from 'react-paginate'


// ** Third Party Components
import DataTable from 'react-data-table-component'
import { ChevronDown, Trash, Edit } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Row,
  Col,
  Badge
} from 'reactstrap'
// REDUX
import { connect } from 'react-redux'

// REDUX
import { fetchUsers } from '../../../../redux/actions/users'
import {
  fetchKeycloakUsers,
  deleteKeycloakUser
} from '../../../../redux/actions/keycloakUsers'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const UsersTable = ({
  eventList,
  fetchEvents,
  queryList = [],
  fetchUsers = () => {},
  fetchAllRule = () => {},
  listData = [],
  userList = [],
  wizardOpen = false,
  setWizardOpen = () => {},
  resetInfo = {},
  setResetInfo = () => {},
  categoryArray = [],
  eventsArray = [],
  setSelectedEvent = () => {},
  setSelectedRule = () => {},
  appliedEvent = '',
  keycloakUserList = [],
  fetchKeycloakUsers = () => {},
  deleteKeycloakUser = () => {}
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [filteredData, setFilteredData] = useState([])
  const [modal, setModal] = useState(false)
  const [listBilgisi, setListBilgisi] = useState(userList)
  const [active, setActive] = useState('1')
  const [listedCategory, setListedCategory] = useState('')
  // STATES

  const colors = {
    ocean: 'light-info',
    blue: 'light-success',
    purple: 'light-warning',
    red: 'light-primary',
    'restricted-user': 'light-danger'
  }

  useEffect(() => {
    fetchKeycloakUsers()
    if (listBilgisi.length > 0) {
      // listBilgisi'nin elementleri arasında category propertysi listedCategory'a eşit olanları filtrele
      /*  const filteredData = queryList.data?.filter((item) => {
        return item.category === listedCategory;
      });
      setListBilgisi(filteredData); */
    }
  }, [listedCategory])

  // console.log("keycloakUserList",keycloakUserList)

  const handleFilter = (e) => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = listBilgisi?.filter((item) => {
        const startsWith =
          item.userName.toLowerCase().startsWith(value.toLowerCase()) ||
          item.userContact.toLowerCase().startsWith(value.toLowerCase()) ||
          item.userEmail.toLowerCase().startsWith(value.toLowerCase()) ||
          item.userRoles?.some((role) => {
            return role.toLowerCase().startsWith(value.toLowerCase())
          })

        const includes =
          item.userName.toLowerCase().includes(value.toLowerCase()) ||
          item.userContact.toLowerCase().includes(value.toLowerCase()) ||
          item.userEmail.toLowerCase().includes(value.toLowerCase()) ||
          item.userRoles?.some((role) => {
            return role.toLowerCase().startsWith(value.toLowerCase())
          })
        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  const handleKeycloakUserDelete = (keycloakUserId = '') => {
    deleteKeycloakUser(keycloakUserId)
  }
  const columns = [
    {
      name: 'Name',
      selector: (row) => row.username,
      sortable: true
    },
    {
      sortable: true,
      minWidth: '350px',
      name: 'Roles',

      selector: (row) => {
        if (row) {
          return row.userRoles?.map((assignee, index) => {
            return (
              <Badge pill color={colors[assignee]} className='text-capitalize'>
                {assignee}
              </Badge>
            )
          })
        } else {
          return null
        }
      }
    },

    {
      name: 'Contact',
      selector: (row) => row.createdTimestamp,
      sortable: true
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true
    },
    {
      name: 'Details',
      allowOverflow: true,
      cell: (row) => {
        return (
          <>
            <Edit
              size={15}
              onClick={() => {
                setResetInfo({
                  userName: row.userName,
                  userId: row.userId,
                  userEmail: row.userEmail,
                  userContact: row.userContact,
                  userRoles: row.userRoles
                })
                setWizardOpen(true)
              }}
            ></Edit>
            <Trash
              size={15}
              onClick={() => {
                handleKeycloakUserDelete(row.id)
              }}
            ></Trash>
          </>
        )
      }
    }
  ]

  const handlePagination = (page) => {
    setCurrentPage(page.selected)
  }

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchValue.length
          ? filteredData.length / 7
          : listBilgisi.length / 7 || 1
      }
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      nextLinkClassName='page-link'
      nextClassName='page-item next'
      previousClassName='page-item prev'
      previousLinkClassName='page-link'
      pageLinkClassName='page-link'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
    />
  )

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>User List</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            {/*             <UncontrolledButtonDropdown>
              <DropdownToggle color="secondary" caret outline>
                <Share size={15} />
                <span className="align-middle ml-50">Export</span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className="w-100">
                  <Printer size={15} />
                  <span className="align-middle ml-50">Print</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <FileText size={15} />
                  <span className="align-middle ml-50">CSV</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Grid size={15} />
                  <span className="align-middle ml-50">Excel</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <File size={15} />
                  <span className="align-middle ml-50">PDF</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Copy size={15} />
                  <span className="align-middle ml-50">Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown> */}
            <Button
              className='ml-2'
              color='primary'
              onClick={() => setWizardOpen(!wizardOpen)}
            >
              <span className='align-middle ml-50'>Create User</span>
            </Button>
          </div>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col
            className='d-flex align-items-center justify-content-end mt-1'
            md='6'
            sm='12'
          >
            <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <DataTable
          noHeader
          pagination
          columns={columns}
          paginationPerPage={7}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : keycloakUserList}
        />
      </Card>
    </Fragment>
  )
}
const mapStateToProps = (state) => {
  return {
    userList: state.usersReducer,
    keycloakUserList: state.keycloakUsersReducer
  }
}

export default connect(mapStateToProps, {
  fetchUsers,
  fetchKeycloakUsers,
  deleteKeycloakUser
})(UsersTable)
