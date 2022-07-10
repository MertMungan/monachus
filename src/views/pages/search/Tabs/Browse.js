import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import { useSkin } from "@hooks/useSkin";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Table from "../../recommedition/components/Table";
import CollectionTopBar from "../../collection/components/CollectionTopBar";

import { Col, Row, Card } from "reactstrap";

// REDUX
import { connect } from "react-redux";
import { addCollection } from "../../../../redux/actions/collections";
import { fetchCollectionsData } from "../../../../redux/actions/collectionsData";
// REDUX
import "./BrowseCss.css";

function CustomizedDialogs({
  collectionList = [],
  collectionDataList = [],
  fetchCollectionsData = () => {},
}) {
  const [skin, setSkin] = useSkin();
  const [jsonListData, setJsonListData] = useState([]);
  const [filteredJsonListData, setFilteredJsonListData] = useState([]);
  const [keysToUse, setKeysToUse] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState({});
  const [searchOptions, setSearchOptions] = useState({
    searchType: "Search",
    searchedList: [],
  });
  const [collections, setCollections] = useState([]);
  const [collectionsData, setCollectionsData] = useState([
    {
      name: "Collection 1",
      label: "Collection 1",
      id: "1",
      data: [
        {
          id: "1",
          name: "Mert",
          age: "25",
          city: "Istanbul",

          country: "Turkey",
          image: "https://picsum.photos/200/300",
        },
        {
          id: "2",
          name: "Oguz",
          age: "213",
          patates: "püre",
          city: "Adana",
          country: "Turkey",
          image: "https://picsum.photos/200/300",
        },
      ],
    },
    {
      name: "Collection 2",
      label: "Collection 2",
      id: "2",
      data: [
        {
          id: "1",
          name: "Ömer",
          age: "27",
          city: "Istanbul",
          country: "Turkey",
          image: "https://picsum.photos/200/300",
        },
        {
          id: "1",
          name: "Ömer",
          age: "27",
          city: "Istanbul",
          country: "Turkey",
          image: "https://picsum.photos/200/300",
          asdasdas: "asfasmfamkfaskmfas",
        },
      ],
    },
  ]);

  const handleSelect = (e) => {
    setSearchOptions({
      ...searchOptions,
      searchType: e.target.value,
    });
  };

  const mapJsonObjectKeys = () => {
    const keys = jsonListData.map((item) => Object.keys(item));
    const uniqueKeys = [...new Set([].concat(...keys))];
    uniqueKeys.sort();

    setKeysToUse(uniqueKeys);
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.

    const filteredList = jsonListData?.filter((item) => {
      let isMatch = false;
      Object.keys(item).forEach((key) => {
        if (item[key].toString().toLowerCase().includes(string.toLowerCase())) {
          isMatch = true;
        }
      });
      return isMatch;
    });
    setFilteredJsonListData(filteredList);
  };

  const handleOnHover = (result) => {
    // the item hovered
  };

  const handleOnSelect = (item) => {
    // the item selected
    const keys = Object.keys(item);
    const values = Object.values(item);

    const selectedItem = jsonListData?.filter((item) => {
      let isMatch = true;
      keys.forEach((key, index) => {
        if (item[key] !== values[index]) {
          isMatch = false;
        }
      });
      return isMatch;
    });

    setSearchOptions({
      ...searchOptions,
      searchedList: [...searchOptions.searchedList, selectedItem[0]],
    });
  };
  const handleCollectionSelect = (opt) => {
    setSelectedCollection(opt);
    const selectedData = collectionsData.filter((item) => {
      return item?.id === opt?.id;
    });
    if (!selectedData[0]?.data) {
      setJsonListData([]);
    } else {
      setJsonListData(selectedData[0].data);
    }
  };

  const handleOnFocus = () => {};

  const handleOnClear = () => {};

  const formatResult = (item) => {
    return Object.entries(item).map(([key, value], index) => {
      return (
        <>
          <div key={index} style={{ zIndex: "1000" }}>
            {key} : {value}
          </div>
        </>
      );
    });
  };

  useEffect(() => {
    mapJsonObjectKeys();
    if (jsonListData) {
      const keys = jsonListData?.map((item) => Object.keys(item));
      const uniqueKeys = [...new Set([].concat(...keys))];
      uniqueKeys.sort();
    } else {
    }
  }, [jsonListData]);

  useEffect(() => {
    if (
      selectedCollection?.id &&
      fetchCollectionsData(selectedCollection?.id)
    ) {
      if (collectionDataList.length > 0) {
        setJsonListData(collectionDataList.data);
      }
    }
    // AXIOS CALL ILE YENI DATALARI CEK
  }, [selectedCollection]);

  useEffect(() => {
    setCollections(collectionList);
  }, [collectionList]);

  return (
    <div>
      <CollectionTopBar
        collectionList={collections}
        handleSelectedCollection={handleCollectionSelect}
        showAddCollection={false}
      />
      <br />

      {collectionsData.length === 0 ? (
        <>
          <Col container xs="12" sm="12" md="12">
            <Col item xs="1" sm="1" md="1">
              <Select
                onChange={handleSelect}
                value={searchOptions.searchType}
                IconComponent={() => null}
                style={{
                  color: skin === "dark" ? "rgb(208, 210, 214)" : "black",
                }}
              >
                <MenuItem value="Search" selected>
                  Search
                </MenuItem>
                <MenuItem value="ObjectId">Object ID</MenuItem>
              </Select>
            </Col>
            <Col item xs="11" sm="11" md="11">
              {keysToUse.length > 0 && (
                <ReactSearchAutocomplete
                  items={jsonListData}
                  fuseOptions={{
                    keys: [...keysToUse],
                  }}
                  resultStringKeyName="firstname"
                  onSearch={handleOnSearch}
                  onHover={handleOnHover}
                  onSelect={handleOnSelect}
                  onFocus={handleOnFocus}
                  onClear={handleOnClear}
                  autoFocus
                  formatResult={formatResult}
                />
              )}
            </Col>
          </Col>

          <Table
            list={
              filteredJsonListData.length === 0
                ? jsonListData
                : filteredJsonListData
            }
            useImport={false}
          />
        </>
      ) : (
        <>
          {jsonListData?.length === 0 ? (
            <Col xs="4" sm="8" md="12">
              <Col item xs="0" sm="2" md="4"></Col>
            </Col>
          ) : (
            <>
              <Col
                style={{
                  height: "20px",
                  backgroundColor: skin === "dark" ? "#283046" : "#ebe9f1 ",
                }}
              ></Col>

              <Col xs="12" sm="12" md="12">
                <Row>
                  <Col item xs="1" className="p-0">
                    <Select
                      className="w-100"
                      onChange={handleSelect}
                      value={searchOptions.searchType}
                      IconComponent={() => null}
                      style={{
                        color: skin === "dark" ? "rgb(208, 210, 214)" : "black",
                        backgroundColor:
                          skin === "dark" ? "#283046" : "#ededed",
                        borderBottomLeftRadius: "0px",
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                      }}
                    >
                      <MenuItem value="Search" selected>
                        {" "}
                        Search
                      </MenuItem>
                      <MenuItem value="ObjectId">Object ID</MenuItem>
                    </Select>
                  </Col>
                  <Col
                    item
                    xs="11"
                    className="p-0 pr-2"
                    style={{
                      backgroundColor: skin === "dark" ? "#283046" : "#ededed",
                    }}
                    // #6e6b7b
                  >
                    {keysToUse.length > 0 && (
                      <ReactSearchAutocomplete
                        items={jsonListData}
                        fuseOptions={{
                          keys: [...keysToUse],
                        }}
                        resultStringKeyName={keysToUse[5]}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        onClear={handleOnClear}
                        placeholder="Enter your search input"
                        autoFocus
                        formatResult={formatResult}
                        styling={{
                          color:
                            skin === "dark" ? "rgb(208, 210, 214)" : "black",
                          backgroundColor:
                            skin === "dark" ? "#283046" : "#ededed",
                          border: "1px solid #404656",
                        }}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
              <Table
                list={
                  filteredJsonListData.length === 0
                    ? jsonListData
                    : filteredJsonListData
                }
                useImport={false}
                useSearch={false}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    collectionList: state.collectionsReducer,
    collectionDataList: state.collectionsDataReducer,
  }; // PROP!!!!! collectionList !!!
};

export default connect(mapStateToProps, {
  addCollection,
  fetchCollectionsData,
})(
  // FUNCTIONLARDA PROP OLUYOR
  CustomizedDialogs
);
