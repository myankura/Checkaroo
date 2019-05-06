const remoteURL = "http://localhost:8088"

//responsible for managing all api calls for the key users
export default {
    //get users by id
    get(id) {
        return fetch(`${remoteURL}/users/${id}`).then(e => e.json())
    },
    //get all users
    getAll() {
        return fetch(`${remoteURL}/users`).then(e => e.json())
    },
    //delete a user by id
    delete(id) {
        return fetch(`${remoteURL}/users/${id}`, {
            method: "DELETE"
        })
    },
    //post a new user to the API
    post(user) {
        return fetch(`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(data => data.json())
    }
}