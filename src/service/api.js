import { apiService } from "./service";

function login(payload) {
    return apiService.postApiData("/login", payload)
        .then(response => response);
}

function getUser() {
    return apiService.getApiData("/users")
        .then(resp => resp)
}

function addUser() {
    return apiService.postApiData("/users")
        .then(resp => resp)
}

function deleteUser(data) {
    let { id } = data
    return apiService.deleteApiData(`/users/${id}`)
        .then(resp => resp)
}

function updateUser(data) {
    let { id } = data
    return apiService.putApiData(`/users/${id}`, data)
        .then(resp => resp)
}

export const apis = {
    login,
    getUser,
    addUser,
    deleteUser,
    updateUser
}