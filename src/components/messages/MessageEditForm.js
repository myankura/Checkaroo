import React, { Component } from "react"
import MessageManager from "../../modules/MessageManager"

export default class MessageEditForm extends Component {
    //set initial state
    state = {
        message: "",
        userId: Number(sessionStorage.getItem("userId"))
    }

    //pulls value from event target (text area) whenever the target is updated, to set state to the value of that event's target.
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    //passes updated message from state to applicationViews function that puts the edited message to API.
    handleMessageUpdate = event => {
        event.preventDefault()

        const updatedMessage = {
            id: Number(this.props.match.params.messageId),
            message: this.state.message,
            userId: parseInt(sessionStorage.getItem("userId")),
            messageTimeStamp: this.props.getDateTime(new Date())
        }
        this.props.updateMessage(updatedMessage)
            .then(() => this.props.history.push("/messages"))
        this.props.userSpecificData()
    }

    //gets the message to be edited from the API, then sets the state to that value so that it can appear as the value in the edit text field
    componentDidMoun() {
        MessageManager.get(this.props.match.params.messageId).then(message => {
            this.setState({
                message: message.message
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <article className="contentContainer">
                    <form className="form-group">
                        <label htmlFor="message" className="label">Edit Message:</label>
                        <input
                            type="textArea"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="message"
                            value={this.state.message}
                        />
                        <button
                            type="submit"
                            onClick={this.handleMessageUpdate}
                            className="btn btn-primary"
                        >
                            Update Message
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={() => this.props.history.push("/messages")}
                        >
                            Cancel
                        </button>
                    </form>
                </article>
            </React.Fragment>
        )
    }
}