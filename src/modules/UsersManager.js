const url = "http://localhost:8088"

//responsible for managing all api calls for the key users
export default {
    //get users by id
    get(id) {
        return fetch(`${url}/users/${id}`).then(e => e.json())
    },
    //get all users
    getAll() {
        return fetch(`${url}/users`).then(e => e.json())
    },
    //delete a user by id
    delete(id) {
        return fetch(`${url}/users/${id}`, {
            method: "DELETE"
        })
    },
    //post a new user to the API
    post(newUser) {
        return fetch(`${url}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(data => data.json())
    }
}