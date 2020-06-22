export default function generateHeader(cols){
    let columns = []
    columns.push({
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        fixed: 'left',
        filterable: false,
        width: 100
    })
    cols.map((item) => {
      if(item.hidden == false || !item.hidden){
        columns.push({
            Header: item.header,
            accessor: item.accessor
        })
      }
    })
    return columns
  }