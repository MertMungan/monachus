// ** React Imports
import { Fragment, useState, useEffect, useRef } from "react";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

import { fetchEvents } from "../../../../redux/actions/events";
import { fetchAllRules } from "../../../../redux/actions/rules";
import { connect } from "react-redux";
import "../../../../formControlColor.css";

// ** Table Columns

// ** Store & Actions
import { getAllData, getData } from "./store";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import Wizard from "@components/wizard";

import EventPayload from "./steps/EventPayload";
import FirstStep from "./steps/FirstStep";
import SecondStep from "./steps/SecondStep";
import ThirdStep from "./steps/ThirdStep";
import FourthStep from "./steps/FourthStep";

import {
  ChevronDown,
  Edit,
  Info,
  FileText,
  File,
  Grid,
  Copy,
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

import { useContext } from "react";
import { AbilityContext } from "@src/utility/context/Can";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Table Header
const CustomHeader = ({
  store,
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(queryList.data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">Show</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            <label htmlFor="rows-per-page">Entries</label>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              Search
            </label>
            <Input
              id="search-invoice"
              className="ml-1 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>

          {/* <div className='d-flex align-items-center table-header-actions'>
            <UncontrolledDropdown className='me-1'>
              <DropdownToggle color='secondary' caret outline>
                <Share className='font-small-4 me-50' />
                <span className='align-middle'>Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <Printer className='font-small-4 me-50' />
                  <span className='align-middle'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(eventList.data)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid className='font-small-4 me-50' />
                  <span className='align-middle'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File className='font-small-4 me-50' />
                  <span className='align-middle'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy className='font-small-4 me-50' />
                  <span className='align-middle'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              Add New User
            </Button>
          </div> */}
        </Col>
      </Row>
    </div>
  );
};
const Table = ({
  eventList = [],
  fetchEvents = () => { },
  queryList = [],
  fetchAllRules = () => { },
}) => {
  // ** Store Vars
  const store = useSelector((state) => state.users);

  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Rule Category",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Select Time",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0,
  });

  const ability = useContext(AbilityContext);

  const [stepper, setStepper] = useState(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [rules, setRules] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [eventName, setEventName] = useState("");
  const columns = [
    {
      name: "Transaction ID",
      selector: (row) => row.eventID,
      sortable: true,
    },
    {
      name: "Event Name",
      selector: (row) =>
        eventList.length > 0 &&
        eventList.find((item) => item.eventId === row.eventID)?.eventName,
      sortable: true,
    },

    {
      name: "Rule ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Rule Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Rule Category",
      selector: (row) => row.category,
      sortable: true,
    },
    ability.can("create", "cep") &&
    {
      name: "Actions",
      minWidth: "100px",
      cell: (row) => (
        <div className="column-action">
          <Edit
            size={15}
            onClick={() => {
              setSelectedAlert(row);
              // setEventName(
              //   eventList.find((e) => e.eventId === row.eventID).eventName
              // );
              setWizardOpen(true)
            }}
          />
        </div>
      ),
    },
  ];

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** Get data on mount
  useEffect(() => {
    fetchEvents();
    fetchAllRules();
  }, [queryList]);

  useEffect(() => {
    if (queryList.data) {
      // console.log(queryList.data);
      setRules(queryList.data);
    }
  }, []);

  useEffect(() => {
    if (selectedAlert !== null) {
      // console.log(selectedAlert);
      setWizardOpen(true);
    }
  }, [selectedAlert]);
  // ** User filter options
  const roleOptions = [
    { value: "", label: "Select Rule Category" },
    { value: "test", label: "Marketing" },
    { value: "author", label: "Finance" },
    { value: "editor", label: "Network" },
  ];

  const planOptions = [
    { value: "", label: "1 Hour Ago" },
    { value: "basic", label: "3 Hour Ago" },
    { value: "company", label: "8 Hour Ago" },
    { value: "enterprise", label: "12 Hour Ago" },
  ];

  const statusOptions = [
    { value: "", label: "Select Status", number: 0 },
    { value: "pending", label: "Pending", number: 1 },
    { value: "active", label: "Active", number: 2 },
    { value: "inactive", label: "Inactive", number: 3 },
  ];

  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(queryList.data?.total / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      ruleName: currentRole.value,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (queryList.data?.length > 0) {
      return queryList.data;
    } else if (queryList.data?.length === 0 && isFiltered) {
      return [];
    } else {
      return queryList.data?.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const ref = useRef(null);

  const steps = [
    {
      id: "alertDetails",
      title: "Alert Details",
      // subtitle: "Add Attributes",
      content: (
        <FirstStep
          stepper={stepper}
          type="horizontal"
          setWizardOpen={setWizardOpen}
          wizardOpen={wizardOpen}
          selectedAlert={selectedAlert}
          eventName={eventName}
        />
      ),
    },
    {
      id: "ruleDetails",
      title: "Rule Details",
      // subtitle: "Add Attributes",
      content: (
        <ThirdStep
          stepper={stepper}
          type="horizontal"
          setWizardOpen={setWizardOpen}
          wizardOpen={wizardOpen}
          selectedAlert={selectedAlert}
        />
      ),
    },
    {
      id: "eventPayload",
      title: "Event Payload",
      // subtitle: "Add Attributes",
      content: (
        <FourthStep
          stepper={stepper}
          type="horizontal"
          setWizardOpen={setWizardOpen}
          wizardOpen={wizardOpen}
        />
      ),
    },
  ];

  return (
    <Fragment>
      {wizardOpen === true ? (
        <Wizard
          type="horizontal"
          ref={ref}
          steps={steps}
          options={{
            linear: false,
          }}
          instance={(el) => setStepper(el)}
        />
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Filters</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="6">
                  <Label for="role-select">Rule Category</Label>
                  <Select
                    isClearable={false}
                    value={currentRole}
                    options={roleOptions}
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    onChange={(data) => {
                      setCurrentRole(data);
                    }}
                  />
                </Col>
                <Col className="my-md-0 my-1" md="6">
                  <Label for="plan-select">From</Label>
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    options={planOptions}
                    value={currentPlan}
                    onChange={(data) => {
                      setCurrentPlan(data);
                    }}
                  />
                </Col>
                {/* <Col md='4'>
              <Label for='status-select'>Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={statusOptions}
                value={currentStatus}
                onChange={data => {
                  setCurrentStatus(data)
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      status: data.value,
                      perPage: rowsPerPage,
                      eventName: currentRole.value,
                      currentPlan: currentPlan.value
                    })
                  )
                }}
              />
            </Col> */}
              </Row>
            </CardBody>
          </Card>

          <Card className="overflow-hidden">
            <div className="react-dataTable">
              <DataTable
                noHeader
                subHeader
                sortServer
                pagination
                responsive
                paginationServer
                columns={columns}
                onSort={handleSort}
                sortIcon={<ChevronDown />}
                className="react-dataTable"
                paginationComponent={CustomPagination}
                data={queryList.data}
                subHeaderComponent={
                  <CustomHeader
                    store={store}
                    searchTerm={searchTerm}
                    rowsPerPage={rowsPerPage}
                    handleFilter={handleFilter}
                    handlePerPage={handlePerPage}
                    toggleSidebar={toggleSidebar}
                  />
                }
              />
            </div>
          </Card>
        </>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { eventList: state.fields, queryList: state.query };
};

export default connect(mapStateToProps, {
  fetchEvents,
  fetchAllRules,
})(Table);
