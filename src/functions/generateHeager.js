export default function generateHeader(cols){
    let columns = []
    cols.map((item) => {
      if(item.hidden == false || !item.hidden){
        columns.push({
            Header: item.header,
            accessor: item.accessor
        })
      }
    })
    columns.push({
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        fixed: 'right',
        filterable: false,
        width: 100
    })
    return columns
  }