import React, { useEffect, useRef, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Tooltip } from '@mui/material';
import PrivateComponent from 'components/PrivateComponent';
import { crearMercancia, editarMercancia, eliminarMercancia, obtenerMercancia } from '../../utils/api';
import { useSearch } from 'context/searchContext';

const Mercancia = () => {
    const [textoBoton, setTextoBoton] = useState("Ingresar nueva venta");
    const [colorBoton, setColorBoton] = useState("indigo");
    const [mostrarMercancia, setMostrarMercancia] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [cervezas, setCervezas] = useState([]);

    useEffect (() => {
        // OBTENER CERVAZAS DESDE EL BACKEND
        const refrescar = async () => {
            await obtenerMercancia ((response)=>{
                setCervezas(response.data)
            })
        }
        refrescar().catch(err => alert(err.message))
    }, [mostrarMercancia, refresh] );

    useEffect (() => {
        if (mostrarMercancia) {
        setTextoBoton('Ingresar Nueva Mercancia');
        setColorBoton('indigo');
        } else {
        setTextoBoton('Mostrar Todas las ventas');
        setColorBoton('green');
        }
    }, [mostrarMercancia]);

    return (
        <div className = "flex flex-col h-full overflow-auto" id="sacarTitle" title="MERCANCIA ACTUAL">
            <button onClick={() => {setMostrarMercancia(!mostrarMercancia);}}
            className={`text-white bg-${colorBoton}-500 p-5 rounded-md w-full`}>
                {textoBoton}
            </button>
            {mostrarMercancia ? (<Tabla listaCervezas = {cervezas} refrescarTabla ={setRefresh} refrescar ={refresh} />) : 
            (<IngresarMercancia mostrarTabla ={setMostrarMercancia} />)}
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

const IngresarMercancia = ({mostrarTabla}) => {
    const form = useRef(null);
    const submitForm = (e) => {
        e.preventDefault();
        const fd = new FormData (form.current);
        const nuevaMercancia = {};
        
        fd.forEach ((value , key)=> {
            nuevaMercancia[key] = value;
        });
        crearMercancia (nuevaMercancia, 
            (response) => {
                console.log(response.data)
                toast.success('Mercancia agregada con éxito');
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
            <h2 className = "p-5 font-extrabold text-4xl "> INGRESAR NUEVO PRODUCTO </h2>
            <form ref={form} onSubmit ={submitForm} className ="flex flex-col"  >
                <label htmlFor="tipoDeCerveza">
                    <input name="tipoDeCerveza" 
                    type="text" placeholder = "Tipo de cerveza" className = " border-collapse border-4 w-full outline-none"required />
                </label>
                <label htmlFor="marca">
                    <input name = "marca" 
                    type="text" placeholder = "Marca" className = " border-collapse border-4 w-full outline-none" required/>
                </label>
                <label htmlFor="precioUnitario">
                    <input name="precioUnitario"
                    type="number" placeholder = "Precio Unitario" className = " border-collapse border-4 w-full outline-none" required/>
                </label>
                
                <div className=" flex justify-center items-center">
                    <button type="submit" className = "border rounded-md p-3 bg-blue-300 text-xl font-semibold">
                        Agregar Mercancia
                    </button>
                </div>
            </form>
        </div>
    );
};

const FilaMercancia = ({refrescarTabla, refrescar, cerveza}) => {
    const [edit, setEdit] = useState(false)
    const [nuevaMercancia, setNuevaMercancia] = useState({
        tipoDeCerveza: cerveza.tipoDeCerveza,
        marca: cerveza.marca,
        precioUnitario: cerveza.precioUnitario,
        estado: cerveza.estado
    });
    const actualizarMercancia = async () => {
        setEdit(!edit)
        await editarMercancia (cerveza._id, nuevaMercancia,
            (response) => {
                toast.success('Mercancia modificada con éxito');
                },
                (error) => {
                toast.error('Error modificando la venta');
                console.error(error);
                }
            );
        refrescarTabla(!refrescar)
    };

    // para poder modificar el estado con el select
    useEffect(() => {
        if (cerveza.estado !== nuevaMercancia.estado){
            actualizarMercancia().catch(err => alert(err.message));
        }
    }, [nuevaMercancia, cerveza.estado]);
    const eliminar = async () => {
        await eliminarMercancia (cerveza._id, 
            (response) => {
                console.log ("eliminado", response);
                toast.success('venta eliminada con éxito');
                },
                (error) => {
                console.error(error);
                toast.error('Error eliminando la venta');
                }
            )
        refrescarTabla(!refrescar)
    };
    return (
        <>
        {edit ?
            (<tr>
                <td><input type="text" 
                className ="bg-gray-50 border border-gray-600 p-2 rounded-lg" 
                value = {nuevaMercancia.tipoDeCerveza}
                onChange = {(e)=>{setNuevaMercancia({...nuevaMercancia, tipoDeCerveza: e.target.value})}}/></td>
                <td> <input type="text" 
                className ="bg-gray-50 border border-gray-600 p-2 rounded-lg"
                value = {nuevaMercancia.marca}
                onChange = {(e)=>{setNuevaMercancia({...nuevaMercancia, marca: e.target.value})}}/></td>
                <td><input type="text"  
                className ="bg-gray-50 border border-gray-600 p-2 rounded-lg"
                value = {nuevaMercancia.precioUnitario}
                onChange = {(e)=>{setNuevaMercancia({...nuevaMercancia, precioUnitario: e.target.value})}}/></td>
                <td className = "border-2"> <select name="Estado" value={cerveza.estado} 
                onChange={(e) => {setNuevaMercancia({...nuevaMercancia, estado: e.target.value})}}>
                    <option value="Disponible">Disponible</option>
                    <option value="Agotado">Agotado</option>
                    </select></td>
                
                <td className = "border-2"> 
                    <div className="flex justify-around "> 
                        <Tooltip title="Save">
                        <i  onClick = {()=>{actualizarMercancia(nuevaMercancia)}} className="fas fa-check cursor-pointer transform hover:scale-150  " />
                        </Tooltip>
                        <Tooltip title="Cancel">
                            <i onClick= {()=>{setEdit(!edit)}} className="fas fa-times cursor-pointer transform hover:scale-150" />
                        </Tooltip>
                    </div>
                </td>
            </tr>) : (
            <tr className ="border-collapse border-2" >
                <td className = "border-2"> {cerveza.tipoDeCerveza} </td>
                <td className = "border-2"> {cerveza.marca} </td>
                <td className = "border-2"> {cerveza.precioUnitario} </td>
                <td className = "border-2"> <select name="Estado" value={cerveza.estado} 
                onChange={(e) => {setNuevaMercancia({...nuevaMercancia, estado: e.target.value})}}>
                    <option value="Disponible">Disponible</option>
                    <option value="Agotado">Agotado</option>
                    </select></td>

                <PrivateComponent roleList="Admin" >
                <td className = "border-2"> 
                    <div className="flex justify-around "> 
                        <Tooltip title= "Edit">
                            <i  onClick= {()=>{setEdit(!edit)}} 
                                className="fas fa-pencil-alt cursor-pointer transform hover:scale-150" />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <i onClick= {()=>{eliminar().catch(err => alert(err.message))}} className="fas fa-trash cursor-pointer transform hover:scale-150" />
                        </Tooltip>
                    </div>
                </td>
                </PrivateComponent>
            </tr>
        )}
    </>
)};

const Tabla = ({refrescarTabla, refrescar, listaCervezas}) => {
    const {search} = useSearch();
    const [cervezasFiltradas, setCervezasFiltradas] = useState(listaCervezas);

    useEffect(() => {
        setCervezasFiltradas(
        listaCervezas.filter((elemento) => {
            return JSON.stringify(elemento).toLowerCase().includes(search.toLowerCase());
        })
        );
    }, [search, listaCervezas]);
    

    return (
        <div className ="flex items-start ">
            <div className ="w-full h-full border-4 border-black p-5">
            <table className = "table-auto tabla" >
                <thead>
                    <tr className = " border-solid">
                        <th className = "border-2 text-left text-xl"> Tipo de Cerveza </th>
                        <th className = "border-2 text-left text-xl"> Marca </th>
                        <th className = "border-2 text-left text-xl"> Precio Unitario </th>
                        <th className = "border-2 text-left text-xl"> Estado </th>
                        <PrivateComponent roleList="Admin" >
                        <th className = "border-2 text-left text-xl"> Acciones </th>
                        </PrivateComponent>
                    </tr>
                </thead>
                <tbody >
                    {cervezasFiltradas.map ((cerveza)=>{
                        return (
                            <FilaMercancia refrescarTabla = {refrescarTabla} refrescar ={refrescar} cerveza = {cerveza} key= {nanoid()} />
                        );
                    })}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Mercancia;