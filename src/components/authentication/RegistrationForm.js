import React, { Component } from "react"
// import UsersManager from "../../modules/UsersManager"
import './login.css'
import ChecklistManager from '../../modules/ChecklistsManager'

export default class RegistrationForm extends Component {
    state = {
        id: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    }

    newUser = event => {
        event.preventDefault()
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        this.props.addUser(user)
        .then(thisUser => {
            sessionStorage.setItem("userId", thisUser.id)
            let newChecklist = {
                    name: thisUser.firstName + "'s Bonnaroo Checklist",
                    completed: false,
                    userId: parseInt(thisUser.id)
                }
                ChecklistManager.post(newChecklist)
            })
            .then(() => {
                    this.props.onLogin()
                    this.props.history.push("/dashboard")
            })

    }
    render() {
        return (
            <React.Fragment>
                <form className="card content">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            onChange={this.handleFieldChange}
                            placeholder="First Name..."
                        />
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            onChange={this.handleFieldChange}
                            placeholder="Last Name..."
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            onChange={this.handleFieldChange}
                            placeholder="Email address..."
                        />
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            id="username"
                            onChange={this.handleFieldChange}
                            placeholder="Username..."
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            required
                            className="form-control"
                            id="password"
                            onChange={this.handleFieldChange}
                            placeholder="Password..."
                        />
                        <button
                            type="submit"
                            onClick={this.newUser}
                        >Submit</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}