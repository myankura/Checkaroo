import React, { Component } from "react"
// import { Link } from "react-router-dom"
import "./items.css"


//List all items
export default class ItemsList extends Component {

    //Initialize the state of user's items that match the checklistId that belongs to the user.
    state = {
        userItems: []
    }

    componentDidMount() {
        console.log(this.props.checklists)
        console.log(this.props.items)
    }

    //Conditional statement to determine whether the item is perishable.
    isPerishable = (perisableItem) => {
        if (perisableItem) {
            console.log("this is perishable")
            return "Perishable"
        }
    }

    //Conditional statement to determine whether the item is packed.
    isPacked = (packedItem) => {
        if(packedItem) {
            console.log("this is packed")
            return "Packed"
        }
    }
    //Render all items that are in the api
    render() {
        console.log("this.props.checklists", this.props.checklists)
        return (
            <React.Fragment>
                <div className="newItemButton">
                    <button className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/dashboard/newitem")
                        }}
                    >Add Item</button>
                </div>
                <section className="content items">
                    {
                        this.props.checklists.map(checklist =>
                            checklist.items.map(item =>
                                <div key={item.id} className="card items">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {item.itemName}
                                            <p>Quantity: {item.quantity}</p>
                                            <p>{this.isPerishable(item.perishable)}</p>
                                            <p>{this.isPacked(item.packed)}</p>
                                            <button
                                                onClick={() => { this.props.deleteItem(item.id) }}
                                                className="card-link">Delete</button>
                                            <button
                                                onClick={() => {
                                                    this.props.history.push(`/dashboard/${item.id}/edit`)
                                                }}>Edit</button>
                                        </h5>
                                    </div>
                                </div>
                            )
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}