import axios from 'axios';

const API_HOST = 'https://justingnoh-cs3219-task-b.herokuapp.com';

export async function getAllUsers() {
    try {
        const resp = await axios.get(API_HOST + '/getAllUsers/');
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function getUserById(id) {
    try {
        const resp = await axios.get(API_HOST + '/getUser/' + id);
        return resp;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function addUser(id, name, email) {
    try {
        const resp = await axios.post(API_HOST + '/users/', {
            "id": id,
            "name": name,
            "email": email
        });
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function updateUser(id, name, email) {
    try {
        const resp = await axios.put(API_HOST + '/users/' + id, {
            "name": name,
            "email": email
        });
        return resp;
    } catch (err) {
        console.log(err);
    }
}

export async function deleteUser(id) {
    try {
        return await axios.delete(API_HOST + '/users/' + id, {
            data: {
                "id": id,
            }
        });
    } catch (err) {
        console.log(err);
    }
}