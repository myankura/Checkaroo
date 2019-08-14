import React, { Component } from "react"
// import MessageManager from "../../modules/MessageManager"

export default class MessageForm extends Component {
    //set initial message state.
    state = {
        message: "",
        userId: Number(sessionStorage.getItem("userId"))
    }

    handleMessageInput = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    //find out why addMessage is not a function...........
    constructNewMessage = event => {
        event.preventDefault()
        if (this.state.message === "") {
            window.alert("Please enter a message.")
        } else {
            const message = {
                message: this.state.message,
                userId: parseInt(sessionStorage.getItem("userId")),
                messageTimeStamp: this.props.getDateTime(new Date())
            }
            this.props.addMessage(message)
                .then(() =>
                    this.props.history.push("/messages"));
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="form-group">
                    <input
                        type="text"
                        required
                        className="form-control"
                        onChange={this.handleMessageInput}
                        id="message"
                        placeholder="new message"
                        ref={message => {
                            this.messageInput = message
                        }}
                    />
                </div>
                <div className="sendButton">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.constructNewMessage}
                    >
                        Send Message
              </button>
                </div>
            </React.Fragment>
        )
    }
}
