import React, { Component } from 'react';
// import ItemsManager from '../../modules/ItemsManager'
import './items.css'

export default class ItemsForm extends Component {
    //set initial state
    state = {
        itemName: "",
        quantity: "",
        perishable: false,
        packed: false,
        checklistId: []
    };

    //Handle whether perishable is false
    handlePerishableTrue = item => {
        if (item === true) {
            return true
        }
    }
    //Update state whenever an input field is edited
    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    };

    //get the id of the checklist that the user has.
    componentDidMount() {
        let getChecklistId = this.props.checklists.map(checklist => {
            return checklist.id
        })

        this.setState({
            //After the user has been validated get the checklist that is unique to the user and set the state of the checklistId
            checklistId: getChecklistId
        })
    }

    //Create a new item and also run it through form validation to confirm every field has been filled out.
    constructNewItem = event => {
        event.preventDefault();
        if (this.state.itemName === "") {
            //checks that itemName has been passed
            window.alert("Please enter the name of the item");
        } else if (this.state.quantity === "") {
            //verifies that the quantity of the item has been passed through input field.
            window.alert("Please enter the quantity of the item")
        } else {
            //store values that have been passed through the fields into an object.
            const item = {
                itemName: this.state.itemName,
                quantity: this.state.quantity,
                perishable: (this.state.perishable === "true"),
                packed: this.state.packed,
                checklistId: this.state.checklistId[0]
            }
            //create the item and redirect user to the dashboard
            this.props.addItem(item)
                .then(() => this.props.history.push("/dashboard"));
        }
    }
    //render item form when ever add item is clicked.
    render() {
        // console.log("this.props.checklist?", this.props.checklists)
        return (
            <React.Fragment>
                <h1 className="bungee-font header">Add a new item</h1>
                <form className="form-group bungee-font">
                    <div className="itemForm content items">
                        <label htmlFor="itemName">Item</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="itemName"
                            placeholder="Name of item..."
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
                            placeholder="Quantity of item..."
                        />
                    </div>
                    <div className="itemForm content items">
                        <label htmlFor="perishable">Perishable:</label>
                        <input
                            id="perishable"
                            type="checkbox"
                            value="true"
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            onClick={this.constructNewItem}
                            className="btn btn-success btn-submit"
                        >
                            Submit</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
};
