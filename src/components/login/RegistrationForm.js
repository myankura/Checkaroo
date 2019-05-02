import React, { Component } from "react"
import UsersManager from "../../modules/UsersManager"

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
    }
    render () {
        return (
            <React.Fragment>
                <form className="card">
                <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placehold="First Name..."
                />
                <label htmlFor="lastName">Last Name:</label>
                <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placehold="Last Name..."
                />
                <label htmlFor="email">Email:</label>
                <input
                        type="text"
                        className="form-control"
                        id="email"
                        placehold="Email address..."
                />
                <label htmlFor="username">Username:</label>
                <input
                        type="text"
                        required
                        className="form-control"
                        id="username"
                        placehold="Username..."
                />
                <label htmlFor="password">Password:</label>
                <input
                        type="text"
                        required
                        className="form-control"
                        id="password"
                        placehold="Password..."
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