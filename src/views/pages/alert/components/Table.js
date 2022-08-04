// ** React Imports
import { Fragment, useState, useEffect, useRef, useContext } from "react";
import { AbilityContext } from "@src/utility/context/Can";
// ** Invoice List Sidebar

import { fetchAlarms, fetchAlarmsByCategory } from '../../../../redux/actions/alarmData'
import ReactJson from "react-json-view";

import { connect } from "react-redux";
import "../../../../formControlColor.css";

// ** Table Columns

// ** Store & Actions
import { useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import Wizard from "@components/wizard";

import FirstStep from "./steps/FirstStep";
import ThirdStep from "./steps/ThirdStep";
import FourthStep from "./steps/FourthStep";

import {
  ChevronDown,
  AlertCircle
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  CardBody,
  CardTitle,
  CardHeader,
  ModalHeader,
  ModalBody,
  Modal,
  CardText,
  UncontrolledDropdown,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Table Header
const CustomHeader = ({
  role,
  setShow,
  searchValue,
  rowsPerPage,
  handlePerPage,
  handleFilter,
  handleAssignedToChange
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
  alarmData = [],
  fetchAlarms = () => { },
  fetchAlarmsByCategory = () => { },
  ruleCategoryData = [],
}) => {
  // ** Store Vars
  const store = useSelector((state) => state.users);

  // ** States
  const [show, setShow] = useState(false)
  const [eventModalShow, setEventModalShow] = useState(false)
  const [ruleModalShow, setRuleModalShow] = useState(false)
  const [eventRowData, setEventRowData] = useState([])
  const [ruleRowData, setRuleRowData] = useState([])
  const [categorySelectData, setCategorySelectData] = useState([{ value: "reset", label: "All Data" }])
  const [assignedTo, setAssignedTo] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [listBilgisi, setListBilgisi] = useState([]);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Rule Category",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: 0,
    label: "Select Time",
  });

  const ability = useContext(AbilityContext);

  const [stepper, setStepper] = useState(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [rules, setRules] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [eventName, setEventName] = useState("");
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Event Name",
      selector: (row) =>
        <>
          <p
            className="mb-0 mr-1"
          >{row.metadata_events.name}
            <AlertCircle
              style={{ cursor: "help" }}
              className="ml-1 p-0"
              color='#ed2419'
              size={15}
              onClick={() => {
                setEventModalShow(true)
                setEventRowData(row.metadata_events)
              }} /></p>

        </>,
      sortable: true,
      maxWidth: "550px",

    },
    {
      name: "Event Description",
      selector: (row) => row.description,
      sortable: true,
      maxWidth: "250px",

    },
    {
      name: "Rule Name",
      selector: (row) =>
        <div>
          <p
            className="mb-0"
          >{row.metadata_rules.name}
            <AlertCircle
              style={{ cursor: "help" }}
              className="ml-1"
              color='#ed2419'
              size={15}
              onClick={() => {
                setRuleModalShow(true)
                setRuleRowData(row.metadata_rules)
              }} /></p></div>,
      sortable: true,
    },
    {
      name: "Rule Description",
      selector: (row) => row.metadata_rules.description,
      sortable: true,
    },
    {
      name: "Date Time",
      selector: (row) => row.alarm_datetime,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.statu,
      sortable: true,
      maxWidth: "150px",
    },
    // ability.can("create", "cep") &&
    // {
    //   name: "Actions",
    //   minWidth: "100px",
    //   cell: (row) => (
    //     <div className="column-action">
    //       <Edit
    //         size={15}
    //         onClick={() => {
    //           setSelectedAlert(row);
    //           setWizardOpen(true)
    //         }}
    //       />
    //     </div>
    //   ),
    // },
  ]
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** Get data on mount
  // useEffect(() => {
  //   fetchAlarmsByCategory(currentPage,currentRole.id)
  // }, [currentRole]);

  const curD = new Date()
  const curDate = curD.getFullYear() + '-' + (curD.getMonth() + 1) + '-' + curD.getDate();
  const curTime = (curD.getHours() - currentPlan.value) + ':' + curD.getMinutes() + ':' + curD.getSeconds()
  const curDateTime = curDate + "T" + curTime

  useEffect(() => {
    fetchAlarms(currentPage, currentRole.value, curDateTime, currentPlan.value)
  }, [currentPage, currentRole, curDateTime]);

  useEffect(() => {
    for (let index = 0; index < ruleCategoryData.length; index++) {
      setCategorySelectData(current => [...current, {
        value: ruleCategoryData[index].id,
        label: ruleCategoryData[index].name,
      }]);

    }
  }, [ruleCategoryData])
  // ** User filter options

  const planOptions = [
    { value: 0, label: "Total Data" },
    { value: 1, label: "1 Hour Ago" },
    { value: 3, label: "3 Hour Ago" },
    { value: 8, label: "8 Hour Ago" },
    { value: 12, label: "12 Hour Ago" },
  ];

  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  let totalDataLenght = ""
  let result = ""

  if (alarmData.headers) {
    totalDataLenght = alarmData.headers["content-range"]
    var n = totalDataLenght.lastIndexOf('/');
    result = totalDataLenght.substring(n + 1);
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = alarmData.data?.filter((item) => {
        const startsWith =
          item.id.toLowerCase().startsWith(value.toLowerCase()) ||
          item.event_type.toLowerCase().startsWith(value.toLowerCase()) ||
          item.event_id.toLowerCase().startsWith(value.toLowerCase()) ||
          item.rule_id.toLowerCase().startsWith(value.toLowerCase()) ||
          item.alarm_datetime.toLowerCase().startsWith(value.toLowerCase()) ||
          item.statu.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.id.toLowerCase().includes(value.toLowerCase()) ||
          item.event_type.toLowerCase().includes(value.toLowerCase()) ||
          item.event_id.toLowerCase().includes(value.toLowerCase()) ||
          item.rule_id.toLowerCase().startsWith(value.toLowerCase()) ||
          item.alarm_datetime.toLowerCase().startsWith(value.toLowerCase()) ||
          item.statu.toLowerCase().startsWith(value.toLowerCase())

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
  // ** Function to filter Roles
  const handleAssignedToChange = val => {
    setAssignedTo(val)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchValue.length
          ? filteredData.length / 10
          : result / 10 || 1
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

      {/* MODAL İÇİN PAGE/MODALEXAMPLE KLASÖRÜNE BAK ORADA WİZARD İLE YAPILMIŞ HALİ VAR  */}

      <Modal isOpen={eventModalShow} toggle={() => setEventModalShow(!eventModalShow)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setEventModalShow(!eventModalShow)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-3'>
          <h1 className='text-center mb-1'>Event Details</h1>
          {/* <p className='text-center mb-2'>Provide application data with this form</p> */}
          <CardText className='mb-2'>{eventRowData.id}</CardText>
          <CardText className='mb-2'>{eventRowData.name}</CardText>
          <CardText className='mb-2'>{eventRowData.description}</CardText>
          <CardText className='mb-2'>{eventRowData.metadata}</CardText>
        </ModalBody>
      </Modal>

      <Modal isOpen={ruleModalShow} toggle={() => setRuleModalShow(!ruleModalShow)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setRuleModalShow(!ruleModalShow)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-3'>
          <h1 className='text-center mb-1'>Rule Details</h1>
          {/* <p className='text-center mb-2'>Provide application data with this form</p> */}
          <CardText className='mb-2'>{ruleRowData.id}</CardText>
          <CardText className='mb-2'>{ruleRowData.name}</CardText>
          <CardText className='mb-2'>{ruleRowData.description}</CardText>
          {/* SRC RULE'LARIN METADASI OLDUĞU ZAMAN YANDAKİ ŞEKİLDE DEĞİŞECEK ruleRowData.metadata?.children1  */}
          <ReactJson
            src={{
              "b88babba-cdef-4012-b456-7182352713e1": {
                "type": "rule",
                "properties": {
                  "field": "sayı",
                  "operator": "equal",
                  "value": [
                    "75"
                  ],
                  "valueSrc": [
                    "value"
                  ],
                  "valueType": [
                    "text"
                  ]
                }
              }
            }}
            theme="monokai"
          />
        </ModalBody>
      </Modal>
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
                  options={categorySelectData}
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
          <div className='react-dataTable'>
            <DataTable
              noHeader
              pagination
              subHeader
              responsive
              paginationDefaultPage={currentPage + 1}
              columns={columns}
              sortIcon={<ChevronDown />}
              className='react-dataTable'
              paginationComponent={CustomPagination}
              data={searchValue.length ? filteredData : alarmData.data}
              subHeaderComponent={
                <CustomHeader
                  setShow={setShow}
                  assignedTo={assignedTo}
                  searchValue={searchValue}
                  rowsPerPage={rowsPerPage}
                  handleFilter={handleFilter}
                  handlePerPage={handlePerPage}
                  handleAssignedToChange={handleAssignedToChange}
                />
              }
            />
          </div>
        </Card>
      </>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { alarmData: state.AlarmsReducer, ruleCategoryData: state.ruleCategoryReducer };
};

export default connect(mapStateToProps, {
  fetchAlarms,
  fetchAlarmsByCategory,
})(Table);
