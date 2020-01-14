export default function buildBody(columns, entity, type){
    //BUIL BODY REQUEST
    let body = new Object() 
    //OBJECT TO SAVE ALL DATA
    let keyData = new Object() 
    //OBJECT TO SAVE KEY DATA & VALUE
    columns.map((element)=>{ 
        //CHECK LABELS OBJECT //PARCHE (PROPS.DATA => LABELS)
      if(element.form == true){
      let type = element.type 
      //GET TYPE FOR EVERY COMPONENT
      switch(type){
        case 'number': 
        //GET COMPONENT VALUE IN EVERY ID AND TRANSFORM DATATYPE
          keyData[element.accessor] = Number(document.getElementById(element.accessor).value)
          break
        case 'text': 
        //GET COMPONENT VALUE IN EVERY ID AND TRANSFORM DATATYPE
          keyData[element.accessor] = String(document.getElementById(element.accessor).value)
          break
        case 'date':
        //GET COMPONENT VALUE IN EVERY ID AND BUILD FORMAT DATE
          let value = document.getElementById(element.accessor).value
          const [anio, mes, dia] = value.split('/')
          const date  = [anio, '-', mes, '-', dia].join('');
          //BUILD ALL DATA FOR REQUEST
          keyData[element.accessor] = String(date)
          break
      }
      }
    })
    //BUILD FINAL BODY
    // data.data.push(keyData)
    body[type+entity.replace('-','_')]=keyData
    // console.log(JSON.stringify(body))
    //RETURN BODY
    return body
  }