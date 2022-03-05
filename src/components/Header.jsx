import { useState, useEffect } from 'react';

import NuevoPresupuesto from './NuevoPresupuesto';
import ControlPresupuesto from './ControlPresupuesto';

const Header = ({presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos}) => {
  return (
    <header>
        <h1>Planificador de gastos</h1>
        
        {/*Carga condicional de componentes -  Validación del presupuesto - Si es válido, imprime el componente con todos los datos */}
        {isValidPresupuesto ? (
          <ControlPresupuesto
            setGastos={setGastos}
            gastos={gastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        ) : (
          <NuevoPresupuesto 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        )}
    </header>
  )
}

export default Header