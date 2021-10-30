import React, { useEffect, useRef, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Tooltip } from '@mui/material';
import { crearEmpleado, editarEmpleado, eliminarEmpleado, obtenerEmpleados } from '../../utils/api';

const Empleados = () => {
    const [textoBoton, setTextoBoton] = useState("Ingresar nueva empleado");
    const [colorBoton, setColorBoton] = useState("indigo");
    const [mostrarEmpleados, setMostrarEmpleados] = useState(true);
    const [empleados, setEmpleados] = useState([]);

    useEffect (() => {
        // OBTENER CERVAZAS DESDE EL BACKEND
        const refrescar = async () => {
            await obtenerEmpleados ((response)=>{
                setEmpleados(response.data)
            })
        }
        refrescar()
        console.log ("hola")
    }, [mostrarEmpleados]);

    useEffect (() => {
        if (mostrarEmpleados) {
        setTextoBoton('Ingresar Nueva Empleado');
        setColorBoton('indigo');
        } else {
        setTextoBoton('Mostrar Todas las empleados');
        setColorBoton('green');
        }
    }, [mostrarEmpleados]);

    return (
        <div className = "flex flex-col h-full overflow-auto ">
            <button onClick={() => {setMostrarEmpleados(!mostrarEmpleados);}}
            className={`text-white bg-${colorBoton}-500 p-5 rounded-md w-full`}>
                {textoBoton}
            </button>
            {mostrarEmpleados ? (<Tabla listaEmpleados = {empleados} />) : 
            (<IngresarEmpleado mostrarTabla ={setMostrarEmpleados} />)}
            <ToastContainer position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHove/>
        </div>
    );
};

const FilaEmpleado = ({empleado}) => {
    const [edit, setEdit] = useState(false)
    const [nuevaEmpleado, setNuevaEmpleado] = useState({
        nombre: empleado.nombre,
        correo: empleado.correo,
        fecha: empleado.fecha
    });
    const actualizarEmpleado = async ({nuevaEmpleado}) => {
        console.log (nuevaEmpleado)
        setEdit(!edit)
        await editarEmpleado (nuevaEmpleado,
            (response) => {
                console.log(response.data);
                toast.success('Empleado modificado con éxito');
                },
                (error) => {
                toast.error('Error modificando el empleado');
                console.error(error);
                }
            );
        
    };
    const eliminar = () => {
        console.log ("pa eliminar", empleado._id)
        eliminarEmpleado (empleado._id, 
            (response) => {
                toast.success('empleado eliminada con éxito');
                },
                (error) => {
                console.error(error);
                toast.error('Error eliminando la empleado');
                }
            )
    };
    return (
        <>
        {edit ?
            (<tr>
                <td><input type="text" 
                className ="bg-gray-50 border border-gray-600 p-2 rounded-lg" 
                value = {nuevaEmpleado.nombre}
                onChange = {(e)=>{setNuevaEmpleado({...nuevaEmpleado, nombre: e.target.value})}}/></td>
                <td> <input type="text" 
                className ="bg-gray-50 border border-gray-600 p-2 rounded-lg"
                value = {nuevaEmpleado.correo}
                onChange = {(e)=>{setNuevaEmpleado({...nuevaEmpleado, correo: e.target.value})}}/></td>
                <td><input type="text"  
                className ="bg-gray-50 border border-gray-600 p-2 rounded-lg"
                value = {nuevaEmpleado.fecha}
                onChange = {(e)=>{setNuevaEmpleado({...nuevaEmpleado, fecha: e.target.value})}}/></td>
                <td className = "border-2"> 
                    <div className="flex justify-around "> 
                        <Tooltip title="Save">
                        <i  onClick = {()=>{actualizarEmpleado(nuevaEmpleado)}} className="fas fa-check cursor-pointer transform hover:scale-150  " />
                        </Tooltip>
                        <Tooltip title="Cancel">
                            <i onClick= {()=>{setEdit(!edit)}} className="fas fa-times cursor-pointer transform hover:scale-150" />
                        </Tooltip>
                    </div>
                </td>
            </tr>) : (
            <tr className ="border-collapse border-2" >
                <td className = "border-2"> {empleado.nombre} </td>
                <td className = "border-2"> {empleado.correo} </td>
                <td className = "border-2"> {empleado.fecha} </td>
                <td className = "border-2"> 
                    <div className="flex justify-around "> 
                        <Tooltip title= "Edit">
                            <i  onClick= {()=>{setEdit(!edit)}} 
                                className="fas fa-pencil-alt cursor-pointer transform hover:scale-150" />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <i onClick= {()=>{eliminar()}} className="fas fa-trash cursor-pointer transform hover:scale-150" />
                        </Tooltip>
                    </div>
                </td>
            </tr>
        )}
    </>
)};

