import React, { Component } from 'react'
import ItemsManager from '../../modules/ItemsManager'
import './items.css'


export default class ItemsEditForm extends Component {
    //Set initial state
    state = {
        itemName: "",
        quantity: "",
        perishable: false,
        packed: false,
        checklistId: ""
    }

    //handles checkbox input and sets state of checkboxes
    handleCheckbox = item => {
        const stateToChange = {};
        // console.log("Checkbox has been clicked!", item.target.value)
        stateToChange[item.target.id] = !this.state[item.target.id];
        this.setState(stateToChange)
    }


    //Handles field changes of a field in the form and sets state
    handleFieldChange = item => {
        const stateToChange = {};
        // console.log("Field has been changed!", item.target.value)
        stateToChange[item.target.id] = item.target.value;
        this.setState(stateToChange)
    }

    //Method for updating an existing item
    updateExistingItem = item => {
        item.preventDefault()
        // console.log("this.state.perishable", this.state.perishable)
        const editedItem = {
            id: Number(this.props.match.params.itemId),
            itemName: this.state.itemName,
            quantity: this.state.quantity,
            perishable: this.state.perishable,
            packed: this.state.packed,
            checklistId: this.state.checklistId
        }
        //Pushes the user back to the checklist page
        this.props.updateItem(editedItem)
            .then(() => this.props.history.push("/checklist"))
    }

    //Sets the state of the object
    componentDidMount() {
        ItemsManager.get(this.props.match.params.itemId)
            .then(item => {
                this.setState({
                    itemName: item.itemName,
                    quantity: item.quantity,
                    perishable: item.perishable,
                    packed: item.packed,
                    checklistId: item.checklistId
                })

            })
    }

    //Render form for editing an item
    render() {
        return (
            <React.Fragment>
                    <form className="form-group">
                    <div className="itemForm content items">
                        <label htmlFor="itemName">Item Name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="itemName"
                            value={this.state.itemName}
                            placeholder="Please enter an item..."
                        />
                        </div>
                        <div className="itemForm content items">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="quantity"
                            value={this.state.quantity}
                            placeholder="Please enter a quantity..."
                        />
                        </div>
                        <div className="itemForm content items">
                        <label>Perishable Item</label>
                        <input
                            id="perishable"
                            type="checkbox"
                            // required
                            value="true"
                            name="perishableItem"
                            onChange={this.handleCheckbox}
                            checked={this.state.perishable}
                        />
                        </div>
                        <div className="itemForm content items">
                        <label>Item Packed</label>
                        <input
                            id="packed"
                            type="checkbox"
                            required
                            value="true"
                            name="packedItem"
                            onChange={this.handleCheckbox}
                            checked={this.state.packed}
                        />
                        </div>
                        <div>
                        <button
                            type="submit"
                            onClick={this.updateExistingItem}
                            className="btn btn-primary btn-submit">Submit</button>
                            </div>
                    </form>
            </React.Fragment>
        )
    }
}