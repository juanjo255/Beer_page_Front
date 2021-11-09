import axios from 'axios';

const getToken = ()=>{
    return `Bearer ${localStorage.getItem("token")}`
};

// CRUD PARA VENTAS

export const obtenerVentas = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'https://stark-anchorage-04255.herokuapp.com/beers/',
    headers: { Authorization: getToken()  }
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearVenta = async (data, successCallback, errorCallback) => {
    const options = {
    method: 'POST',
    url: 'https://stark-anchorage-04255.herokuapp.com/beers/',
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data
    };
    
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarVenta = async (id, data, successCallback, errorCallback) => {
    const options = {
    method: 'PATCH',
    url: `https://stark-anchorage-04255.herokuapp.com/beers/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarVenta = async (id, successCallback, errorCallback) => {
    const options = {
    method: 'DELETE',
    url: `https://stark-anchorage-04255.herokuapp.com/beers/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() }
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

// CRUD PARA EMPLEADOS

export const obtenerEmpleados = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'https://stark-anchorage-04255.herokuapp.com/employees/',
    headers: {Authorization: getToken()}
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const obtenerDatosEmpleado = async (successCallback, errorCallback) => {
    const options = {
    method: 'GET',
    url: 'https://stark-anchorage-04255.herokuapp.com/employees/self',
    headers: {Authorization: getToken()}
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearEmpleado = async (data, successCallback, errorCallback) => {
    const options = {
    method: 'POST',
    url: 'https://stark-anchorage-04255.herokuapp.com/employees/',
    headers: {'Content-Type': 'application/json', Authorization: getToken() },
    data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarEmpleado = async (id, data, successCallback, errorCallback) => {
    const options = {
    method: 'PATCH',
    url: `https://stark-anchorage-04255.herokuapp.com/employees/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken()},
    data
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarEmpleado = async (id, successCallback, errorCallback) => {
    const options = {
    method: 'DELETE',
    url: `https://stark-anchorage-04255.herokuapp.com/employees/${id}/`,
    headers: {'Content-Type': 'application/json', Authorization: getToken() }
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};