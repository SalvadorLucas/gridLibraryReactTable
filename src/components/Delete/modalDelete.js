import React from 'react';
//IMPORTS MATERIAL UI
import DeleteIcon from '@material-ui/icons/Delete';
// import Button from '@material-ui/core/Button';
import Button from "../CustomButtons/Button.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Close from "@material-ui/icons/Close";
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from "../Grid/GridContainer.js";
//IMPORTS COMPONENTS DATE & SELECT
import styles from "../../assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
import mutationData from '../../client/mutationGraph'

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false)//STATE FOR OPEN OR CLOSE MODAL
  const classes = useStyles();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function Delete() {
    let mutation = `
    mutation{
      delete${props.entity}(id${props.entity.toLowerCase()}:${props.rowData[props.id]})
    }
    `
    mutationData(props.host, mutation).then(response=>{
      alert(`${props.entity} with id: ${response.data[`delete${props.entity}`]  } has been deleted`);
    handleClose()
    props.refreshGrid()
    }).catch(error=>{
      console.log(error);
    })
  }

  return (
    <div>
      <Button
        justIcon
        simple
        color={'success'}
        onClick={handleClickOpen}
      >
        <DeleteIcon />
      </Button>
      <Dialog
        fullWidth={false}
        maxWidth={'xs'}
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={open}
        transition={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
        <Button
            justIcon
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="transparent"
            onClick={() => setOpen(false)}
          >
            <Close className={classes.modalClose} />
          </Button>
          DELETE {props.title.replace('-', '_').toUpperCase()}</DialogTitle>
        <form className={'commentForm'} id='putForm'>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
            <GridContainer
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <h5>Are you sure you want to delete this item?</h5>
            </GridContainer>
          </DialogContent>
          <DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button type={'button'} color="success" onClick={Delete}>
              Confirm
          </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div >
  );
}