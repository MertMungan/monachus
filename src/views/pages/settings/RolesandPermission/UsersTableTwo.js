// ** React Imports
import { Fragment, useState, useEffect, forwardRef } from "react";

// ** Add New Modal Component
import ReactPaginate from "react-paginate";

// ** Third Party Components
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  Plus,
  MoreVertical,
  Archive,
  Trash,
  Edit,
} from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Badge,
} from "reactstrap";
// REDUX
import { connect } from "react-redux";
import { fetchRoles } from "../../../../redux/actions/roles";
// REDUX

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { use } from "echarts";

const UsersTableTwo = ({
  eventList,
  fetchEvents,
  queryList = [],
  fetchAllRule = () => {},
  listData = [],
  wizardOpen = false,
  setWizardOpen = () => {},
  resetInfo = {},
  setResetInfo = () => {},
  categoryArray = [],
  eventsArray = [],
  setSelectedEvent = () => {},
  setSelectedRule = () => {},
  appliedEvent = "",
  fetchRoles = () => {},
  rolesList = [],
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [modal, setModal] = useState(false);
  const [listBilgisi, setListBilgisi] = useState([]);
  const [active, setActive] = useState("1");
  const [listedCategory, setListedCategory] = useState("");
  // STATES



  useEffect(() => {
    if (rolesList.length > 0) {
      setListBilgisi(rolesList);
    }
  }, [rolesList]);
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = listBilgisi?.filter((item) => {
        const startsWith =
          item.roleId.toLowerCase().startsWith(value.toLowerCase()) ||
          item.roleName.toLowerCase().startsWith(value.toLowerCase()) ||
          item.roleDescription.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.roleId.toLowerCase().includes(value.toLowerCase()) ||
          item.roleName.toLowerCase().includes(value.toLowerCase()) ||
          item.roleDescription.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.roleName,
      sortable: true,
    },
    {
      name: "Assigned To",
      minWidth: "auto",
      selector: (row) => {
        if (row) {
          const permissions = row.rolePermissions;
          const entries = Object.entries(permissions);
          const filteredEntries = entries.filter((entry) => entry[1] === true);
          const filteredKeys = filteredEntries.map((entry) => entry[0]);
          const filteredKeysWithoutCRUD = filteredKeys.map((key) => {
            const newKey = key.replace("CRUD", "");
            return newKey;
          });
          return filteredKeysWithoutCRUD.map((key) => {
            return (
              <Badge pill className="text-capitalize">
                {key}
              </Badge>
            );
          });
        }
      },

      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.roleDescription,
      sortable: true,
    },
    {
      name: "Details",
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className="d-flex">
            <a style={{ color: "rgba(0,0,0,0.87)" }} href="/monachus/rules">
              <Edit size={15}></Edit>
            </a>
            <a
              style={{ color: "rgba(0,0,0,0.87)", marginLeft: "2em" }}
              href="/monachus/rules"
            >
              <Trash size={15}></Trash>
            </a>
          </div>
        );
      },
    },
  ];

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchValue.length
          ? filteredData.length / 7
          : listBilgisi.length / 7 || 1
      }
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      nextLinkClassName="page-link"
      nextClassName="page-item next"
      previousClassName="page-item prev"
      previousLinkClassName="page-link"
      pageLinkClassName="page-link"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
    />
  );

  return (
    <>
      {listBilgisi && listBilgisi.length > 0 && (
        <Fragment>
          <Card>
            <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
              <CardTitle tag="h4">Permissions</CardTitle>
              <div className="d-flex mt-md-0 mt-1">
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
                {/*   <Button
              className="ml-2"
              color="primary"
              onClick={() => setWizardOpen(!wizardOpen)}
            >
              <span className="align-middle ml-50">Create Role</span>
            </Button> */}
              </div>
            </CardHeader>
            <Row className="justify-content-end mx-0">
              <Col
                className="d-flex align-items-center justify-content-end mt-1"
                md="6"
                sm="12"
              >
                <Label className="mr-1" for="search-input">
                  Search
                </Label>
                <Input
                  className="dataTable-filter mb-50"
                  type="text"
                  bsSize="sm"
                  id="search-input"
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
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              paginationDefaultPage={currentPage + 1}
              paginationComponent={CustomPagination}
              data={searchValue.length ? filteredData : listBilgisi}
            />
          </Card>
        </Fragment>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return { rolesList: state.rolesReducer };
};

export default connect(mapStateToProps, { fetchRoles })(UsersTableTwo);
