import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import axios from 'axios';

import LinkBankItem from '../components/LinkBankItem'
import {Sidebar} from '../components/Sidebar'

import './Homepage.css';

export default function Homepage() {
    const otherEndpoint = (event) => {
        event.preventDefault()
        axios.defaults.withCredentials = true

        axios.get(
            `http://localhost:8000/bank_items`, 
           )
            .then(res => {
                console.log(res)
            })
    }
    return (
        <div className="wrapper">
            <div className="main-content">
                ASDASFGFDHHJ
            </div>
        </div>
    )
}
