import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios'
const useStyles = makeStyles(theme => ({
  textOption: {
    margin: theme.spacing(1),
    minWidth: 210,
    maxWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectComponent(props) {
  const name = props.fk
  const label = props.label
  const classes = useStyles();
  const itemSetting = getItemSetting(props.options, props.fk);
  const [state, setState] = React.useState({
    value: '',
    name: 'hai',
  });
  const [data, setData] = React.useState(null)
  const inputLabel = React.useRef([]);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  React.useEffect(() => {
    columns(props.header, props.host, props.fk, props.options).then(res =>
      setData(res)
    )
  }, [])

  function getItemSetting(columns, fk) {
    let setting = {
    };
    setting[fk] = columns;
    return setting;
  }

  function columns(header, host, fk, columns) {
    return new Promise((resolve, reject) => {
      Axios({
        url: host,
        method: 'POST',
        data: {
          query: `
          query {
            ${fk}: findProperty(class:${header}) {
              elements {
                ${columns.value}
                ${columns.description}
               }
          }}`
        }
      }).then(res => {
        let { data } = res
        resolve(data.data[fk].elements);
      }).catch(err => {
        reject(err.message);
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
    return (<option key={item[itemSetting[props.fk].value]} value={item[itemSetting[props.fk].value]}>{item[itemSetting[props.fk].description]}</option>)
  }

  if (data != null) {
    return (
      <React.Fragment>
        <FormControl variant="outlined" className={classes.textOption}>
          <InputLabel>{label}</InputLabel>
          <Select
            value={state.value}
            onChange={handleChange('value')}
            displayEmpty
            name={name}
            id={name}
          >
            <option value="" />
            {
              data.map(item => createItemOption(item))
            }
          </Select>
        </FormControl>
      </React.Fragment>
    )
  } else {
    return null
  }
}