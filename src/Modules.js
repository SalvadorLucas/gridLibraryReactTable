import React from 'react'
import {
    Grid,
    Button
} from '@material-ui/core'
import SecurityIcon from '@material-ui/icons/Security'

import UserProfile from './UserProfile'
import CardModule from './CardModule'

export default function Modules() {

    return (
        <Grid container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={2}
        >
            <Grid item sm={4} md={4} lg={3}>
                <UserProfile
                    userName={'Salvador Ortega'}
                    description={'Management user'}
                />
            </Grid>
            <Grid item sm={8} md={8} lg={9}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Grid item>
                        <CardModule
                            moduleName={'Security info'}
                            description={'Info security user management'}
                            icon={<SecurityIcon style={{ fontSize: 80 }} />}
                        >
                            <Button onClick={() => { alert('Details security') }} color='primary'>Details</Button>
                        </CardModule>
                    </Grid>
                    <Grid item>
                        <CardModule
                            moduleName={'Security info'}
                            description={'Info security user management'}
                            icon={<SecurityIcon style={{ fontSize: 80 }} />}
                        >
                            <Button onClick={() => { alert('Details security') }} color='primary'>Details</Button>
                        </CardModule>
                    </Grid>
                    <Grid item>
                        <CardModule
                            moduleName={'Security info'}
                            description={'Info security user management'}
                            icon={<SecurityIcon style={{ fontSize: 80 }} />}
                        >
                            <Button onClick={() => { alert('Details security') }} color='primary'>Details</Button>
                        </CardModule>
                    </Grid>
                    <Grid item>
                        <CardModule
                            moduleName={'Security info'}
                            description={'Info security user management'}
                            icon={<SecurityIcon style={{ fontSize: 80 }} />}
                        >
                            <Button onClick={() => { alert('Details security') }} color='primary'>Details</Button>
                        </CardModule>
                    </Grid>
                    <Grid item>
                        <CardModule
                            moduleName={'Security info'}
                            description={'Info security user management'}
                            icon={<SecurityIcon style={{ fontSize: 80 }} />}
                        >
                            <Button onClick={() => { alert('Details security') }} color='primary'>Details</Button>
                        </CardModule>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}