const Tabla = ({listaEmpleados}) => {
    const [busqueda, setBusqueda] = useState("")
    const [empleadosFiltradas, setEmpleadosFiltradas] = useState(listaEmpleados);

    useEffect(() => {
        setEmpleadosFiltradas(
        listaEmpleados.filter((elemento) => {
            return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
        })
        );
    }, [busqueda, listaEmpleados]);
    

    return (
        <div className ="flex items-start">
            <div className ="flex flex-col h-screen justify-center items-center border-4">
                <h2 className= "text-4xl font-extrabold m-4"> EMPLEADOS </h2>
                <div className = "flex w-full">
                    <input 
                    type="search" 
                    className="border rounded-md focus-within:border-indigo-400 outline-none w-full"
                    placeholder = "Buscar"
                    onChange = {(e)=> setBusqueda (e.target.value)}/>
                    <i className = "fas fa-search"/>
                </div>
            </div>
            <table className = "table-auto tabla w-full" >
                <thead>
                    <tr className = "border-4 border-solid">
                        <th className = "border-2 text-left text-xl"> Nombres </th>
                        <th className = "border-2 text-left text-xl"> Correos </th>
                        <th className = "border-2 text-left text-xl"> Fechas </th>
                        <th className = "border-2 text-left text-xl"> Acciones </th>
                    </tr>
                </thead>
                <tbody>
                    {empleadosFiltradas.map ((empleado)=>{
                        return (
                            <FilaEmpleado empleado = {empleado} key= {nanoid()} />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const IngresarEmpleado = ({mostrarTabla}) => {
    const form = useRef(null);
    const submitForm = (e) => {
        e.preventDefault();
        const fd = new FormData (form.current);
        const nuevaEmpleado = {};
        
        fd.forEach ((value , key)=> {
            nuevaEmpleado[key] = value;
        });
        crearEmpleado (nuevaEmpleado, 
            (response) => {
                console.log(response.data)
                toast.success('Empleado agregada con éxito');
                },
            (error) => {
                console.error(error);
                toast.error('Error creando una venta');
                }
            )
        mostrarTabla (true)
    };
    return (
        <div className =" flex flex-col p-5">
            <h2 className = "p-5 font-extrabold text-4xl "> INGRESAR NUEVO EMPLEADO</h2>
            <form ref={form} onSubmit ={submitForm} className ="flex flex-col"  >
                <label htmlFor="nombre">
                    <input name="nombre" 
                    type="text" placeholder = "Nombre" className = " border-collapse border-4 w-full outline-none"required />
                </label>
                <label htmlFor="correo">
                    <input name = "correo" 
                    type="text" placeholder = "Correo" className = " border-collapse border-4 w-full outline-none" required/>
                </label>
                <label htmlFor="fecha">
                    <input name="fecha"
                    type="text" placeholder = "Fecha" className = " border-collapse border-4 w-full outline-none" required/>
                </label>
                <div className=" flex justify-center items-center">
                    <button type="submit" className = "border rounded-md p-3 bg-blue-300 text-xl font-semibold">
                        Agregar Empleado
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Empleados
