import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { IconContext } from 'react-icons'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { Link as LinkRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import { WiDayThunderstorm } from 'react-icons/wi'

const Frame = ({ children }) => {

    const iconContextSize = useMemo(() => ({size:'2em'}), [])
    return (
        <Grid container
            justify="center">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton color="inherit" aria-label="menu">
                        <Link 
                            component={LinkRouter}
                            to="/" 
                            color="inherit" 
                            aria-label="menu">
                            <IconContext.Provider value={iconContextSize}>
                                <WiDayThunderstorm />
                            </IconContext.Provider>
                        </Link>
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Clima Guru
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid item
                xs={12}
                sm={11}
                md={10}
                lg={8}>
                {children}
            </Grid>
        </Grid>
    )
}

Frame.propTypes = {
    children: PropTypes.node
}

export default Frame
