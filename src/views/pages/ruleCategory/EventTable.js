// ** React Imports
import { Fragment, useState, useEffect, forwardRef } from "react";

// ** Add New Modal Component
import ReactPaginate from "react-paginate";
import AddNewModal from "../../tables/data-tables/basic/AddNewModal";

import { useContext } from "react";
import { AbilityContext } from "@src/utility/context/Can";

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
import { fetchEvents, deleteEvents } from "../../../redux/actions/events/index";
// REDUX

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const Table = ({
  listData = [],
  wizardOpen = false,
  setWizardOpen = () => {},
  setResetInfo = () => {},
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [modal, setModal] = useState(false);
  const [listBilgisi, setListBilgisi] = useState([]);
  const handleModal = () => setModal(!modal);

  const ability = useContext(AbilityContext);

  useEffect(() => {
    setListBilgisi(listData);
  }, [listData]);

  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = listBilgisi?.filter((item) => {
        const startsWith =
          item.categoryId.toLowerCase().startsWith(value.toLowerCase()) ||
          item.categoryName.toLowerCase().startsWith(value.toLowerCase()) ||
          item.categoryDescription
            .toLowerCase()
            .startsWith(value.toLowerCase());

        const includes =
          item.categoryId.toLowerCase().includes(value.toLowerCase()) ||
          item.categoryName.toLowerCase().includes(value.toLowerCase()) ||
          item.categoryDescription.toLowerCase().includes(value.toLowerCase());

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
      name: "ID",
      selector: (row) => row.categoryId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.categoryName,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.categoryDescription,
      sortable: true,
    },
    // {
    //   name: "Status",
    //   selector: (row) => row.eventStatus,
    //   sortable: true,
    // },
    ability.can("create", "cep") && {
      name: "Actions",
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className="d-flex">
            <UncontrolledDropdown>
              <DropdownToggle className="pr-1" tag="span">
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => e.preventDefault()}
                >
                  <FileText size={15} />
                  <span className="align-middle ml-50">Details</span>
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => e.preventDefault()}
                >
                  <Archive size={15} />
                  <span className="align-middle ml-50">Archive</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Trash
              className="mr-1"
              size={15}
              onClick={deleteEvents(row.eventId)}
            />
            <Edit
              size={15}
              onClick={() => {
                setResetInfo(row);
                setWizardOpen(true);
              }}
            />
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
  // const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  //   <div className="custom-control custom-checkbox">
  //     <input
  //       type="checkbox"
  //       className="custom-control-input"
  //       ref={ref}
  //       {...rest}
  //     />
  //     <label className="custom-control-label" onClick={onClick} />
  //   </div>
  // ));

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">Category List</CardTitle>
          {ability.can("create", "cep") && (
            <div className="d-flex mt-md-0 mt-1">
              <Button
                color="primary"
                className="mr-0"
                onClick={() => {
                  setResetInfo({});
                  setWizardOpen(!wizardOpen);
                }}
              >
                Create Category
              </Button>
            </div>
          )}
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
          // selectableRows
          columns={columns}
          paginationPerPage={7}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : listBilgisi}
          // selectableRowsComponent={BootstrapCheckbox}
        />
      </Card>
      <AddNewModal open={modal} handleModal={handleModal} />
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return { eventList: state.fields };
};

export default connect(mapStateToProps, { fetchEvents, deleteEvents })(Table);
