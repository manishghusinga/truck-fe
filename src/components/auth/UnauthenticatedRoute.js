import React from 'react';
import { Route, Redirect } from "react-router-dom";

const UnauthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        (!sessionStorage.getItem("token")) ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }} />
        )
    )} />
);

export default UnauthenticatedRoute;