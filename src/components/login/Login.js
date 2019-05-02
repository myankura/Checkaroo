import React, { Component } from "react"
// import UsersManager from "../../modules/UsersManager"
import './login.css'
export default class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleLogin} className="content">
                    <h1>Please Sign in</h1>
                    <label htmlFor="username">Username:</label>
                    <input onChange={this.handleFieldChange}
                        type="username"
                        id="username"
                        placeholder="Username"
                        required=""
                        autoFocus=""
                        />
                    <br></br>
                    <label htmlFor="password">Password:</label>
                    <input onChange={this.handleFieldChange}
                        type="password"
                        id="password"
                        placeholder="Password"
                        required="" />
                    <button type="submit"
                        onClick={() => this.handleLogin}>Submit</button>
                    <button type="register"
                        onClick={() => {
                            this.props.history.push("/login/new")
                        }}>Register</button>
                </form>
            </React.Fragment>
        )
    }
}