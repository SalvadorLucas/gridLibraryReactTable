/*eslint-disable*/
import React from "react";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Button from "../CustomButtons/Button.js";
import ValidateIcon from "@material-ui/icons/CheckCircleOutline";

import styles from "../../assets/jss/material-dashboard-pro-react/views/sweetAlertStyle";

const useStyles = makeStyles(styles);

export default function ValidateRequest({message}) {
  const classes = useStyles();
  const [alert, setAlert] = React.useState(successValidate);

  const hideAlert = () => {
    setAlert(null);
  };

  const validateRequest = () => {
    validation(row.original)
    successValidate()
  };

    const warningMessage = () => {
    setAlert(
      <SweetAlert
        warning
        // style={{ display: "block", marginTop: "-100px" }}
        title={message}
        onConfirm={validateRequest}
        onCancel={() => cancelValidate()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        confirmBtnText="Yes, validate it!"
        cancelBtnText="Cancel"
        showCancel
      >
        You want validate this request
      </SweetAlert>
    );
  };

  const successValidate = () => {
    //do other stuff
    setAlert(
      <SweetAlert
        success
        // style={{ display: "block", marginTop: "-100px" }}
        title="It's validate"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
      >
        This request has been validate it!
      </SweetAlert>
    );
  };

/***
 * 
 * 
 * "eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiV2lhR1g5cEctSWhtakRnNEoyYUhEQSIsImF1ZCI6WyJZc0dLMzhoSzZxS3Q4dUY5NWVCUERpQXJCZUlhIiwiaHR0cDpcL1wvb3JnLndzbzIuYXBpbWd0XC9nYXRld2F5Il0sInN1YiI6ImFkbWluIiwiYXpwIjoiWXNHSzM4aEs2cUt0OHVGOTVlQlBEaUFyQmVJYSIsImFtciI6W10sImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTU3ODUxNjg1MiwiaWF0IjoxNTc4NTEzMjUyLCJub25jZSI6IjEzZTIzMTI2MzdkZzEzNmUxIiwic2lkIjoiZDk3YWY3NmEtY2FiMS00MjRhLWI1ZTktOTRjMmYzMGM1NTRiIn0.Hal_e4w_wQa1ziCMAHBy7nKJzBvyD3UpoGcxZjAT_q_L_jcd8IFNDhIqhlpwW7-NKqYXRjIUA7P-dIoXFIe4SRCUmheJfrxbQsDO7lTJc9g4LPVy-7papB3oJ13aup6hP3w2OtII9rJmxfEjjQ_eB9_gLSvFr5McupDJUkksxOSZTQe5eiYhooGdcZqwHkHmBzJRS85JsImSgmM_NOZ63AJH8oc8tilNw56h1x3otm1YoYW7ldz9EaX0t6Tlv3xx1-DXjdvC-9D5gpSPJU7OHwPefPxrfXlpe4nnkIgZdbiglDa_ZOqG_Ril-yZ1a683VVv0_qQG0BlOA-ifOmQAlw"
 */











  const cancelValidate = () => {
    //do other stuff
    setAlert(
      <SweetAlert
        danger
        // style={{ display: "block", marginTop: "-100px" }}
        title="Cancelled"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
      >
        Your request was not validate!
      </SweetAlert>
    );
  };

  return (
    <div>
      {alert}
      {/* use this button to add a edit kind of action
        <Button
        justIcon
        round
        simple
        onClick={warningMessage}
        color="success"
        >
            <ValidateIcon />
        </Button> */}
    </div>
  );
}