import React from 'react'
import PropTypes from 'prop-types'
import useVanta from '../../../hooks/useVanta'

const WelcomePageComponent = ({ children }) => {
    const myRefDiv = useVanta()

    return (
        <div className="full" ref={myRefDiv}>
            {children}
        </div>
    )
}

WelcomePageComponent.propTypes = {
    children: PropTypes.node,
}

export default WelcomePageComponent