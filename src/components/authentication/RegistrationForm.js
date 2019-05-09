import React, { Component } from "react"
// import UsersManager from "../../modules/UsersManager"
import './login.css'
import ChecklistManager from '../../modules/ChecklistsManager'

export default class RegistrationForm extends Component {
    //initialize state
    state = {
        id: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: ""
    }

    //handle field changes
    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    }

    //create a new user and validate that they are passing a value to firstName, username, and password. None of the fields can be empty string.
    newUser = event => {
        event.preventDefault()
        if (this.state.firstName === "") {
            window.alert("You must enter your first name!")
        } else if (this.state.username === "") {
            window.alert("You must enter a username!")
        } else if (this.state.password === "") {
            window.alert("You must enter a password!")
        } else {
            //object for holding new user information.
            const user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            }
            //Save new user
            this.props.addUser(user)
                .then(thisUser => {
                    sessionStorage.setItem("userId", thisUser.id)
                    //Create a new checklist for the user using their first name and concatenating with default checklist name.
                    let newChecklist = {
                        name: thisUser.firstName + "'s Bonnaroo Checklist",
                        completed: false,
                        userId: parseInt(thisUser.id)
                    }
                    //post checklist to API
                    ChecklistManager.post(newChecklist)
                })
                //Once everything has been validated and the user and checklist have been created redirect the new user to the dashboard.
                .then(() => {
                    this.props.onLogin()
                    this.props.history.push("/dashboard")
                })
        }

    }
    //Render registration form for new users.
    render() {
        return (
            <React.Fragment>
                <form className="form-group">
                    <div className="content bungee-font">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            onChange={this.handleFieldChange}
                            placeholder="First Name..."
                        />
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            onChange={this.handleFieldChange}
                            placeholder="Last Name..."
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            onChange={this.handleFieldChange}
                            placeholder="Email address..."
                        />
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            id="username"
                            onChange={this.handleFieldChange}
                            placeholder="Username..."
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            required
                            className="form-control"
                            id="password"
                            onChange={this.handleFieldChange}
                            placeholder="Password..."
                        />
                        <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={this.newUser}
                        >Submit</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}