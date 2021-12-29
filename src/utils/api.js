import axios from 'axios';

const getToken = ()=>{
    return `Bearer ${localStorage.getItem("token")}`
};

// CRUD PARA VENTAS

export const obtenerVentas = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'https://beer-back2021.herokuapp.com/sales/',
    headers: { Authorization: getToken()  }
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearVenta = async (data, successCallback, errorCallback) => {
    const options = {
    method: 'POST',
    url: 'https://beer-back2021.herokuapp.com/sales/',
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data
    };
    
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarVenta = async (id, data, successCallback, errorCallback) => {
    const options = {
    method: 'PATCH',
    url: `https://beer-back2021.herokuapp.com/sales/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarVenta = async (id, successCallback, errorCallback) => {
    const options = {
    method: 'DELETE',
    url: `https://beer-back2021.herokuapp.com/sales/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() }
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

// CRUD PARA USUARIOS

export const obtenerUsuarios = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'https://beer-back2021.herokuapp.com/users/',
    headers: {Authorization: getToken()}
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const obtenerDatosUsuario = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'https://beer-back2021.herokuapp.com/users/self',
    headers: {Authorization: getToken()}
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarUsuario = async (id, data, successCallback, errorCallback) => {
    const options = {
    method: 'PATCH',
    url: `https://beer-back2021.herokuapp.com/users/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken()},
    data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

// CRUD PARA MERCANCIA

export const obtenerMercancia = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'https://beer-back2021.herokuapp.com/ware/',
    headers: { Authorization: getToken()  }
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearMercancia = async (data, successCallback, errorCallback) => {
    const options = {
    method: 'POST',
    url: 'https://beer-back2021.herokuapp.com/ware/',
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data
    };
    
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarMercancia = async (id, data, successCallback, errorCallback) => {
    const options = {
    method: 'PATCH',
    url: `https://beer-back2021.herokuapp.com/ware/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarMercancia = async (id, successCallback, errorCallback) => {
    const options = {
    method: 'DELETE',
    url: `https://beer-back2021.herokuapp.com/ware/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() }
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};