import React, { Component } from "react"
// import UsersManager from "../../modules/UsersManager"
import './login.css'
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
        // .then(() => this.props.userSpecificData())
    }
    render() {
        return (
            <React.Fragment>
                <div className="main-container">
                <article className="child-container">
                    <form onSubmit={this.handleLogin}className="content">
                        <h1>Please Sign in</h1>
                        <label htmlFor="username">Username</label>
                        <input onChange={this.handleFieldChange}
                            type="username"
                            id="username"
                            placeholder="Username..."
                            required=""
                        // autoFocus=""
                        />
                        <br></br>
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handleFieldChange}
                            type="password"
                            id="password"
                            placeholder="Password..."
                            required=""
                            autoFocus=""
                        />
                        <button type="submit"
                            onClick={() => this.handleLogin}>Submit</button>
                        <button type="register"
                            onClick={() => {
                                this.props.history.push("/login/new")
                            }}>Register</button>
                    </form>
                </article>
                </div>
            </React.Fragment>
        )
    }
}