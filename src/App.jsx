import { useState, useEffect } from 'react';

import Header from './components/Header'; 
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
    const [presupuesto, setPresupuesto] = useState(
      Number(localStorage.getItem("presupuesto" ))  ?? 0 
    );
    const [gastos, setGastos] = useState(
      localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
    );
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [gastoEditar, setGastoEditar] = useState({});
    const [filtro, setFiltro] = useState("");
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

    /* Carga los datos en el modal cuando se quiere editar el mismo */
    useEffect(() => {
      if( Object.keys(gastoEditar).length > 0){
        setModal(true)
  
        setTimeout(() => {
          setAnimarModal(true)
        }, 500);
      }
    }, [gastoEditar]);

    /* Conexión con LocalStorage */
    useEffect(() => {
      localStorage.setItem("presupuesto", presupuesto ?? 0 )
    }, [presupuesto]);

    /* Effect para los gastos en el LocalStorage */
    useEffect(() => {
      localStorage.setItem("gastos", JSON.stringify(gastos) ?? 0 )
    }, [gastos]);

    useEffect(() => {
      const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;

      if(presupuestoLS > 0 )
        setIsValidPresupuesto(true)
    }, []);

    /* Cambios que sucedan en "filtro" */
    useEffect(() => {
      if(filtro){
        const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
        setGastosFiltrados(gastosFiltrados)
      }
    }, [filtro]);
    /* Cierre de useEffect */

    /* Funciones */
    const handleNuevoGasto = () => {
      setModal(true)
      setGastoEditar({})  /* reinicia el modal cuando no se quiere editar */

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }

    const guardarGasto = (gasto) => {
       if(gasto.id){
          //Actualizar
          const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState);
          setGastos(gastosActualizados);
          setGastoEditar({})
       }else{
         //Nuevo gasto
         gasto.id = generarId();
         gasto.fecha = Date.now();
         setGastos([...gastos, gasto])
       }

        //Cierra el modal una vez cargado un gasto
        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const eliminarGasto = id =>{
      const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
      
      setGastos(gastosActualizados);
    }
    /* Cierre de Funciones */

    return (
      /* Añade el modal a la pantalla completa con la clase fijar */
      <div className={modal ? "fijar" : ""}>
        <Header
          setGastos={setGastos}
          gastos={gastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />

        {/* Icono para añadir un nuevo gasto */}
        {isValidPresupuesto && (
          <>
            <main>
              <Filtros 
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos 
                setGastoEditar={setGastoEditar}
                gastos={gastos}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              /> 
            </main>
            <div className='nuevo-gasto'>
              <img 
                src={IconoNuevoGasto} 
                alt="icono"
                onClick={handleNuevoGasto}
              />
            </div>
          </>
        )}

        {modal && <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}  
                    setGastoEditar={setGastoEditar}
                  />}

      </div>
    )
}

export default App
