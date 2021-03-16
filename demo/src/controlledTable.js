import React from "react";
import { IconButton, Grid } from "@material-ui/core";
import EbsGrid from "../../src";
import DetailTable from "./TableDetail";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { Client } from "./client";
import { FIND_SERVICE_LIST } from "./queries";

const ControlledTable = React.forwardRef((props, ref) => {
  const [data, setData] = React.useState(null);
  const [totalPages, setTotalPages] = React.useState(0);
  const [page, setPage] = React.useState(1);
  React.useEffect(() => {
    Client.query({
      query: FIND_SERVICE_LIST,
      variables: { page: { number: 1, size: 10 } },
    }).then(({ data }) => {
      setData(data.findServiceList.content);
      setTotalPages(data.findServiceList.totalPages);
    });
  }, []);

  const columns = [
    {
      Header: "Grpup 1",
      columns: [
        {
          Header: "Id",
          accessor: "id",
          hidden: true,
        },
        {
          Header: "Name",
          accessor: "name",
          filter: true, //used by Global Filter
        },
      ],
    },
    {
      Header: "Group 2",
      columns: [
        {
          Header: "Code",
          accessor: "code",
          filter: true,
        },
      ],
    },
  ];

  async function fetch(page, pageSize, columnsToFilter, value) {
    console.log({ page, pageSize, columnsToFilter, value })
    const { data, loading, error } = Client.query({
      query: FIND_SERVICE_LIST,
      variables: {
        page: { number: page, size: pageSize },
        sort: { col: "id", mod: "ASC" },
        disjunctionFilters: true,
      },
    });
  }

  return (
    <EbsGrid
      toolbar={true}
      columns={columns}
      fetch={fetch}
      data={data}
      page={page}
      totalPages={totalPages}
      title={"Services"}
      select="single"
    />
  );
});

export default ControlledTable;
