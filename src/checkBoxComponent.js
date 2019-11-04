import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import styles from "./assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";

const useStyles = makeStyles(styles);

export default function CheckboxExample(props) {

  

  const handleToggle = value => {
    props.handleToggle(value)
  };

  const classes = useStyles();

    return (
      <Checkbox
        tabIndex={-1}
        onClick={() => handleToggle(props.id)}
        // checked={}
        checkedIcon={<Check className={classes.checkedIcon} />}
        icon={<Check className={classes.uncheckedIcon} />}
        classes={{
          checked: classes.checked,
          root: classes.checkRoot
        }}
      />
    );
}