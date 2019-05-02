import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./items.css"

//List all items
export default class ItemsList extends Component {

    //Conditional statement to determine whether the item is perishable.
    isPerishable = (perisableItem) => {
        if (perisableItem) {
            console.log("this is perishable")
            return "Perishable"
        }
    }
    //Render all items that are in the api
    render() {
        return (
            <section className="content items">
                {
                    //display all items
                    this.props.items.map(item =>
                        <div key={item.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {item.itemName}
                                    <p>Quantity: {item.quantity}</p>
                                    <p>{this.isPerishable(item.perishable)}</p>
                                    <button
                                        onClick={() => this.props.deleteItem(item.id)}
                                        className="card-link">Delete</button>
                                    <button
                                        onClick={() => {
                                            this.props.history.push(`/dashboard/${item.id}/edit`)
                                        }}>Edit</button>
                                </h5>
                            </div>
                        </div>
                    )
                }
            </section>
        )
    }
}