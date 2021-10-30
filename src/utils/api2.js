import axios from 'axios';

const getToken = () => {
    return `Bearer ${localStorage.getItem('token')}`;
};

// CRUD VENTAS

export const obtenerVentas = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'http://localhost:5000/beers',
    headers: {
        Authorization: getToken(),
    },
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearVenta = async (data, successCallback, errorCallback) => {
    const options = {
    method: 'POST',
    url: 'http://localhost:5000/beers/',
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarVenta = async (id, data, successCallback, errorCallback) => {
    const options = {
    method: 'PATCH',
    url: `http://localhost:5000/beers/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarVenta = async (id, successCallback, errorCallback) => {
    const options = {
    method: 'DELETE',
    url: `http://localhost:5000/beers/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

// CRUD PARA USUARIOS

export const obtenerEmpleados = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'http://localhost:5000/employees',
    headers: {
        Authorization: getToken(),
    },
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const obtenerDatosEmployee = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'http://localhost:5000/employees/self',
    headers: {
        Authorization: getToken(),
    },
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarEmployee = async (id, data, successCallback, errorCallback) => {
    const options = {
    method: 'PATCH',
    url: `http://localhost:5000/employees/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};
