import Axios from 'axios'
import Actions from '../components/Actions/actions'

const requestData = (owner, sorted, filtered, url, entity, columns, id, token) => {
  return new Promise((resolve, reject) => {
    
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let filteredData = null
    
    Axios({
      url: url.url,
      method: 'POST',
      data: {
        query: `
        query {
          ${entity}(page:{number:${url.page} size: ${url.pageSize}}){
            totalPages
            totalElements
            content {
              ${columns.map(element=>{
                return element.accessor
              })}             
            }
          }
        }`
      }
    }).then((result) => {
      filteredData = result.data.data[entity].content;
      /**
       * Adding actions custom buttons
       */
      filteredData.map((item) => {
        item['actions'] = Actions(item, url, entity, columns, id, token)
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
        pages: result.data.data[entity].totalPages,
        // pages: Math.ceil(filteredData.length / pageSize)
      };
      resolve(res)
    });
  });
}

export default requestData;