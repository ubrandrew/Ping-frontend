import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../auth/auth'
import Sidebar from '../components/Sidebar';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (auth.isAuthenticated()) {
                    return (
                        <div>
                            <Sidebar/>
                            <Component {...props} />
                        </div>
                    )
                } else {
                    return <Redirect to="/login"/>
                }
            }
        }/>
    )
}