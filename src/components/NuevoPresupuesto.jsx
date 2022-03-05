import { useState, useEffect } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
    const [mensaje, setMensaje] = useState("");

    const handlePresupuesto = (event) => {
        event.preventDefault();

        //Validación de presupuestos
        if (!presupuesto || presupuesto < 0) {
            setMensaje("No es un presupuesto válido");
            return; //No se ejecutan las siguientes lineas 
        }
        setMensaje(""); //Quita el mensaje una vez que se carga un presupuesto válido
        setIsValidPresupuesto(true);
    }
    

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
       <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label htmlFor="">
                    Definir presupuesto
                </label>
                <input 
                    type="number" 
                    className='nuevo-presupuesto'
                    placeholder='Ingresa tu presupuesto'
                    value={presupuesto}
                    onChange={event => setPresupuesto(Number(event.target.value))} //Tomo el valor que cargue el usuario 
                />
            </div>
            <input 
                type="submit" 
                value="Añadir"
            />

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
       </form>
    </div>
  )
}

export default NuevoPresupuesto