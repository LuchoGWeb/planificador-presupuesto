import { useState, useEffect } from 'react';

const Filtros = ({filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label>Filtrar gastos</label>
                <select 
                    value={filtro}
                    onChange={event => setFiltro(event.target.value)}
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
        </form>
    </div>
  )
}

export default Filtros