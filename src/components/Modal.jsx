import { useState, useEffect } from 'react';
import CerrarBtn from "../img/cerrar.svg";
import Mensaje from './Mensaje';

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [fecha, setFecha] = useState("");
    const [id, setId] = useState("");


    /* Carga en el modal todos los datos cuando se hace swipe para editar */
    useEffect(() => {
        if( Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }
    }, []);

    //Cierra el modal cuando se hace clic en el icono X
    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    //Validación del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if([nombre, cantidad, categoria].includes("")){
            setMensaje("Todos los campos son obligatorios");

            setTimeout(() => {
                setMensaje("")
            }, 3000);
            return;
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img 
                src={CerrarBtn} 
                alt="icono"
                onClick={ocultarModal}
                />
            </div> 

            <form
                onSubmit={handleSubmit}  
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}               
            >
                <legend>{gastoEditar.nombre ? "Editar gasto" : "Nuevo gasto"}</legend>

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}  

                <div className='campo'>
                    <label htmlFor="nombre">Nombre del gasto</label>
                    <input
                        id='nombre'
                        type="text" 
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={event => setNombre(event.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id='cantidad'
                        type="number" 
                        placeholder='Añade la cantidad'
                        value={cantidad}
                        onChange={event => setCantidad(Number(event.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Categoría</label>
                    <select 
                        id="categoria"
                        value={categoria}
                        onChange={event => setCategoria(event.target.value)} 
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Tiempo libre</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input 
                    type="submit" 
                    value={gastoEditar.nombre ? "Guardar cambios" : "Añadir gasto"}
                />

                
            </form>
        </div>
    )
}

export default Modal