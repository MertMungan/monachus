// ** React Imports
import { Fragment, useState, useEffect } from "react";
import "../../../formControlColor.css";
// ** Add New Modal Component
import ReactPaginate from "react-paginate";
import { useForm } from "react-hook-form";

import { useContext } from "react";
import { AbilityContext } from "@src/utility/context/Can";

// ** Third Party Components
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  FileText,
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
// REDUX
import { connect } from "react-redux";
import { fetchEvents } from "../../../redux/actions/events/index";
import { fetchRule } from "../../../redux/actions/rules/index";
import { deleteMetaDataRules } from "../../../redux/actions/metaDataRules"
// REDUX

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const Table = ({
  wizardOpen = false,
  setWizardOpen = () => {},
  setResetInfo = () => {},
  deleteMetaDataRules = () => {},
  listData = []
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [modal, setModal] = useState(false);
  const [listBilgisi, setListBilgisi] = useState([]);
  const [active, setActive] = useState("1");
  const [listedCategory, setListedCategory] = useState("");
  // STATES

  const ability = useContext(AbilityContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  // useEffect(() => {
  //   // console.log("listBilgisi", listBilgisi);
  //   // console.log("listedCategory", listedCategory);
  //   if (listBilgisi.length > 0) {
  //     // listBilgisi'nin elementleri arasında category propertysi listedCategory'a eşit olanları filtrele
  //     const filteredData = queryList.data?.filter((item) => {
  //       return item.category === listedCategory;
  //     });
  //     setListBilgisi(filteredData);
  //   }
  // }, [listedCategory]);

  // useEffect(() => {
  //   setListBilgisi(queryList.data);
  // }, [queryList]);

  useEffect(() => {
    setListBilgisi(listData);
  }, [listData]);

  const ExpandableTable = ({ data }) => {
    // console.log("expandableTable data", data);
    return (
      <div className="expandable-content p-2 justify-center">
        {data.fields.map((item) => {
          return;
        })}
      </div>
    );
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = listBilgisi?.filter((item) => {
        const startsWith =
          item.category.toLowerCase().startsWith(value.toLowerCase()) ||
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.desc.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.category.toLowerCase().includes(value.toLowerCase()) ||
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.desc.toLowerCase().includes(value.toLowerCase());

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
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Rule Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Applied Event",
      selector: (row) => row.assigned_event,
      sortable: true,
    },
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
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => e.preventDefault()}
                >
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Trash 
            size={15}
            className='mr-1'
            onClick={() => deleteMetaDataRules(row.id)}
          />

            <Edit
              size={15}
              onClick={() => {
                setResetInfo({
                  id: row.id,
                  name: row.name,
                  description: row.description,
                  assignedEvent: row.assigned_event,
                  assignedCategory: row.category_id,
                  builderInfo: row.metadata,
                  configuration: "",
                });
                setWizardOpen(true);
              }}
            ></Edit>
          </div>
        );
      },
    },
    ability.can("create", "cep") &&
    {
      name: "Status",
      allowOverflow: true,
      maxWidth: "35px",
      cell: (row) => {
        return (
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              name={row.id}
              id={row.id}
              data-toggle="toggle"
              ref={register({})}
            />
            <label
              className="custom-control-label"
              htmlFor={row.id}
            ></label>
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
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">List of Rules</CardTitle>
          {ability.can("create", "cep") && 
            <div className="d-flex mt-md-0 mt-1">
              <Button
                color="primary"
                onClick={() => {
                  setResetInfo({
                    id: "",
                    name: "",
                    description: "",
                    assignedEvent: "",
                    assignedCategory: "",
                    builderInfo: [],
                    configuration: "",
                  });
                  setWizardOpen(!wizardOpen);
                }}
              >
                Create Rule
              </Button>
            </div>
          }
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
  );
};
const mapStateToProps = (state) => {
  return { eventList: state.fields, queryList: state.query };
};

export default connect(mapStateToProps, { fetchEvents, fetchRule,deleteMetaDataRules })(Table);
