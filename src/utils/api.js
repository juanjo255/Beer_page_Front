import axios from 'axios';

// CRUD VENTAS

export const obtenerVentas = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'http://localhost:5000/beers',
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearVenta = async (data, successCallback, errorCallback) => {
    const options = {
    method: 'POST',
    url: 'http://localhost:5000/beers',
    data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarVenta = async (id, data, successCallback, errorCallback) => {
    const options = {
    method: 'PATCH',
    url: `http://localhost:5000/beers/${id}/`,
    data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarVenta = async (id, successCallback, errorCallback) => {
    const options = {
    method: 'DELETE',
    url: `http://localhost:5000/beers/${id}/`,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

// CRUD PARA USUARIOS

export const obtenerEmpleados = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'http://localhost:5000/employees',
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const obtenerDatosEmpleado = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'http://localhost:5000/employees/self',
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearEmpleado = async (data, successCallback, errorCallback) => {
    const options = {
    method: 'POST',
    url: 'http://localhost:5000/employees',
    data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarEmpleado = async (id, data, successCallback, errorCallback) => {
    const options = {
    method: 'PATCH',
    url: `http://localhost:5000/employees/${id}/`,
    data,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarEmpleado = async (id, successCallback, errorCallback) => {
    const options = {
    method: 'DELETE',
    url: `http://localhost:5000/employees/${id}/`,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};