import React from 'react';
import { Route, Redirect } from 'react-router';
import { readAuth } from '../../helpers/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
<Route {...rest} render={(props) => (
    readAuth() ? (
        <Component {...props} />
): (
<Redirect to={{
                pathname: 'auth/login',
            state: { from: props.location },
        }} />
)
)
}
/>
);

export default PrivateRoute;
