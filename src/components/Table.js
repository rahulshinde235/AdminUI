import React, { useState } from "react";

import useTable from "./UseTable";
import TableFooter from "./TableFooter";

const Table = ({
  data,
  rowsPerPage,
  deleteDataHandler,
  updatedSelectedID,
  modalOpenHanlder,
  dataDeleteHandler,
  deleteMultiple,
}) => {
  const [page, setPage] = useState(1);
  const [selectedID, setselectedID] = useState("");
  const { slice, range } = useTable(data, page, rowsPerPage);
  const onDeleteHandler = (e) => {
    deleteDataHandler(e.target.value);
  };
  const onEditHandler = (e) => {
    setselectedID(e.target.value);
    updatedSelectedID(selectedID);
    modalOpenHanlder();
  };
  const selectHandler = (id) => {
    dataDeleteHandler(id);
  };
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr key={el.id}>
              <td>
                {" "}
                <input
                  type="checkbox"
                  value={el.id}
                  onChange={() => selectHandler(el.id)}
                />
              </td>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.role}</td>
              <td className="btn">
                <button value={el.id} onClick={(e) => onEditHandler(e)}>
                  Edit
                </button>
                <button value={el.id} onClick={(e) => onDeleteHandler(e)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
      <button className="btn-danger" onClick={deleteMultiple}>
        Delete
      </button>
    </div>
  );
};

export default Table;
