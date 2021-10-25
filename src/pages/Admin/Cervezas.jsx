import React, { useEffect, useRef, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Tooltip } from '@mui/material';
const cervezasBackend = [
    {
        tipoDeCerveza: "Pale Ale",
        marca: "BBQ",
        vendedor: "Juan Picon"
    },
    {
        tipoDeCerveza: "Ale Belga",
        marca: "la sultana",
        vendedor: "Jairo Wilmer"
    },
    {
        tipoDeCerveza: "Ale Alemana",
        marca: "la sultana",
        vendedor: "Sisley Cossio"
    },
    {
        tipoDeCerveza: "Larger Extra",
        marca: "The capital Beer",
        vendedor: "Juan Esteban"
    }
];
const Cervezas = () => {
    const [textoBoton, setTextoBoton] = useState("Ingresar nueva venta");
    const [colorBoton, setColorBoton] = useState("indigo");
    const [mostrarVentas, setMostrarVentas] = useState(true);
    const [cervezas, setCervezas] = useState([]);

    useEffect (() => {
        // OBTENER CERVAZAS DESDE EL BACKEND
        setCervezas (cervezasBackend)
    }, []);

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
        <div className = "flex flex-col h-full overflow-auto ">
            <button onClick={() => {setMostrarVentas(!mostrarVentas);}}
            className={`text-white bg-${colorBoton}-500 p-5 rounded-md w-full`}>
                {textoBoton}
            </button>
            {mostrarVentas ? (<Tabla listaCervezas = {cervezas} />) : 
            (<IngresarVenta mostrarTabla ={setMostrarVentas} agregarVenta={setCervezas} listaCervezas={cervezas} />)}
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
const IngresarVenta = ({agregarVenta, listaCervezas, mostrarTabla}) => {
    const form = useRef(null);
/* const [tipoDeCerveza, setTipoDeCerveza] = useState("");
    const [marca, setMarca] = useState("");
    const [vendedor, setVendedor] = useState("");
    */
    /*const enviarBackEnd = () => {
        mostrarTabla (true)
        agregarVenta([...listaCervezas,{tipoDeCerveza:tipoDeCerveza, marca:marca, vendedor:vendedor}])

    };*/
    const submitForm = (e) => {
        e.preventDefault();
        console.log (form.current)
        const fd = new FormData (form.current);
        const nuevaVenta = {};
        fd.forEach ((value , key)=> {
            nuevaVenta[key] = value;
        });
        console.log (nuevaVenta);
        toast.success ("Nueva venta agregada exitosamente")
        agregarVenta ([...listaCervezas, nuevaVenta])
        mostrarTabla (true)
    };
    return (
        <div className =" flex flex-col p-5">
            <h2 className = "p-5 font-extrabold text-4xl "> INGRESAR NUEVA VENTA </h2>
            <form ref={form} onSubmit ={submitForm} className ="flex flex-col"  >
                <label htmlFor="Tipo de cerveza">
                    <input name="Tipo de cerveza" 
                    type="text" placeholder = "Tipo de cerveza" className = " border-collapse border-4 w-full outline-none"required />
                </label>
                <label htmlFor="Marca">
                    <input name = "Marca" 
                    type="text" placeholder = "Marca" className = " border-collapse border-4 w-full outline-none" required/>
                </label>
                <label htmlFor="Vendedor">
                    <input name="Vendedor"
                    type="text" placeholder = "Vendedor" className = " border-collapse border-4 w-full outline-none" required/>
                </label>
                <div className=" flex justify-center items-center">
                    <button type="submit" className = "border rounded-md p-3 bg-blue-300 text-xl font-semibold"
                    
                    >Agregar Venta</button>
                </div>
            </form>
        </div>
    );
};
const FilaVenta = ({cerveza}) => {
    const [edit, setEdit] = useState(false)
    const [nuevaVenta, setNuevaVenta] = useState({
        tipoDeCerveza: cerveza.tipoDeCerveza,
        marca: cerveza.marca,
        vendedor: cerveza.vendedor
    });
    const actualizarVenta = () => {
        console.log (nuevaVenta)
        //Enviar al backEnd
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
                    <div className="flex justify-center "> 
                        <Tooltip title="Save">
                        <i  onClick = {()=>{actualizarVenta()}} className="fas fa-check cursor-pointer transform hover:scale-150  " />
                        </Tooltip>
                    </div>
                </td>
            </tr>) : (
            <tr className ="border-collapse border-2" >
                <td className = "border-2"> {cerveza.tipoDeCerveza} </td>
                <td className = "border-2"> {cerveza.marca} </td>
                <td className = "border-2"> {cerveza.vendedor} </td>
                <td className = "border-2"> 
                    <div className="flex justify-around "> 
                    <Tooltip title = "Edit">
                        <i  onClick = {()=>{setEdit(!edit)}} className="fas fa-pencil-alt cursor-pointer transform hover:scale-150  " />
                    </Tooltip>
                    <Tooltip title ="Delete">
                        <i className="fas fa-trash cursor-pointer transform hover:scale-150" />
                    </Tooltip>
                    </div>
                </td>
            </tr>
        )}
    </>
)};
const Tabla = ({listaCervezas}) => {
    const [busqueda, setBusqueda] = useState("")
    const [cervezasFiltradas, setCervezasFiltradas] = useState(listaCervezas);

    useEffect(() => {
        setCervezasFiltradas(
        listaCervezas.filter((elemento) => {
            return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
        })
        );
    }, [busqueda, listaCervezas]);
    

    return (
        <div className ="flex items-start">
            <div className ="flex flex-col h-screen justify-center items-center border-4">
                <h2 className= "text-4xl font-extrabold m-4"> VENTAS REALIZADAS </h2>
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
                        <th className = "border-2 text-left text-xl"> Tipo de Cerveza </th>
                        <th className = "border-2 text-left text-xl"> Marca </th>
                        <th className = "border-2 text-left text-xl"> Vendedor </th>
                        <th className = "border-2 text-left text-xl"> Acciones </th>
                    </tr>
                </thead>
                <tbody >
                    {cervezasFiltradas.map ((cerveza)=>{
                        return (
                            <FilaVenta cerveza = {cerveza} key= {nanoid()} />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Cervezas
