import React from 'react'
import {
    Grid,
    Typography,
    Paper,
    Chip,
} from '@material-ui/core'
import Client from './client'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    grid:{
        background: '#E1E1E1',
        padding: theme.spacing(2)
    }
}))

export default function GridTitle(props) {
    const { ...rest } = props
    const classes = useStyles()
    const [data, setData] = React.useState(null)
    const fields = ['name', 'lowest', 'nextrec', 'format']
    React.useEffect(() => {
        Client('http://localhost:18080/graphql', 'NumberSequenceRule', 1, fields)
            .then(response => {
                setData(response)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])
    return (
        <Grid container
            direction="row"
            justify="space-around"
            alignItems="flex-start"
            className={classes.grid}
        >
            {data ? fields.map((item, key) => {
                return <Grid item key={key}>
                    <Chip
                        className={classes.root}
                        label={<Typography variant='subtitle1'>{`${item}: ${data[item]}`}</Typography>} />
                </Grid>
            }) : null}
        </Grid>
    )
}