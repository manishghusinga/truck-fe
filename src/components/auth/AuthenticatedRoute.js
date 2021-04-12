import React from 'react';
import { Route, Redirect } from "react-router-dom";

const RedirectRoute = (Component, props) => {
    if (sessionStorage.getItem("token")) {
        return (
            <Component {...props} />
        )
    }

    else {

        return (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        );

    }
};

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        RedirectRoute(Component, props)
    )} />
);

export default AuthenticatedRoute;