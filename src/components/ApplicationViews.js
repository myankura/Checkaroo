import { withRouter } from "react-router"
import { Route } from "react-router-dom"
import React, { Component } from "react"
// import ChecklistList from "./checklists/ChecklistList"
// import ChecklistForm from "./checklists/ChecklistForm"
import ItemsList from "./items/ItemsList"
//import API managers from modules
import ChecklistsManager from "../modules/ChecklistsManager"
import ItemsManager from "../modules/ItemsManager"
import UsersManager from "../modules/UsersManager"

//import login page
import Login from "./login/Login"
// import RegistrationForm from "./login/RegistrationForm"
import ItemsEditForm from "./items/ItemsEditForm";

//import form for adding new items
import ItemsForm from "./items/ItemsForm"




//List all data on respective pages
class ApplicationViews extends Component {
    state = {
        users: [],
        items: [],
        checklists: []
    }


    componentDidMount() {
        const newState = {}
        ChecklistsManager.getAll()
            .then(checklists => newState.checklists = checklists)
            .then(() => ItemsManager.getAll())
            .then(items => newState.items = items)
            .then(() => UsersManager.getAll())
            .then(users => {
                newState.users = users
                this.setState(newState)
            })
    }
    //delete item by id
    deleteItem = id => ItemsManager.delete(id)
        .then(ItemsManager.getAll)
        .then(items => {
            this.props.history.push("/dashboard")
            this.setState({ items: items })
        })
    //add new item
    addItem = item =>
        ItemsManager.post(item)
            .then(() => ItemsManager.getAll())
            .then(items =>
                this.setState({
                    items: items
                })
            );
    //update item
    updateItem = editedItemObject => {
        return ItemsManager.put(editedItemObject)
            .then(() => ItemsManager.getAll())
            .then(items =>
                this.setState({
                    items: items
                }))
    }
    //create new user
    addUser = user =>
        UsersManager.post(user)

    render() {
        return (
            <React.Fragment>
                <Route
                    exact path="/"
                    render={props => {
                        return <Login />
                    }}
                />
                <Route exact path="/dashboard" render={(props) => {
                    return <ItemsList {...props}
                        deleteItem={this.deleteItem}
                        items={this.state.items} />
                }} />
                <Route path="/dashboard/newitem" render={(props) => {
                    return <ItemsForm {...props}
                        addItem={this.addItem} />
                }} />
                <Route
                    path="/dashboard/:itemId(\d+)/edit" render={props => {
                        return <ItemsEditForm {...props} items={this.state.items} updateItem={this.updateItem} />
                    }}
                />
                {/* <Route
                    exact path="/login/new"
                    render={props => {
                        return <RegistrationForm {...props}
                            addUser={this.addUser} />
                    }} /> */}
            </React.Fragment>
        )
    }

}
export default withRouter(ApplicationViews)