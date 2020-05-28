export function BuildBody(id, type, prefix){
    //BUIL BODY REQUEST
    return transform(document.getElementById(prefix+id).value, type)
  }

function transform(value, type){
    switch(type){
      case 'text':
        return value;
      case 'number':
        return Number(value);
      case 'array':
        return value;
      default:
        break;
    }
  }