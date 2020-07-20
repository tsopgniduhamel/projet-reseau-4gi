import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoginClient } from './Accueil';

const ClientRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLoginClient?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default ClientRoute;