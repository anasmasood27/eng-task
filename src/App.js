/* eslint-disable */

import React, { useState, useEffect } from "react";
import ResultList from "./ResultList";
import Pagination from "pagination-component";
import useData from "./hooks/useData";
import EmployeeModal from "./EmployeeModal";
import { css } from "glamor";

const App = () => {
  const perPage = 15;
  const data = useData();
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [activePage, setActivePage] = useState(0);
  const [updateEmployee, setUpdateEmployee] = useState();

  useEffect(() => {
    if (searchParams === "") {
      loadResults();
    } else {
      performSearch();
    }
  }, [searchParams, data.employeeList]);

  const loadResults = async () => {
    setEmployees(data.employeeList);
    setFilterRecords([...data.employeeList].slice(0, perPage));
  };

  const onUpdateEmployee = (employee) => {
    setUpdateEmployee(employee);
    setShowModal(true);
  };

  const onModalClose = () => {
    setUpdateEmployee(undefined);
    setShowModal(false);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > employees.length / perPage) return;

    let num = pageNumber == 0 ? 1 : pageNumber + 1;

    setFilterRecords([...employees].slice(pageNumber * perPage, perPage * num));

    setActivePage(pageNumber);
  };

  const handleChange = ({ target }) => setSearchParams(target.value);

  const performSearch = () => {
    if (searchParams.length != 2) {
      let data = employees.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchParams.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchParams.toLowerCase())
      );

      setEmployees(data);
      setFilterRecords(data);
    }
  };

  const handleKeyDown = (event) => {
    searchParams.length >= 2 && setSearchParams(event.target.value);
  };

  const clearSearch = (event) => setSearchParams("");

  let columns = [
    { title: "First Name", prop: "first_name" },
    { title: "Last Name", prop: "last_name" },
    { title: "City", prop: "city" },
    { title: "Title", prop: "title" },
    { title: "Image", prop: "image" },
  ];

  let pageLink = css({
    marginRight: 5,
    border: "1px #bababc solid",
    padding: 5,
    marginLeft: 5,
    display: "inline-block",
    borderRadius: 5,
  });

  let currentLink = css({
    backgroundColor: "#0074c2",
    display: "inline-block",
    color: "#FFFFFF",
  });

  return (
    <div className="ui text container">
      <div className="ui large header" style={{ marginTop: 20 }}>
        Employees
        <button
          className="ui button green right floated"
          onClick={() => setShowModal(true)}
        >
          Add New Employee
        </button>
      </div>

      <div className="ui action input" style={{ width: "100%" }}>
        <input
          type="text"
          placeholder="Search"
          className="search"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={searchParams}
        />
        {searchParams.length > 0 && (
          <span className="clear-text" onClick={clearSearch}>
            {" "}
            X{" "}
          </span>
        )}
        <button
          className="ui button"
          onClick={performSearch}
          disabled={searchParams.length < 3}
        >
          Search
        </button>
      </div>

      <div className="results">
        {filterRecords && (
          <ResultList
            employees={filterRecords}
            data={data}
            onUpdateEmployee={onUpdateEmployee}
          />
        )}
        {filterRecords.length == 0 && (
          <h3 style={{ textAlign: "center" }}> No Records Found </h3>
        )}
        <Pagination
          currentPage={activePage}
          pageCount={employees.length / perPage}
          pageLinkClassName={pageLink}
          currentLinkClassName={currentLink}
          onPageClick={(i) => {
            handlePageChange(i);
          }}
        />
      </div>
      <EmployeeModal
        showModal={showModal}
        onModalClose={onModalClose}
        onFromSubmit={data.saveEmployee}
        employee={updateEmployee}
      />
    </div>
  );
};

export default App;
