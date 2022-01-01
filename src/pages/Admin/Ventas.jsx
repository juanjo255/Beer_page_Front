import React, { useEffect, useRef, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Tooltip } from '@mui/material';
import PrivateComponent from 'components/PrivateComponent';
import { crearVenta, editarVenta, eliminarVenta, obtenerVentas } from '../../utils/api';
import { useSearch } from 'context/searchContext';

const Ventas = () => {
    const [textoBoton, setTextoBoton] = useState("Ingresar nueva venta");
    const [colorBoton, setColorBoton] = useState("indigo");
    const [mostrarVentas, setMostrarVentas] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [cervezas, setCervezas] = useState([]);

    useEffect (() => {
        // OBTENER CERVAZAS DESDE EL BACKEND
        const refrescar = async () => {
            try {
            await obtenerVentas ((response)=>{
                setCervezas(response.data)
            })
            }catch(err) {
            alert(err)
            }
        }
        refrescar().catch(err => alert(err.message))
    }, [mostrarVentas, refresh] );

    useEffect (() => {
        if (mostrarVentas) {
        setTextoBoton('Ingresar Nueva Venta');
        setColorBoton('indigo');
        } else {
        setTextoBoton('Mostrar Todas las ventas');
        setColorBoton('green');
        }
    }, [mostrarVentas]);

    return (
        <div className = "flex flex-col h-full overflow-auto" id="sacarTitle" title="VENTAS REALIZADAS">
            <button onClick={() => {setMostrarVentas(!mostrarVentas);}}
            className={`text-white bg-${colorBoton}-500 p-5 rounded-md w-full`}>
                {textoBoton}
            </button>
            {mostrarVentas ? (<Tabla listaCervezas = {cervezas} refrescarTabla ={setRefresh} refrescar ={refresh} />) : 
            (<IngresarVenta mostrarTabla ={setMostrarVentas} />)}
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

const IngresarVenta = ({mostrarTabla}) => {
    const form = useRef(null);
    const submitForm = (e) => {
        e.preventDefault();
        const fd = new FormData (form.current);
        const nuevaVenta = {};
        
        fd.forEach ((value , key)=> {
            nuevaVenta[key] = value;
        });
        crearVenta (nuevaVenta, 
            (response) => {
                console.log(response.data)
                toast.success('Venta agregada con éxito');
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
            <h2 className = "p-5 font-extrabold text-4xl "> INGRESAR NUEVA VENTA </h2>
            <form ref={form} onSubmit ={submitForm} className ="flex flex-col"  >
                <label htmlFor="tipoDeCerveza">
                    <input name="tipoDeCerveza" 
                    type="text" placeholder = "Tipo de cerveza" className = " border-collapse border-4 w-full outline-none"required />
                </label>
                <label htmlFor="marca">
                    <input name = "marca" 
                    type="text" placeholder = "Marca" className = " border-collapse border-4 w-full outline-none" required/>
                </label>
                <label htmlFor="vendedor">
                    <input name="vendedor"
                    type="text" placeholder = "Vendedor" className = " border-collapse border-4 w-full outline-none" required/>
                </label>
                <div className=" flex justify-center items-center">
                    <button type="submit" className = "border rounded-md p-3 bg-blue-300 text-xl font-semibold">
                        Agregar Venta
                    </button>
                </div>
            </form>
        </div>
    );
};

const FilaVenta = ({refrescarTabla, refrescar, cerveza}) => {
    const [edit, setEdit] = useState(false)
    const [nuevaVenta, setNuevaVenta] = useState({
        tipoDeCerveza: cerveza.tipoDeCerveza,
        marca: cerveza.marca,
        vendedor: cerveza.vendedor
    });
    const actualizarVenta = async () => {
        try {
        setEdit(!edit)
        await editarVenta (cerveza._id, nuevaVenta,
            (response) => {
                //console.log(response.data);
                toast.success('Venta modificada con éxito');
                },
                (error) => {
                toast.error('Error modificando la venta');
                console.error(error);
                }
            );
        refrescarTabla(!refrescar)
            }catch(err) {
                alert(err)
            }
    };
    const eliminar = async () => {
        try {
        await eliminarVenta (cerveza._id, 
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
            }catch(err) {
                alert(err)
            }
    };
    return (
        <>
        {edit ?
            (<tr>
                <td><input type="text" 
                className ="bg-gray-50 border border-gray-600 p-2 rounded-lg" 
                value = {nuevaVenta.tipoDeCerveza}
                onChange = {(e)=>{setNuevaVenta({...nuevaVenta, tipoDeCerveza: e.target.value})}}/></td>
                <td> <input type="text" 
                className ="bg-gray-50 border border-gray-600 p-2 rounded-lg"
                value = {nuevaVenta.marca}
                onChange = {(e)=>{setNuevaVenta({...nuevaVenta, marca: e.target.value})}}/></td>
                <td><input type="text"  
                className ="bg-gray-50 border border-gray-600 p-2 rounded-lg"
                value = {nuevaVenta.vendedor}
                onChange = {(e)=>{setNuevaVenta({...nuevaVenta, vendedor: e.target.value})}}/></td>
                <td className = "border-2"> 
                    <div className="flex justify-around "> 
                        <Tooltip title="Save">
                        <i  onClick = {()=>{actualizarVenta(nuevaVenta).catch(err => alert(err.message))}} className="fas fa-check cursor-pointer transform hover:scale-150  " />
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
                <td className = "border-2"> {cerveza.vendedor} </td>
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

            {/* <div className ="flex flex-col h-full justify-center border-4 border-black">
                <h2 className= "text-4xl font-extrabold m-4"> VENTAS REALIZADAS </h2>
                <div className = "flex w-full">
                    <input 
                    type="search" 
                    className="border rounded-md focus-within:border-indigo-400 outline-none w-full"
                    placeholder = "Buscar"
                    onChange = {(e)=> setBusqueda (e.target.value)}/>
                    <i className = "fas fa-search"/>
                </div>
            </div> */}

            <div className ="w-full h-full border-4 border-black p-5">
            <table className = "table-auto tabla" >
                <thead>
                    <tr className = " border-solid">
                        <th className = "border-2 text-left text-xl"> Tipo de Cerveza </th>
                        <th className = "border-2 text-left text-xl"> Marca </th>
                        <th className = "border-2 text-left text-xl"> Vendedor </th>
                        <PrivateComponent roleList="Admin" >
                        <th className = "border-2 text-left text-xl"> Acciones </th>
                        </PrivateComponent>
                    </tr>
                </thead>
                <tbody >
                    {cervezasFiltradas.map ((cerveza)=>{
                        return (
                            <FilaVenta refrescarTabla = {refrescarTabla} refrescar ={refrescar} cerveza = {cerveza} key= {nanoid()} />
                        );
                    })}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Ventas;