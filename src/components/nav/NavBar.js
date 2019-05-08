import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './NavBar.css'

export default class NavBar extends Component {


    render() {
        return (
            <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            onClick={(() => sessionStorage.clear())} className="nav-link" to="/">
                            Logout
                        </Link>
                    </li>
                </ul>

            </nav>
        )
    }
}