import axios from 'axios';
import { MAIN_URL } from './Url';
// let token = localStorage.getItem('_token');
export function getPosts() {
    return axios.get(`${MAIN_URL}posts/fetchpost`);
}

// export function getPizzadata() {
//     return axios.get(`${MAIN_URL}posts/fetchpizzadata`, {
//         headers: { "Authorization": `Bearer ${token}` }
//     });
// }

export function getStats(data) {
    return axios.get(`${MAIN_URL}posts/fetchstas/${data}`);
}

export function getProduct(data) {
    return axios.get(`${MAIN_URL}posts/fetchproduct/${data}`);
}

export function addPost(data) {
    return axios.post(`${MAIN_URL}posts/addpost`, data);
}

export function sendEmail(data) {
    return axios.post(`${MAIN_URL}posts/sendemail`, data);
}

export function addFile(data) {
    return axios.post(`${MAIN_URL}posts/fileupload`, data);
}

export function getSenderData(data) {
    return axios.get(`${MAIN_URL}posts/fetchsenderdata/${data}`);
}

export function addInvoice(data) {
    return axios.post(`${MAIN_URL}posts/addinvoice`, data);
}

export function addInvoiceProduct(data) {
    return axios.post(`${MAIN_URL}posts/addinvoiceproduct`, data);
}

export function login(data) {
    return axios.post(`${MAIN_URL}posts/loginstore`, data);
}

export function addFileupdate(data) {
    return axios.post(`${MAIN_URL}posts/fileupdate`, data);
}

export function addStatus(data) {
    return axios.post(`${MAIN_URL}posts/addstatus`, data);
}

// export function deletePosts(id) {
//     return axios.get(`${MAIN_URL}posts/delete/${id}`);
// }