import React, { Component } from 'react'
import ItemsManager from '../../modules/ItemsManager'

export default class ItemsEditForm extends Component {
    //Set initial state
    state = {
        itemName: "",
        quantity: "",
        perishable: "",
        packed: "",
        checklistId: ""
    }

    //Handle whether the perishable button has been selected true
    handlePerishableTrue = item => {
        if (item === true) {
            return true
        }
    }

    //Handle whether the perishable button has been selected false
    handlePerishableFalse = item => {
        if (item === false) {
            return true
        }
    }

    //Handle whether packed button has been selected true
    handlePackedTrue = item => {
        if (item === true) {
            return true
        }
    }

    //handle whether the packed button has been selected false
    handlePackedFalse = item => {
        if (item === false) {
            return true
        }
    }

    //Handles field changes of an item
    handleFieldChange = item => {
        const stateToChange = {};
        stateToChange[item.target.id] = item.target.value;
        this.setState(stateToChange)
    }

    //Method for updating an existing item
    updateExistingItem = item => {
        item.preventDefault()
        const editedItem = {
            id: Number(this.props.match.params.itemId),
            itemName: this.state.itemName,
            quantity: this.state.quantity,
            perishable: (this.state.perishable === "true"),
            packed: (this.state.packed === "true")
        }
        //Pushes the user back to the dashboard page
        this.props.updateItem(editedItem)
            .then(() => this.props.history.push("/dashboard"))
    }

    //Sets the state of the object
    componentDidMount() {
        ItemsManager.get(this.props.match.params.itemId)
            .then(item => {
                this.setState({
                    itemName: item.itemName,
                    quantity: item.quantity,
                    perishable: item.perishable,
                    packed: item.packed
                })

            })
    }

    //Render form for editing an item
    render() {
        return (
            <React.Fragment>
                <form className="form-group">
                    <label htmlFor="itemName">Item Name: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="itemName"
                        value={this.state.itemName}
                    />
                    <label htmlFor="quantity">Quantity: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="quantity"
                        value={this.state.quantity}
                    />
                    <label>Perishable Item: </label>
                    <br></br>
                    <label htmlFor="perishable">True: </label>
                    <input
                        type="radio"
                        required
                        name="perishableItem"
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="perishable"
                        value="true"
                        checked={this.handlePerishableTrue(this.state.perishable)}
                    />
                    <label htmlFor="perishable">False: </label>
                    <input
                        type="radio"
                        required
                        name="perishableItem"
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="perishable"
                        value="false"
                        checked={this.handlePerishableFalse(this.state.perishable)}
                    />
                    <label>Item Packed: </label>
                    <br></br>
                    <label htmlFor="packed">True: </label>
                    <input
                        type="radio"
                        required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="packed"
                        value="true"
                        checked={this.handlePackedTrue(this.state.packed)}
                    />
                    <label htmlFor="packed">False: </label>
                    <input
                        type="radio"
                        required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="packed"
                        value="false"
                        checked={this.handlePackedFalse(this.state.packed)}

                    />
                    <button
                        type="submit"
                        onClick={this.updateExistingItem}
                        className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}