const remoteURL = "http://localhost:8088"

//responsible for managing API calls for the key checklists
export default {
    //get checklist by id
    get(id) {
        return fetch(`${remoteURL}/checklists/${id}`).then(e => e.json())
    },
    //get all checklists
    getAll(currentUserId) {
        return fetch(`${remoteURL}/checklists?userId=${currentUserId}&_embed=items`).then(e => e.json())
    },
    delete(id) {
        return fetch(`${remoteURL}/checklists/${id}`, {
            method: "DELETE"
        })
    },
    post(checklist) {
        return fetch(`${remoteURL}/checklists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(checklist)
        }).then(data => data.json())
    },
    getChecklistItems(checklistId) {
        return fetch(`${remoteURL}/items?checklistId=${checklistId}`).then(e => e.json())
    }
}