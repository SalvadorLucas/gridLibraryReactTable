import Axios from 'axios'
import Actions from '../components/Actions/actions'

const requestData = (pageSize, sorted, filtered, url, entity, datafields, id, token, onClick, checkFlag) => {
  return new Promise((resolve, reject) => {

    // You can retrieve your data however you want, in this case, we will just use some local data.
    let filteredData = null
      Axios.get(url, {headers:{
        'Accept': 'Application/json',
        'Authorization': `Bearer ${token}`
      }}).then((response)=>{
        filteredData = response.data['get_'+(entity.replace('-','_'))].data[entity.replace('-','_')].data;
        /**
         * Adding actions custom buttons
         */
        filteredData.map((item) =>{
          item['actions']=Actions(item, url, entity, datafields, id, token)
        })
        /**
         *End of adding buttons
         */
     
        // You can use the filters in your request, but you are responsible for applying them.
          if (filtered.length) {
            filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
              return filteredSoFar.filter(row => {
                return (row[nextFilter.id] + "").startsWith(nextFilter.value);
              });
            }, filteredData);
          }
          // You can also use the sorting in your request, but again, you are responsible for applying it.
          const sortedData = _.orderBy(
            filteredData,
            sorted.map(sort => {
              return row => {
                if (row[sort.id] === null || row[sort.id] === undefined) {
                  return -Infinity;
                }
                return typeof row[sort.id] === "string"
                  ? row[sort.id].toLowerCase()
                  : row[sort.id];
              };
            }),
            sorted.map(d => (d.desc ? "desc" : "asc"))
          );
        // You must return an object containing the rows of the current page, and optionally the total pages number.
          const res = {
            rows: sortedData,
            pages: Math.ceil(response.data['get_'+(entity.replace('-','_'))].data['count'] / pageSize),
            // pages: Math.ceil(filteredData.length / pageSize)
          };
      resolve(res)
          }
        )
  });
}

export default requestData;