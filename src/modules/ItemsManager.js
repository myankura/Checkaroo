const url = "http://localhost:8088"

//responsible for managin API calls for the key items
export default {
    //get an item by id
    get(id) {
        return fetch(`${url}/items/${id}`).then(e => e.json())
    },
    //get all items
    getAll() {
        return fetch(`${url}/items`).then(e => e.json())
    },
    //delete an item by id
    delete(id) {
        return fetch(`${url}/items/${id}`, {
            method: "DELETE"
        })
    },
    //post a new item in the api
    post(item) {
        return fetch(`${url}/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        }).then(data => data.json())
    },
    //edit an existing item in the api
    put(editedItem) {
        return fetch(`${url}/items/${editedItem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedItem)
        }).then(data => data.json());
    },
    patch(patchItem) {
        return fetch(`${url}/items/${patchItem.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patchItem)
        }).then(data => data.json());
    }
}