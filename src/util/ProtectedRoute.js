import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { AuthContext } from "../auth/auth";

const ProtectedRoute = ({component: Component, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    return (
        <Route 
            {...rest} 
            render={
                (props) => {
                    if (!!currentUser) {
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
            }
        />
    )
}

export default ProtectedRoute;
