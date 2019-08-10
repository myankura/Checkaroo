import React, { Component } from "react"
// import { Link } from "react-router-dom"
import "./items.css"


//List all items
export default class ItemsList extends Component {

    //Initialize the state of user's items that match the checklistId that belongs to the user.
    state = {
        // userItems: [],
        packed: false
    }

    componentDidMount() {
        // console.log(this.props.checklists)
        // console.log(this.props.items)
    }

    //Conditional statement to determine whether the item is perishable.
    isPerishable = (perisableItem) => {
        if (perisableItem) {
            // console.log("this is perishable")
            return "Perishable"
        }
    }

    //Conditional statement to determine whether the item is packed.
    isPacked = (packedItem) => {
        if (packedItem) {
            // console.log("this is packed")
            return "Packed"
        }
    }

    //Method for patching an existing item as packed
    patchExistingItem = event => {
        // console.log("The packed button has been clicked.")
        event.preventDefault()
        // console.log("packed button", event.target.id)
        let patchedItem = {
            id: Number(event.target.id),
            packed: true
        }
        this.props.patchItem(patchedItem)
    }

    //Render all items that are in the api
    render() {
        // console.log("this.props.checklists", this.props.checklists)
        return (
            <React.Fragment>
                <div className="newItemButton">
                    <button className="btn btn-success bungee-font"
                        onClick={() => {
                            this.props.history.push("/checklist/newitem")
                        }}
                        >Add Item</button>
                </div>
                <section className="content items">
                    {
                        this.props.checklists.map(checklist =>
                            checklist.items.map(item =>
                                <div key={item.id} className="card items">
                                    <div className="bungee-font">
                                        <h5>
                                            {item.itemName}
                                            <br></br>
                                            Quantity: {item.quantity}
                                            <br></br>
                                            {this.isPerishable(item.perishable)}
                                            <br></br>
                                            {this.isPacked(item.packed)}
                                            <div className="btn-items-group">
                                                {
                                                    //ternary for determines whether the button should display depending on it's boolean value in api
                                                    (item.packed === false)
                                                        ?(<button
                                                        id={item.id}
                                                        onClick={this.patchExistingItem}
                                                        className="btn btn-primary bungee-font">Packed</button>)
                                                        :null
                                                }
                                                <button
                                                    onClick={() => { this.props.deleteItem(item.id) }}
                                                    className="btn btn-primary btn-delete bungee-font">Delete</button>
                                                <button
                                                    onClick={() => {
                                                        this.props.history.push(`/checklist/${item.id}/edit`)
                                                    }}
                                                    className="btn btn-primary btn-edit bungee-font">Edit</button>
                                            </div>
                                        </h5>
                                    </div>
                                </div>
                            )
                        )
                    }
                </section>
                {/* <div className="newItemButton">
                    <button className="btn btn-success bungee-font"
                        onClick={() => {
                            this.props.history.push("/checklist/newitem")
                        }}
                        >Add Item</button>
                </div> */}
            </React.Fragment>
        )
    }
}