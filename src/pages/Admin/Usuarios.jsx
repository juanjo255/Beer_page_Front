import React, { useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Tooltip } from '@mui/material';
import { editarUsuario, obtenerUsuarios } from '../../utils/api';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            await obtenerUsuarios ((respuesta)=>{setUsuarios(respuesta.data)}, 
            (error) => {console.log (error)})
        }
        fetchUsuarios()
    }, [])
    return (
        <div className = "flex flex-col h-full overflow-auto ">
            <Tabla listaUsuarios = {usuarios} />
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

const FilaUsuarios = ({usuario}) => {
    const [edit, setEdit] = useState(false)
    const [nuevoUsuario, setNuevoUsuario] = useState({...usuario, _id:usuario._id});
    const [rol, setRol] = useState(usuario.rol);
    //console.log ("nuevo", nuevoUsuario._id)
    const actualizarUsuario = async (nuevoUsuario) => {
        console.log ("actualizando", nuevoUsuario)
        await editarUsuario (nuevoUsuario._id, nuevoUsuario,
            (response) => {
                console.log(response.data);
                toast.success('Usuarios modificado con éxito');
                setEdit(!edit)
                },
                (error) => {
                toast.error('Error modificando el usuario');
                console.error(error);
                }
            );
        
    };

    return (
        <>
        {edit ?
            (<tr>

                <td> <input type="text" 
                className ="bg-gray-50 border border-gray-600 p-2 rounded-lg" 
                value = {nuevoUsuario.name}
                onChange = {(e)=>{setNuevoUsuario({...nuevoUsuario, name: e.target.value})}}/></td>

                <td> <input type="text" 
                className ="bg-gray-50 border border-gray-600 p-2 rounded-lg"
                value = {nuevoUsuario.email}
                onChange = {(e)=>{setNuevoUsuario ({...nuevoUsuario, email: e.target.value})}}/></td>

                <td> <select name="Rol" value = {rol} onChange = {(e) => {setRol(e.target.value)}} >
                    <option value="Pendiente">Pendiente</option>
                    <option value ="Vendedor">Vendedor</option>
                    <option value ="Admin">Admin</option>
                    </select> </td> 

                <td className = "border-2"> 
                    <div className="flex justify-around "> 
                        <Tooltip title="Save">
                        <i  onClick = {()=>{actualizarUsuario(nuevoUsuario)}} className="fas fa-check cursor-pointer transform hover:scale-150  " />
                        </Tooltip>
                        <Tooltip title="Cancel">
                            <i onClick= {()=>{setEdit(!edit)}} className="fas fa-times cursor-pointer transform hover:scale-150" />
                        </Tooltip>
                    </div>
                </td>

            </tr>) : (
            <tr className ="border-collapse border-2" >
                <td className = "border-2"> {usuario.name} </td>
                <td className = "border-2"> {usuario.email} </td>
                <td className = "border-2"> {rol} </td>
                <td className = "border-2"> 
                    <div className="flex justify-around "> 
                        <Tooltip title= "Edit">
                            <i  onClick= {()=>{setEdit(!edit)}} 
                                className="fas fa-pencil-alt cursor-pointer transform hover:scale-150" />
                        </Tooltip>
                    </div>
                </td>
            </tr>
        )}
    </>
)};

const Tabla = ({listaUsuarios}) => {
    const [busqueda, setBusqueda] = useState("")
    const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);

    useEffect(() => {
        setUsuariosFiltrados(
        listaUsuarios.filter((elemento) => {
            return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
        })
        );
    }, [busqueda, listaUsuarios]);
    

    return (
        <div className ="flex items-start">
            <div className ="flex flex-col h-screen justify-center items-center border-4">
                <h2 className= "text-4xl font-extrabold m-4"> USUARIOS  </h2>
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
                        <th className = "border-2 text-left text-xl"> Nombre </th>
                        <th className = "border-2 text-left text-xl"> Correo </th>
                        <th className = "border-2 text-left text-xl"> Rol </th>
                        <th className = "border-2 text-left text-xl"> Acciones </th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosFiltrados.map ((usuario)=>{
                        return (
                            <FilaUsuarios usuario= {usuario} key= {nanoid()} />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Usuarios
