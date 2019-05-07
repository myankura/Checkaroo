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
        checklistId: ""
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
            checklistId: getChecklistId
        })
    }

    /*Local method for validation, creating item object,
    and invoking the function reference passed from parent component*/
    constructNewItem = event => {
        event.preventDefault();
        if (this.state.itemName === "") {
            window.alert("Please enter the name of the item");
        } else if (this.state.quantity === "") {
            window.alert("Please enter the quantity of the item")
        } else {
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
        console.log("this.props.checklist?", this.props.checklists)
        return (
            <React.Fragment>
                <form className="itemForm content items">
                    <div className="form-group">
                        <label htmlFor="itemName">Item:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="itemName"
                            placeholder="Name of item..."
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="quantity"
                            placeholder="Quantity of item..."
                        />
                    </div>
                    <div>
                        <label htmlFor="perishable">Perishable:</label>
                        <input
                            id="perishable"
                            type="checkbox"
                            value="true"
                            onChange={this.handleFieldChange}
                        />
                        <button
                            type="submit"
                            onClick={this.constructNewItem}
                            className="btn btn-primary"
                        >
                            Submit</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
};
