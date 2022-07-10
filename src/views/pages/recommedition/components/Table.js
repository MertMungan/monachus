// ** React Imports
import React, {
  Fragment,
  useState,
  forwardRef,
  useEffect,
  useCallback,
} from "react";
// ** Add New Modal Component
import AddNewModal from "../../../../views/tables/data-tables/basic/AddNewModal";
// ** Third Party Components
import DataTable, { createTheme } from "react-data-table-component";
import { ChevronDown, Share, FileText, Copy } from "react-feather";
import {
  Card,
  CardHeader,
  CustomInput,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Row,
  Col,
  Modal,
  ModalBody,
  FormGroup,
} from "reactstrap";
import Papa from "papaparse";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SpaceContext } from "antd/lib/space";
import DialogContentText from "@mui/material/DialogContentText";
import ReactJson from "react-json-view";
import { isJsonString, exampleJsonData } from "../../search/utils";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { fetchRemovedItem } from "../../../../redux/actions/recommeditionItems";
import { addRowsData } from "../../../../redux/actions/table";
import { useSkin } from '@hooks/useSkin'


// ** Bootstrap Checkbox Component
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

const Table = ({
  list = [],
  minWidth = "100px",
  selectedCollection = {},
  useExport = true,
  useImport = true,
  useSearch = true,
  hasCollection = true,
  showDetails = () => {},
  onDelete = () => {},
  getFile = () => {},
  fetchRemovedItem = () => {},
  tableRemoveItem = () => {},
  addRowsData = () => {},
}) => {
  // ** States
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalList, setTotalList] = useState([]);
  const [currentColumnList, setCurrentColumnList] = useState([]);
  const [formModal, setFormModal] = useState(false);
  const [manualModal, setManualModal] = useState(false);
  const [jsonDataError, setJsonDataError] = useState("");
  const [manualJsonData, setManualJsonData] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [skin, setSkin] = useSkin()


  createTheme('light', {
    text: {
      primary: 'black',
      secondary: 'black',
    },
    background: {
      default: 'white',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#ededed',
    },
  });

  createTheme('dark', {
    text: {
      primary: '#c9ccd0',
      secondary: '#c9ccd0',
    },
    background: {
      default: '#283046',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#343c4e',
    },
  });

  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };
  const onCopy = () => {
    setCopied(true);
  };

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  useEffect(() => {
    if (list?.length > 0) {
      setTotalList(list);
    } else {
      setTotalList([]);
    }
  }, [list]);

  useEffect(() => {
    if (selectedCollection?.name) {
      setHasSelected(true);
    }
  }, [selectedCollection]);

  // ** DENEME
  useEffect(() => {
    addRowsData(selectedRows);
  }, [selectedRows]);

  useEffect(() => {
    if (totalList.length > 0) {
      const column = totalList.map((item) => {
        return Object.keys(item).map((key) => {
          return {
            name: key.toString(),
            selector: key.toString(),
            sortable: true,
            minWidth: minWidth,
          };
        });
      });
      // BURASI KONTROL EDİLECEK
      setCurrentColumnList([...column[0]]);
    }
  }, [totalList]);

  // MODAL AÇMA
  const handleModalOpen = () => {
    setFormModal(true);
  };
  const handleManualModalOpen = () => {
    setManualModal(true);
  };
  // MODAL KAPAMA
  const handleModalClose = () => {
    setFormModal(false);
  };
  const handleManualModalClose = () => {
    setManualModal(false);
  };

  // ADD MANUALLY MODAL DATA
  const handleChange = (e) => {
    setManualJsonData(e.target.value);
  };

  // MANUAL JSON EKLEME
  const handleClose = () => {
    const isJson = isJsonString(manualJsonData);

    if (isJson) {
      if (Object.keys(JSON.parse(manualJsonData)).length < 1) {
        setJsonDataError("Please add an non empty array");
      } else {
        setTotalList(JSON.parse(manualJsonData));
        setManualModal(false);
      }
    } else
      setJsonDataError("Your text cannot be converted to JSon please check");
  };

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = totalList.filter((item) => {
        const startsWith = Object.keys(item).some((key) => {
          return item[key]
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase());
        });

        const includes = Object.keys(item).some((key) => {
          return item[key]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        });

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

  const handleRemoveItem = (e) => {
    const id = selectedRows.map((item) => {
      return item.id;
    });
    const remainingSuggestions = totalList?.filter(
      (row) => !id.includes(row.id)
    );
    setTotalList(remainingSuggestions);
    // setTotalList(totalList.filter(item => item.id !== id));

    const removedData = totalList?.filter((row) => id.includes(row.id));
    tableRemoveItem(removedData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file.name.endsWith(".json")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = isJsonString(e.target.result);
        if (data) {
          const parsedData = JSON.parse(e.target.result);
          setTotalList(parsedData);
          getFile(parsedData);

          // burada axios isteği atılacak. table'a gelen collection ismini ve yüklenen dosyayı akif abiye yollayacağız.
        }
      };
      reader.readAsText(file);
    } else if (file.name.endsWith(".csv")) {
      // we need to catch any errors that might occur while reading or parsing the file
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;

          const csvData = Papa.parse(data, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: "greedy",
          }).data;

          setTotalList(csvData);
        };
        reader.readAsText(file);
      } catch (error) {
        toast.error("Error while reading the file");
      }
    }
    setFormModal(false);
  };
  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal);

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(array[0]);

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

  function downloadJSON(array) {
    const link = document.createElement("a");
    let json = JSON.stringify(array);
    if (json === null) return;

    const filename = "export.json";

    if (!json.match(/^data:text\/json/i)) {
      json = `data:application/json;charset=utf-8,${json}`;
    }

    link.setAttribute("href", encodeURI(json));
    link.setAttribute("download", filename);
    link.click();
  }

  const onDiscard = () => {
    if (selectedRows.length > 0 && selectedRows.topicName)
      reset({
        topicName: selectedRows[0].topicName,
        name: selectedRows[0].name,
        description: selectedRows[0].description,
      });
    // console.log("BASILDI");
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-items-center align-items-right border-bottom">
          <div className="btn-group" role="group" aria-label="Basic example">
            {selectedRows.length === 1 ? (
              <>
                <Button
                  key="Details"
                  className="ml-2"
                  color="primary"
                  onClick={() => {
                    showDetails();
                    handleClearRows();
                  }}
                >
                  Details
                </Button>
                <Button
                  key="Archive"
                  className="ml-2"
                  color="primary"
                  onClick={handleClearRows}
                >
                  Archive
                </Button>
                <Button
                  key="delete"
                  outline
                  className="ml-2"
                  onClick={() => {
                    onDelete();
                    handleClearRows();
                  }}
                  color="primary"
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                {selectedRows.length > 1 ? (
                  <>
                    <Button key="Archive" className="ml-2" color="primary">
                      Archive
                    </Button>
                    <Button
                      key="delete"
                      outline
                      className="ml-2"
                      onClick={onDelete}
                      color="primary"
                    >
                      Delete
                    </Button>
                  </>
                ) : null}
              </>
            )}
          </div>
          <div className="btn-group" role="group" aria-label="Basic example">
            {useImport && hasCollection && (
              <>
                <UncontrolledButtonDropdown>
                  <DropdownToggle color="primary" className="ml-2" caret>
                    <Share size={15} />
                    <span className="align-middle ml-50">Import</span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      className="w-100"
                      onClick={() => {
                        handleModalOpen();
                      }}
                    >
                      <span key="Import" className="ml-2" color="primary">
                        Import a File
                      </span>
                    </DropdownItem>
                    <DropdownItem
                      className="w-100"
                      onClick={() => {
                        handleManualModalOpen();
                      }}
                    >
                      <span key="Import" className="ml-2" color="primary">
                        Add Manually
                      </span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </>
            )}
            {((true && hasSelected) || useExport) && (
              <UncontrolledButtonDropdown>
                <DropdownToggle color="primary" className="ml-2" caret>
                  <Share size={15} />
                  <span className="align-middle">Export</span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    className="w-100"
                    onClick={() => downloadCSV(totalList)}
                  >
                    <FileText size={15} />
                    <span className="align-middle">CSV</span>
                  </DropdownItem>

                  <DropdownItem
                    className="w-100"
                    onClick={() => downloadJSON(totalList)}
                  >
                    <FileText size={15} />
                    <span className="align-middle">JSON</span>
                  </DropdownItem>
                  <CopyToClipboard
                    onCopy={onCopy}
                    text={JSON.stringify(totalList)}
                  >
                    <DropdownItem className="w-100">
                      <Copy size={15} />
                      <span className="align-middle">Copy</span>
                    </DropdownItem>
                  </CopyToClipboard>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            )}
            {/* ADD RECORD BUTTON'U ŞU AN Kİ SÜRÜMDE OLMAYACAK İLERİSİ İÇİN DÜŞÜNÜLÜYOR */}
            {/* <Button className="ml-2" color="primary" onClick={handleModal}>
              <Plus size={15} />
              <span className="align-middle ml-50">Add Record</span>
            </Button> */}
          </div>
        </CardHeader>
        <Row className="justify-content-end mx-0">
          <Modal
            isOpen={formModal}
            toggle={() => handleModalClose()}
            className="modal-dialog-centered"
          >
            {/* <ModalHeader toggle={() => handleModalClose()}></ModalHeader> */}
            <ModalBody>
              <FormGroup>
                <CustomInput
                  type="file"
                  id="exampleCustomFileBrowser"
                  name="customFile"
                  label={"Select either a csv or json file"}
                  onChange={handleFileChange}
                  accept=".csv, .json"
                />
              </FormGroup>
            </ModalBody>
          </Modal>
          <Modal
            isOpen={manualModal}
            toggle={() => handleManualModalClose()}
            className="modal-dialog-centered"
          >
            <ModalBody>
              <DialogContentText sx={{ color: "#b4b7bd" }}>
                Add records in JSON format. JSON should contain either a single
                object or an array of objects. For example:
              </DialogContentText>
              <ReactJson
                src={exampleJsonData()}
                displayObjectSize={false}
                theme="monokai"
                name={false}
                displayDataTypes={false}
              />
              <br />
              <br />
              <hr />
              <Typography>Please enter your Json object</Typography>
              {jsonDataError && (
                <Typography color="red">{jsonDataError}</Typography>
              )}
              <TextField
                id="outlined-multiline-static"
                label=""
                multiline
                rows={10}
                defaultValue=""
                onChange={handleChange}
                style={{ backgroundColor: "grey", width: "100%" }}
              />
            </ModalBody>
            <Button variant="contained" autoFocus onClick={handleClose}>
              Evalute Data
            </Button>
          </Modal>
          {useSearch && (
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
          )}
        </Row>

        <DataTable
          noHeader
          pagination
          selectableRows
          columns={currentColumnList}
          paginationPerPage={10}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          data={searchValue.length ? filteredData : totalList}
          selectableRowsComponent={BootstrapCheckbox}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggledClearRows}
          theme={skin === "dark" ? "dark":"light"}
        />
      </Card>

      <AddNewModal open={modal} handleModal={handleModal} />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    showRemovedData: state.recommeditionItemsReducer,
    rowsData: state.tableRowsReducer,
  }; // PROP!!!!! collectionList !!!
};

export default connect(mapStateToProps, { fetchRemovedItem, addRowsData })(
  // FUNCTIONLARDA PROP OLUYOR
  Table
);
