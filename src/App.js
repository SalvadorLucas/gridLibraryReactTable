import React from 'react'
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    Grid,
    Typography,
} from '@material-ui/core'
import GridTitle from './GridTitle'
import TransferList from './TransferList'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
    root: {
        minWidth: '100%'
    }
})

export default function SegmentRules(props) {
    const { ...rest } = props
    const classes = useStyles()
    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader
                title={<Typography variant="h6">Segment Rules</Typography>}
            />
            <CardContent>
                <div>
                    <GridTitle />
                    <TransferList />
                </div>
            </CardContent>
            <CardActions >
                <Grid container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                >
                    <Grid item>
                        <Button onClick={() => alert('Save')} color='primary' variant='contained'>Save</Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}