import React, { useEffect } from "react";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="btn-footer">
      {range.map((el, index) => (
        <button key={index} onClick={() => setPage(el)}>
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;
