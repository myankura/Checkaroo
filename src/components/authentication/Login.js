import React, { Component } from "react"
// import UsersManager from "../../modules/UsersManager"
import './login.css'
// import './checkaroo.css'
import UsersManager from "../../modules/UsersManager";

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

    // Handle user login
    handleLogin = (e) => {
        e.preventDefault()

        //Use username and password for users to login.
        UsersManager.getAll()
            .then(userList => {
                let isValidUser = userList.find(validateUser => validateUser.username.toLowerCase() ===
                    this.state.username.toLowerCase() && validateUser.password.toLowerCase() ===
                    this.state.password.toLowerCase())
                if (isValidUser) {
                    sessionStorage.setItem("userId", isValidUser.id)
                    this.props.onLogin()
                    this.props.history.push("/dashboard")
                } else {
                    window.alert("Invalid user!")
                }
            })
            .then(() => this.props.userSpecificData())
    }


    render() {
        return (
            <React.Fragment>
                <h1 className="landing-header">Checkaroo</h1>
                <div className="main-container bungee-font">
                    <form onSubmit={this.handleLogin}
                        className="content">
                        <h1>Sign in</h1>
                        <label htmlFor="username">Username</label>
                        <input onChange={this.handleFieldChange}
                            type="text"
                            id="username"
                            placeholder="Username..."
                            required=""
                            autoFocus=""
                        />
                        <br></br>
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handleFieldChange}
                            type="password"
                            id="password"
                            placeholder="Password..."
                            required=""

                        />
                        <button type="submit"
                            className="btn btn-primary"
                            onClick={() => this.handleLogin}
                        >Submit</button>
                        <button type="submit"
                            className="btn btn-primary"
                            onClick={() => {
                                this.props.history.push("/login/new")
                            }}>Register</button>

                    </form>
                </div>
            </React.Fragment>
        )
    }
}