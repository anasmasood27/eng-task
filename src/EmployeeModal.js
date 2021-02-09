import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    maxHeight: "419px",
  },
};

const intailEmployee = {
  first_name: "",
  last_name: "",
  title: "",
  city: "",
};

const EmployeeModal = (props) => {
  const { showModal, onModalClose, employee, onFromSubmit } = props;
  const [data, setData] = useState(employee || intailEmployee);

  useEffect(() => employee && setData(employee), [employee]);

  const onChange = ({ target }) => {
    let employee = {
      ...data,
      [target.name]: target.value,
    };
    setData(employee);
  };

  const onSubmitClick = () => {
    onFromSubmit(data);
    onModalClose();
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={onModalClose}
      contentLabel="Employee Form"
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="ui large header">Employee form</div>

      <form className="ui form">
        <div className="field">
          <label>First Name</label>
          <input
            name="first_name"
            placeholder="First Name"
            onChange={onChange}
            value={data.first_name}
          />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input
            name="last_name"
            placeholder="Last Name"
            onChange={onChange}
            value={data.last_name}
          />
        </div>
        <div className="field">
          <label>Title</label>
          <input
            name="title"
            placeholder="Title"
            onChange={onChange}
            value={data.title}
          />
        </div>
        <div className="field">
          <label>City</label>
          <input
            name="city"
            placeholder="City"
            onChange={onChange}
            value={data.city}
          />
        </div>

        <div>
          <button
            type="button"
            className="ui button green"
            onClick={onSubmitClick}
          >
            Submit
          </button>
          <button type="button" className="ui button" onClick={onModalClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeModal;
