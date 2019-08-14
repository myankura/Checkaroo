const url = "http://localhost:8088"

export default {
    get(id) {
        return fetch(`${url}/messages/${id}`).then(e => e.json())
    },
    getAll() {
        return fetch(`${url}/messages`).then(e => e.json())
    },
    postMessage(message) {
        return fetch(`${url}/messages`, {
            method: "POST",
            headers: {
                "Context-Type": "application/json"
            },
            body: JSON.stringify(message)
        }).then(data => data.json())
    },
    deleteMessage(id) {
        return fetch(`${url}/messages/${id}`, {
            method: "DELETE"
        })
    },
    putMessage(editedMessage) {
        return fetch(`${url}/messages/${editedMessage.id}`, {
            method:"PUT",
            headers:{
                "Content-Type":"application.json"
            },
            body: JSON.stringify(editedMessage)
        }).then(data => data.json())
    }
}