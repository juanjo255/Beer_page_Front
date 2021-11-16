import React, { useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { editarUsuario, obtenerUsuarios } from '../../utils/api';
import { useSearch } from 'context/searchContext';

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
    const [rol, setRol] = useState(usuario.rol);

    useEffect(() => {
        const actualizarUsuario = async () => {
            await editarUsuario (usuario._id, {rol:rol},
                (response) => {
                    console.log(response.data);
                    toast.success('Usuarios modificado con éxito');
                    },
                    (error) => {
                    toast.error('Error modificando el usuario');
                    console.error(error);
                    }
                );
            
        };
        
        if (usuario.rol !== rol){
            actualizarUsuario()
        }
    }, [rol, usuario])

    return (
        <>
            <tr className ="border-collapse border-2" >
                <td className = "border-2"> {usuario.name} </td>
                <td className = "border-2"> {usuario.email} </td>
                <td className = "border-2"> <select name="Rol" value={rol} 
                onChange={(e) => {setRol(e.target.value)}}>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Usuario">Usuario</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Admin">Admin</option>
                    </select></td>
            </tr>
        </>
)};

const Tabla = ({listaUsuarios}) => {
    const {search} = useSearch()
    const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);

    useEffect(() => {
        setUsuariosFiltrados(
        listaUsuarios.filter((elemento) => {
            return JSON.stringify(elemento).toLowerCase().includes(search.toLowerCase());
        })
        );
    }, [search, listaUsuarios]);
    
    return (
        <div className ="flex items-start" id="sacarTitle" title="USUARIOS REGISTRADOS">
            <table className = "table-auto tabla w-full" >
                <thead>
                    <tr className = "border-4 border-solid">
                        <th className = "border-2 text-left text-xl"> Nombre </th>
                        <th className = "border-2 text-left text-xl"> Correo </th>
                        <th className = "border-2 text-left text-xl"> Rol </th>
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
