import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { orderBy } from "lodash";

const URL = "https://reqres.in/api";
export const Deneme = () => {
  const [delay, setDelay] = useState(1000);
  const [pageToFetch, setPageToFetch] = useState(1);
  //states for remote pagination
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [keyToUse, setKeyToUse] = useState("users");
  const [sortField, setSortField] = useState("");
  const [direction, setDirection] = useState("desc");
  // states for remote sorting
  const [columns, setColumns] = useState([
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
      sortField: "first_name",
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
      sortField: "last_name",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      sortField: "email",
    },
  ]);

  // states for remote filtering
  const [filter, setFilter] = useState("");
  // functions for remote pagination
  const fetchUsers = async (page = pageToFetch) => {
    setLoading(true);

    const response = await axios.get(
      `${URL}/${keyToUse}?page=${page}&per_page=${perPage}&delay=${delay}`
    );
    setData(response.data.data);

    setTotalRows(response.data.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    setPageToFetch(page);
    setPerPage(newPerPage);

    const response = await axios.get(
      `${URL}/${keyToUse}?page=${pageToFetch}&per_page=${perPage}&delay=${delay}`
    );
    setData(response.data.data);

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(pageToFetch);
  }, [pageToFetch]);

  // functions for remote sorting
  const handleSort = async (column, sortDirection) => {
    setSortField(column.sortField);
    setDirection(sortDirection);
    setLoading(true);

    const response = await axios.get(
      `${URL}/${keyToUse}?q=data&sort=${sortField}&order=${direction}`
    );
    // instead of setTimeout this is where you would handle your API call.
    setData(response.data.data);

    setLoading(false);
  };

  //function to filter data remotely
  const handleFilter = (filterValue) => {
    setLoading(true);
    setFilter(filterValue);
    const response = axios.get(
      `${URL}/${keyToUse}?q=${filter}&per_page=${perPage}&sort=${sortField}`
    );
    // instead of setTimeout this is where you would handle your API call
    setData(response.data.data);
  };

  return (
    <DataTable
      title="Users"
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      sortServer
      onSort={handleSort}
      persistTableHead
    />
  );
};

export default Deneme;
