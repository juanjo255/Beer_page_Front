import axios from 'axios';

const getToken = ()=>{
    return `Bearer ${localStorage.getItem("token")}`
};

// CRUD PARA VENTAS

export const obtenerVentas = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'http://localhost:5000/beers/',
    headers: { Authorization: getToken()  }
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearVenta = async (data, successCallback, errorCallback) => {
    const options = {
    method: 'POST',
    url: 'http://localhost:5000/beers/',
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data
    };
    
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarVenta = async (id, data, successCallback, errorCallback) => {
    const options = {
    method: 'PATCH',
    url: `http://localhost:5000/beers/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarVenta = async (id, successCallback, errorCallback) => {
    const options = {
    method: 'DELETE',
    url: `http://localhost:5000/beers/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() }
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

// CRUD PARA USUARIOS

export const obtenerUsuarios = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'http://localhost:5000/users/',
    headers: {Authorization: getToken()}
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const obtenerDatosUsuario = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'http://localhost:5000/users/self',
    headers: {Authorization: getToken()}
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarUsuario = async (id, data, successCallback, errorCallback) => {
    const options = {
    method: 'PATCH',
    url: `http://localhost:5000/users/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken()},
    data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};
