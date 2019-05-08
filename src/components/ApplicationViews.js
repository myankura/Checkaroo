import { withRouter } from "react-router"
import { Route , Redirect } from "react-router-dom"
import React, { Component } from "react"
// import ChecklistList from "./checklists/ChecklistList"
// import ChecklistForm from "./checklists/ChecklistForm"
import ItemsList from "./items/ItemsList"

//import API managers from modules
import ChecklistsManager from "../modules/ChecklistsManager"
import ItemsManager from "../modules/ItemsManager"
import UsersManager from "../modules/UsersManager"

//import login page
import Login from "./authentication/Login"
import RegistrationForm from "./authentication/RegistrationForm"
import ItemsEditForm from "./items/ItemsEditForm";

//import form for adding new items
import ItemsForm from "./items/ItemsForm"

//List all data on respective pages
class ApplicationViews extends Component {

    isAuthenticated = () => sessionStorage.getItem("userId") !== null


    state = {
        users: [],
        items: [],
        checklists: [],
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
        console.log(currentUserId)
        UsersManager.getAll().then(users => (newState.users = users))
            .then(() => ChecklistsManager.getAll(currentUserId))
            .then(checklists => (newState.checklists = checklists))
            .then(() => this.setState(newState))
    }


    //Handles login
    onLogin = () => {
        //Return only data for specific user by id
        this.userSpecificData()
    }

    onLogout = () => {
        sessionStorage.clear()
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

    //create new user
    addUser = user => {
        return UsersManager.post(user)
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

                <Route exact path="/dashboard" render={props => {
                    if (this.isAuthenticated()) {
                    return <ItemsList {...props}
                        items={this.state.items}
                        checklists={this.state.checklists}
                        deleteItem={this.deleteItem}
                        userSpecificData={this.userSpecificData}
                        />
                    } else {
                        return <Redirect to ="/"
                        />
                    }
                }}
                />



                <Route exact path="/dashboard/newitem" render={props => {

                    return <ItemsForm {...props}
                        addItem={this.addItem}
                        checklists={this.state.checklists}
                        userSpecificData={this.userSpecificData}
                    />

                }} />

                <Route exact path="/dashboard/:itemId(\d+)/edit" render={props => {
                    return <ItemsEditForm {...props}
                        updateItem={this.updateItem}
                        userSpecificData={this.userSpecificData} />

                }} />

            </React.Fragment>
        )
    }
}
export default withRouter(ApplicationViews)