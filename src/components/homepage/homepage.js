import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import axios from 'axios';

export default function Homepage() {
    const otherEndpoint = (event) => {
        event.preventDefault()
        axios.defaults.withCredentials = true

        axios.get(
            `http://localhost:8000/temp`, 
           )
            .then(res => {
                console.log(res)
            })
    }
    return (
        <div>
            <h1>Homepage</h1>
            <button onClick={otherEndpoint} type="button" className="btn">
                    Test endpoint
                </button>
        </div>
    )
}