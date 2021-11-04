import axios from 'axios';

// CRUD PARA VENTAS

export const obtenerVentas = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'https://stark-anchorage-04255.herokuapp.com//beers/',
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearVenta = async (data, successCallback, errorCallback) => {
    const options = {
    method: 'POST',
    url: 'https://stark-anchorage-04255.herokuapp.com/beers/',
    data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarVenta = async (id, data, successCallback, errorCallback) => {
    const options = {
    method: 'PATCH',
    url: `https://stark-anchorage-04255.herokuapp.com/beers/${id}/`,
    data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarVenta = async (id, successCallback, errorCallback) => {
    const options = {
    method: 'DELETE',
    url: `https://stark-anchorage-04255.herokuapp.com/beers/${id}/`,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

// CRUD PARA EMPLEADOS

export const obtenerEmpleados = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'https://stark-anchorage-04255.herokuapp.com/employees/',
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const obtenerDatosEmpleado = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'https://stark-anchorage-04255.herokuapp.com/employees/self',
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearEmpleado = async (data, successCallback, errorCallback) => {
    const options = {
    method: 'POST',
    url: 'https://stark-anchorage-04255.herokuapp.com/employees/',
    data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarEmpleado = async (id, data, successCallback, errorCallback) => {
    const options = {
    method: 'PATCH',
    url: `https://stark-anchorage-04255.herokuapp.com/employees/${id}/`,
    data,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarEmpleado = async (id, successCallback, errorCallback) => {
    const options = {
    method: 'DELETE',
    url: `https://stark-anchorage-04255.herokuapp.com/employees/${id}/`,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};