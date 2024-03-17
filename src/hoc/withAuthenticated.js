import React from 'react'
import { useSelector } from 'react-redux'

const withAuthenticated = (RenderComponent, NavigateComponent) => ({ to, replace, ...props }) => {
    const auth = useSelector(({ user }) => user)

    return auth.isLoggedIn ? <RenderComponent {...props} /> : <NavigateComponent {...{ to, replace }} />
}

export default withAuthenticated