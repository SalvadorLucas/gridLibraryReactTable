import React from 'react'
import {
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Button,
    Paper,
} from '@material-ui/core'
import Client from './client'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        minWidth: 500,
        minHeight: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}))

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1)
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1)
}

export default function TransferList(props) {
    const classes = useStyles()
    const [checked, setChecked] = React.useState([])
    const [left, setLeft] = React.useState([])
    const [right, setRight] = React.useState([])
    const fieldsLeft = ['name', 'Formule']
    const fieldsRight = ['Length', 'Position']
    React.useEffect(() => {
        Client('http://localhost:18080/graphql', 'Segment', 1, fieldsLeft, fieldsRight)
            .then(response => {
                //Set all left items
                let arr = []
                fieldsLeft.map(field => {
                    arr.push(response[field])
                })
                setLeft(arr)
                //Set all right items
                arr = []
                response['numbersequencerulesegments'].map(item=>{
                    fieldsRight.map(field=>{
                        arr.push(item[field])
                    })
                })
                setRight(arr)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])
    const leftChecked = intersection(checked, left)
    const rightChecked = intersection(checked, right)

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    const handleAllRight = () => {
        setRight(right.concat(left))
        setLeft([])
    }

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked))
        setLeft(not(left, leftChecked))
        setChecked(not(checked, leftChecked))
    }

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked))
        setRight(not(right, rightChecked))
        setChecked(not(checked, rightChecked))
    }

    const handleAllLeft = () => {
        setLeft(left.concat(right))
        setRight([])
    }

    const customList = (items) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`

                    return (
                        <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    color='default'
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value}`} />
                        </ListItem>
                    )
                })}
                <ListItem />
            </List>
        </Paper>
    )

    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>{customList(left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        color='default'
                        variant="contained"
                        size="small"
                        className={classes.button}
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
            </Button>
                    <Button
                        color='default'
                        variant="contained"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
            </Button>
                    <Button
                        color='default'
                        variant="contained"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
            </Button>
                    <Button
                        color='default'
                        variant="contained"
                        size="small"
                        className={classes.button}
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
            </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>
        </Grid>
    )
}
