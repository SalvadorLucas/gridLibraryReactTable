export default function generateHeader(columns){
    let header = []
    header.push({
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        fixed: 'left',
        filterable: false,
        width: 100
    })
    columns.map((item) => {
      if(item.hidden == false || !item.hidden){
        header.push({
            Header: item.header,
            accessor: item.accessor
        })
      }
    })
    return header
  }