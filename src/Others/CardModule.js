import React from 'react'
import PropTypes from 'prop-types'
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Avatar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
    },
    avatar: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(17),
        height: theme.spacing(17),
    }
}))

export default function CardModule(props) {
    const classes = useStyles()
    const { moduleName, description, children, icon, ...rest } = props

    return (
        <Card className={classes.root}>
            <CardHeader
                title={<div style={{ display: 'flex', justifyContent: 'center' }}>{moduleName}</div>}
            />
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'center' }} className={classes.avatar}>
                    <Avatar sizes='xl' className={classes.large} >
                        {icon}
                    </Avatar>
                </div>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                {children}
            </CardActions>
        </Card>
    )
}
CardModule.propTypes = {
    moduleName: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node
}
CardModule.defaultProps = {
    moduleName: 'Module Name',
    description: 'Module Description',
    children: <p></p>
}