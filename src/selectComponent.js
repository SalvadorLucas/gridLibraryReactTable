import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios'
const useStyles = makeStyles(theme => ({
    textOption: {
        margin: theme.spacing(0),
        minWidth: 250,
      },
  }));

  export default function SelectComponent(props){
    
    const name = props.name
    const label = props.label
    const classes = useStyles();
    const itemSetting = getItemSetting(props.columns)
    const [state, setState]=React.useState({
      value: '',
      name: 'hai',
    });
    const [data, setData] = React.useState(null)
    const inputLabel = React.useRef([]);
      const [ labelWidth, setLabelWidth] = React.useState(0);
      React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
      }, []);
      React.useEffect(() => {
        columns(props.host, props.entity, props.columns, props.token).then(res =>
          setData(res)
          )
      }, [])

    
    function getItemSetting(columns) {
      let setting = {}
      columns.map((item) => {
        switch (item.option){
          case 'value':
            setting['value'] = item.accessor
            break;
          case 'description':
            setting['description'] = item.accessor
            break;
        }
      })
      return setting
    }

    function buildUrl(host, entity, columns, page, pageSize) {
            let base = host+entity+'?'
            columns.map((element)=>{
              if(element.url === true){
                switch(element.type){
                  case 'text':
                    base+=element.accessor+'=&'
                    break
                  case 'number':
                    base+=element.accessor+'=0&'
                    break
                }
              }
            })
            base+='page='+page+'&page_size='+pageSize
            return base
          }

  function columns(host, entity, columns, token) {
    return new Promise((resolve, reject) => {
      Axios.get(buildUrl(host, entity, columns, 0, 100), {headers:{
        'Accept': 'Application/json',
        'Authorization': `Bearer ${token}`
      }}).then((response)=>{
          resolve(response.data['get_'+(entity.replace('-','_'))].data[0][entity.replace('-','_')]) 
      })
    })
  }  

      const handleChange = name => event => {
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

    function createItemOption(item) {
      if(item!=null){
        return (<option key={item[itemSetting.value]} value={item[itemSetting.value]}>{item[itemSetting.description]}</option>)
      }else{
        return null
      }
    }

    if(data!=null){
      return(
        <React.Fragment>
          <FormControl variant="outlined" className={classes.textOption}>
              <InputLabel ref={inputLabel} htmlFor="outlined-value-native-simple">
              {label}
              </InputLabel>
              <Select
              native
              value={state.value}
              onChange={handleChange('value')}
              name = {name}
              id = {name}
              >
              <option value="" />
              {
                data.map(item=>createItemOption(item))
              }
              </Select>
          </FormControl>
        </React.Fragment>
      )
    }else{
      return null
    }
  }