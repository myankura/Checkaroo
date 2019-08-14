import { withRouter } from "react-router";
import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import UsersManager from "../modules/UsersManager";
import ChecklistsManager from "../modules/ChecklistsManager";
import ItemsManager from "../modules/ItemsManager";
import MessageManager from "../modules/MessageManager";
import Login from "./authentication/Login";
import RegistrationForm from "./authentication/RegistrationForm";
import ItemsList from "./items/ItemsList";
import MessageList from "./messages/MessageList";
import ItemsForm from "./items/ItemsForm";
import MessageForm from "./messages/MessageForm";
import ItemsEditForm from "./items/ItemsEditForm";
import MessageEditForm from "./messages/MessageEditForm";

//List all data on respective pages
class ApplicationViews extends Component {

    isAuthenticated = () => sessionStorage.getItem("userId") !== null

    //set state
    state = {
        users: [],
        items: [],
        checklists: [],
        messages: [],
        userId: []
    }

    //Display data
    componentDidMount() {
        this.userSpecificData()
    }

    //fetch data from users and checklist tables
    userSpecificData = () => {
        const newState = {}

        let currentUserId = sessionStorage.getItem("userId")

        //tried adding currentUserId to usermanager.getAll to see if it would resolve issue.
        UsersManager.getAll(currentUserId)
            .then(users => (newState.users = users))
            .then(() => ChecklistsManager.getAll(currentUserId))
            .then(checklists => (newState.checklist = checklists))
            .then(() => MessageManager.getAll(currentUserId)
            .then(messages => (newState.messages = messages)))
            .then(() => this.setState(newState))
    }

    //Handles login
    onLogin = () => {
        //Return only data for specific user by id
        this.userSpecificData()
    }

    //clears session storage on logout
    onLogout = () => {
        sessionStorage.clear()
    }

    //create new user
    addUser = user => {
        return UsersManager.post(user)
    }

    //Add new item
    addItem = item => {
        return ItemsManager.post(item)
            //Return only data for specific user by id
            .then(() => this.userSpecificData())
    }

    //delete item by id
    deleteItem = id => {
        return ItemsManager.delete(id)
            //Return only data for specific user by id
            .then(() => this.userSpecificData())
    }

    //update item by id
    updateItem = editedItemObject => {
        return ItemsManager.put(editedItemObject)
            //Return only data for specific user by id
            .then(() => this.userSpecificData())
    }

    //patch item.
    patchItem = patchItemObject => {
        return ItemsManager.patch(patchItemObject)
            //Return only data for specific user by id
            .then(() => this.userSpecificData())
    }

    // //post a new message
    // addMessage = message => {
    //     return MessageManager.postMessage(message)
    //     .then(() => this.userSpecificData())
    // }

    //add a new message
    addMessage = (message) => {
        return MessageManager.postMessage(message)
            .then(() => MessageManager.getAll()
            .then(messages => this.setState({ "messages": messages })))
            .then(() => this.userSpecificData())
    }

    //changed deletedMessage = message =>..... to deletedMessage = id => to see if it would work out the bug in code. return MessageManager.deleteMessage(message) was changed to MessageManager.deleteMessage(id)
    //delete a message
    deleteMessage = id => {
        return MessageManager.deleteMessage(id)
            .then(() => MessageManager.getAll()
                .then(messages => this.setState({ "messages": messages })))
            .then(() => this.userSpecificData())
    }

    //update a message
    updateMessage = editedMessage => {
        return MessageManager.updateMessage(editedMessage)
            .then(() => MessageManager.getAll())
            .then(messages => this.setState({ "messages": messages }))
            .then(() => this.userSpecificData())
    }

    //get the datetime
    getDate = date => {
        let monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ]

        let day = date.getDate()
        let monthIndex = date.getMonth()
        let year = date.getFullYear()

        return monthNames[monthIndex] + ' ' + day + ' ' + year
    }

    getDateTime = () => {
        let months = [
            "Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"
        ]

        let days = [
            "Sunday", "Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday"
        ]

        let d = new Date()
        let day = days[d.getDay()]
        let hr = d.getHours()

        let min = d.getMinutes()
        if (min < 10) {
            min = "0" + min
        }

        let ampm = "am"
        if (hr > 12) {
            hr -= 12
            ampm = "pm"
        }

        let date = d.getDate()
        let month = months[d.getMonth()]
        let year = d.getFullYear()

        return day + " " + hr + ":" + min + ampm + " " + month + " " + date + " " + year
    }

    //Create routes for nav bar and pass data to each repective component.
    render() {
        return (
            <React.Fragment>

                <Route exact path="/" render={props => {
                    return <Login {...props}
                        onLogin={this.onLogin}
                        userSpecificData={this.userSpecificData}
                    />
                }} />

                <Route exact path="/login/new" render={props => {
                    return <RegistrationForm {...props}
                        addUser={this.addUser}
                        onLogin={this.onLogin}
                        userSpecificData={this.userSpecificData}
                    />
                }} />

                <Route exact path="/checklist" render={props => {
                    if (this.isAuthenticated()) {
                        return <ItemsList {...props}
                            items={this.state.items}
                            checklists={this.state.checklists}
                            deleteItem={this.deleteItem}
                            patchItem={this.patchItem}
                            userSpecificData={this.userSpecificData}
                        />
                    } else {
                        return <Redirect to="/"
                        />
                    }
                }}
                />

                <Route exact path="/checklist/newitem" render={props => {

                    return <ItemsForm {...props}
                        addItem={this.addItem}
                        checklists={this.state.checklists}
                        userSpecificData={this.userSpecificData}
                    />

                }} />

                <Route exact path="/checklist/:itemId(\d+)/edit" render={props => {
                    return <ItemsEditForm {...props}
                        updateItem={this.updateItem}
                        userSpecificData={this.userSpecificData} />

                }} />

                <Route exact path="/messages"
                    render={props => {
                        if (this.isAuthenticated()) {
                            return <MessageList {...props}
                                messages={this.state.messages.reverse()}
                                userSpecificData={this.userSpecificData}
                                users={this.state.users}
                                addMessage={this.state.addMessage}
                                deleteMessage={this.deleteMessage}
                                getDateTime={this.getDateTime}
                            />
                        } else {
                            return <Redirect to="/"
                            />
                        }
                    }}
                />

                <Route path="messages/new"
                    render={props => {
                        return (
                            <MessageForm {...props}
                                userSpecificData={this.userSpecificData}
                            />
                        )
                    }}
                />

                <Route path="messages/:messageId(\d+)/edit"
                    render={props => {
                        return (
                            <MessageEditForm {...props}
                                updateMessage={this.updateMessage}
                                userSpecificData={this.userSpecificData} getDateTime={this.getDateTime}
                            />
                        )
                    }}
                />

            </React.Fragment>
        )
    }
}
export default withRouter(ApplicationViews)