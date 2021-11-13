import React, { useEffect, useState, useRef } from "react";
import Modal from "./components/Modal";

import Table from "./components/Table";

const App = () => {
  const [data, setData] = useState([]);
  const [query, setquery] = useState("");
  const [edit, setEdit] = useState(false);
  const [selectedID, setselectedID] = useState("");
  const [dataToDelete, setdataToDelete] = useState([]);
  //data to delete
  const dataDeleteHandler = (id) => {
    setdataToDelete((prevState) => [...prevState, id]);
  };
  //Getting id for row to edit
  const updatedSelectedID = (id) => {
    setselectedID(id);
  };
  //refs
  const name = useRef();
  const email = useRef();
  const role = useRef();

  //editing data
  const formHandler = (e) => {
    e.preventDefault();
    let editedData = data;
    editedData[selectedID - 1].name = name.current.value;
    editedData[selectedID - 1].email = email.current.value;
    editedData[selectedID - 1].role = role.current.value;
    setData(editedData);
    setEdit(false);
  };

  //search component
  const search = (rows) => {
    return rows.filter(
      (row) =>
        row.name.toLowerCase().indexOf(query) > -1 ||
        row.email.toLowerCase().indexOf(query) > -1 ||
        row.role.toLowerCase().indexOf(query) > -1
    );
  };

  //delete data handler
  const deleteDataHandler = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  //open modal handler
  const modalOpenHanlder = () => {
    setEdit(true);
  };
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const deleteMultiple = () => {
    var filtered = data.filter(function (item) {
      return dataToDelete.indexOf(item.id) === -1;
    });
    setData(filtered);
  };

  return (
    <main>
      {!data && <p>Data Loading</p>}
      <div className="input-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setquery(e.target.value)}
          placeholder="Search via any tag "
        />
      </div>
      <div>
        <Table
          data={search(data)}
          rowsPerPage={10}
          deleteDataHandler={deleteDataHandler}
          updatedSelectedID={updatedSelectedID}
          modalOpenHanlder={modalOpenHanlder}
          dataDeleteHandler={dataDeleteHandler}
          deleteMultiple={deleteMultiple}
        />
      </div>
      {edit && (
        <Modal>
          <form onSubmit={formHandler}>
            <label>
              Name: <input type="text" ref={name} required />
            </label>
            <br />
            <label>
              Email: <input type="email" ref={email} required />
            </label>
            <br />

            <label>
              Role: <input type="text" ref={role} required />
            </label>
            <br />
            <div className="modal-btn">
              <button type="button" onClick={() => setEdit(false)}>
                Close
              </button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </Modal>
      )}
    </main>
  );
};

export default App;
