import React, { useEffect, useRef, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Tooltip } from '@mui/material';
import { crearEmpleado, editarEmpleado, eliminarEmpleado, obtenerEmpleados } from '../../utils/api';

const Empleados = () => {
    const [textoBoton, setTextoBoton] = useState("Ingresar nueva venta");
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
        setTextoBoton('Mostrar Todas las ventas');
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
                toast.success('venta eliminada con éxito');
                },
                (error) => {
                console.error(error);
                toast.error('Error eliminando la venta');
                }
            )
    };
    return (
        <>
        {edit ?
            (<tr>
                <td><input type="text" 
                className ="bg-gray-50 border border-gray-600 p-2 rounded-lg" 
                value = {nuevaEmpleado.tipoDeEmpleado}
                onChange = {(e)=>{setNuevaEmpleado({...nuevaEmpleado, tipoDeEmpleado: e.target.value})}}/></td>
                <td> <input type="text" 
                className ="bg-gray-50 border border-gray-600 p-2 rounded-lg"
                value = {nuevaEmpleado.marca}
                onChange = {(e)=>{setNuevaEmpleado({...nuevaEmpleado, marca: e.target.value})}}/></td>
                <td><input type="text"  
                className ="bg-gray-50 border border-gray-600 p-2 rounded-lg"
                value = {nuevaEmpleado.vendedor}
                onChange = {(e)=>{setNuevaEmpleado({...nuevaEmpleado, vendedor: e.target.value})}}/></td>
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
                <td className = "border-2"> {empleado.tipoDeEmpleado} </td>
                <td className = "border-2"> {empleado.marca} </td>
                <td className = "border-2"> {empleado.vendedor} </td>
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
export default Empleados
