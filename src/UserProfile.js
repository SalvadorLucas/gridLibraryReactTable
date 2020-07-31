import React from 'react'
import PropTypes from 'prop-types'
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Button,
    Typography,
    Chip,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
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

export default function UserProfile(props) {
    const classes = useStyles()
    const { userName, description, userMail, ...rest } = props

    return (
        <Card style={{height:'100%'}} className={classes.root}>
            <div style={{ display: 'flex', justifyContent: 'center' }} className={classes.avatar}>
                <Avatar sizes='xl' className={classes.large} />
            </div>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {userName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
                <Chip variant="outlined"
                    icon={<MailOutlineIcon />}
                    label={userMail}
                    clickable={true}
                    onClick={() => alert('Clicked!')}
                />
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Some action
                </Button>
                <Button size="small" color="primary">
                    Another Action
                </Button>
            </CardActions>
        </Card>
    )
}
UserProfile.propTypes = {
    userName: PropTypes.string,
    userMail: PropTypes.string,
    description: PropTypes.string,
}
UserProfile.defaultProps = {
    userName: 'User Name',
    userMail: 'user@example.com',
    description: 'User Description',
}