import React from "react";
import { IconButton, Grid, MenuItem } from "@material-ui/core";
import MasterDetail from "../../src";
import DetailTable from "./TableDetail";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = [];
    preFilteredRows.forEach((row) => {
      options.push(row.values[id]);
    });
    return [...options];
  }, [id, preFilteredRows]);
  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <React.Fragment>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </React.Fragment>
  );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <input
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        placeholder={`Min (${min})`}
        style={{
          width: "70px",
          marginRight: "0.5rem",
        }}
      />
      to
      <input
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        placeholder={`Max (${max})`}
        style={{
          width: "70px",
          marginLeft: "0.5rem",
        }}
      />
    </div>
  );
}

const MasterTable = React.forwardRef((props, ref) => {
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
          Filter: SelectColumnFilter,
          filter: "includes",
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
  // Request Manager columns
  const rColumns = [
    // { Header: 'RM_Crop', accessor: 'RM_Crop' },
    // { Header: 'RM_Purpose', accessor: 'RM_Purpose' },
    // { Header: 'RM_Service', accessor: 'RM_Service' },
    // { Header: 'RM_ServiceProvider', accessor: 'RM_ServiceProvider' },
    // { Header: 'RM_ServiceType', accessor: 'RM_ServiceType' },
    { Header: "User Name", accessor: "userName" },
    { Header: "charge_account", accessor: "charge_account" },
    { Header: "creation_timestamp", accessor: "creation_timestamp" },
    // { Header: 'creator_id', accessor: 'creator_id' },
    // { Header: 'description', accessor: 'description' },
    // { Header: 'id', accessor: 'id', hidden: true },
    // { Header: 'initiated', accessor: 'initiated' },
    // { Header: 'is_void', accessor: 'is_void' },
    // { Header: 'modification_timestamp', accessor: 'modification_timestamp' },
    // { Header: 'modifier_id', accessor: 'modifier_id' },
    // { Header: 'phase', accessor: 'phase' },
    // { Header: 'requester', accessor: 'requester' },
    // { Header: 'stage', accessor: 'stage' },
    // { Header: 'stagestatus', accessor: 'stagestatus' },
    // { Header: 'step', accessor: 'step' },
    // { Header: 'submition_date', accessor: 'submition_date' },
    // { Header: 'tenant_id', accessor: 'tenant_id' },
    // { Header: 'workflow', accessor: 'workflow' },
    // { Header: 'workflowinstance_id', accessor: 'workflowinstance_id' },
  ];
  const AddButton = (selection, refresh) => {
    return (
      <IconButton
        title={"Button"}
        onClick={() => {
          alert(selection);
          refresh();
        }}
        color={"inherit"}
      >
        <AddIcon />
      </IconButton>
    );
  };
  const Actions = (row, refresh) => {
    const handleClick = () => {
      alert(row.id);
      refresh();
    };
    return (
      <Grid container>
        <Grid item>
          <IconButton size="small" onClick={refresh} color="primary">
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton size="small" onClick={handleClick} color="primary">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  };
  const TableDetail = (row) => {
    return <DetailTable />;
  };

  const toolbarMobileActions = (selection, refresh) => {
    return (
      <MenuItem onClick={() => alert(selection)}>
        <IconButton color={"inherit"}>
          <AddIcon />
        </IconButton>
        <p>Add</p>
      </MenuItem>
    );
  };

  return (
    <React.Fragment>
      <MasterDetail
        toolbar={true}
        toolbaractions={AddButton}
        columns={columns}
        // uri={'http://localhost:8000/api/tenant/1/workflow/3/node/4'}
        uri="http://localhost:18080/graphql"
        entity="Service"
        actions={Actions}
        title="Request"
        callstandard="graphql" //brapi
        defaultfilter={[{ mod: "LK", col: "name", val: "Seed" }]}
        // detailcomponent={TableDetail}
        select="multi"
        toolbarMobileActions={toolbarMobileActions}
      />
    </React.Fragment>
  );
});

export default MasterTable;
