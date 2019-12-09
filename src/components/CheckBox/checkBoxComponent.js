import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import styles from "../../assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";

const useStyles = makeStyles(styles);

export default function CheckboxComponent(props) {
  const [checked, setChecked] = React.useState({arrChecked:[0]});

  const handleToggle = value => {
    const newChecked = props.handleToggle(value);
    setChecked({
      arrChecked: newChecked
    });
  };

  const classes = useStyles();

    return (
      <Checkbox
        tabIndex={-1}
        onClick={() => handleToggle(props.id)}
        checked={checked.arrChecked.indexOf(props.id) !== -1 ? true : false}
        checkedIcon={<Check className={classes.checkedIcon} />}
        icon={<Check className={classes.uncheckedIcon} />}
        classes={{
          checked: classes.checked,
          root: classes.checkRoot
        }}
      />
    );
}