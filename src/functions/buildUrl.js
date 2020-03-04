export default function buildUrl(host, entity, columns, page, pageSize){
    let url = {
      url: host,
      page: page,
      pageSize: pageSize
    }
    // let url = host+entity+'?'
    // columns.map((element)=>{
    //   if(element.url === true){
    //     switch(element.type){
    //       case 'text':
    //         url+=element.accessor+'=&'
    //         break
    //       case 'number':
    //         url+=element.accessor+'=0&'
    //         break
    //     }
    //   }
    // })
    // url+='page='+page+'&page_size='+pageSize
    return url
}