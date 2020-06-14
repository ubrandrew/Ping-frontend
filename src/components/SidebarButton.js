import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarButton.css';

export const SidebarButton = (props) => {
    console.log(props)
    return (
        <div>
            <NavLink 
                className="sidebar-link"
                to={props.destination}
                activeStyle={{
                    fontWeight: "600",
                    color: "#6666FF"
                }}
            >
                {props.name}
            </NavLink>
        </div>
    )
}

