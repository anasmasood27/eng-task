import React, { useState } from "react";
import state from "../state/initialState";
import faker from "faker";

const useData = () => {
  const [employeeList, setEmployeeList] = useState(state);

  const removeEmployee = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove the employee?"
    );

    if (confirmed) {
      let arr = [...employeeList];
      arr = arr.filter((employee) => employee.id !== id);
      setEmployeeList(arr);
    }
  };

  const findMaxId = () =>
    Math.max.apply(
      Math,
      employeeList.map((employee) => employee.id)
    );

  const saveEmployee = (employee) => {
    if (employee.hasOwnProperty("id")) {
      let arr = [...employeeList];
      const index = arr.findIndex((user) => user.id === employee.id);

      arr[index] = employee;
      setEmployeeList(arr);
    } else {
      employee.id = findMaxId() + 1;
      employee.image = faker.random.image();
      setEmployeeList(employeeList.concat([employee]));
    }
  };

  return {
    employeeList,
    removeEmployee,
    saveEmployee,
  };
};

export default useData;
