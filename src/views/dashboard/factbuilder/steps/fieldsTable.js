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
  ListGroup,
  ListGroupItem,
  Col,
} from "reactstrap";
// REDUX
import { connect } from "react-redux";
// REDUX

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const FieldsTable = ({
  listData = [],
  setWizardOpen = () => {},
  eventName = "",
  setFields = () => {},
  resetFields = [],
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [listBilgisi, setListBilgisi] = useState([]);

  useEffect(() => {
    if (resetFields.length === 0 && listData) {
      // push listData to listBilgisi while keeping the previous state
      let list = [...listBilgisi, listData];
      // if the first element of the list is an empty array, remove it
      if (list[0].length === 0) {
        list.shift();
      }
      setListBilgisi(list);
    } else if (resetFields.length !== 0 && listData) {
      let mapped = resetFields.map((item) => {
        return {
          factDefination: item.factDefination,
          factType: item.factType,
        };
      });
      let list = [...mapped, listData];
      // if any element of the list is an empty array, remove it
      list.forEach((item) => {
        if (item.length === 0) {
          list.splice(list.indexOf(item), 1);
        }
      });
      setListBilgisi(list);
    }
  }, [listData, resetFields]);

  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = listBilgisi?.filter((item) => {
        const startsWith =
          item.factDefination.toLowerCase().startsWith(value.toLowerCase()) ||
          item.factType.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.factDefination.toLowerCase().includes(value.toLowerCase()) ||
          item.factType.toLowerCase().includes(value.toLowerCase());

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
      selector: (row) => row.factDefination,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.factType,
      sortable: true,
    },
    {
      name: "Actions",
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className="d-flex">
            <Trash size={15} />
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
  const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        ref={ref}
        {...rest}
      />
      <label className="custom-control-label" onClick={onClick} />
    </div>
  ));

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">{eventName}</CardTitle>
        </CardHeader>
        <Row className="justify-content-end mx-0">
          <Col
            className="d-flex align-items-center justify-content-end mt-1"
            md="6"
            sm="12"
          >
            <Button
              color="primary"
              className="mr-0 mb-1"
              /* onClick={() => {
                setFields(listBilgisi);
              }} */

              // onClick i need to setFields(listBilgisi) and close the wizard
              onClick={() => {
                setFields(listBilgisi), setWizardOpen(false);
              }}
            >
              Save
            </Button>
          </Col>
        </Row>

        <DataTable
          noHeader
          pagination
          selectableRows
          columns={columns}
          paginationPerPage={7}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : listBilgisi}
          selectableRowsComponent={BootstrapCheckbox}
        />
      </Card>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return { eventList: state.fields };
};

export default connect(mapStateToProps)(FieldsTable);
