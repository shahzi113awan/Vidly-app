import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./TableHeader";
const Table = (props) => {
  const { columns, onSort, sortColumn, data } = props;

  return (
    <table className="table table-bordered table-dark">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
