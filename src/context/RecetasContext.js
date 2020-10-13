import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
  const [recetas, setRecetas] = useState([]);

  const [busquedaRecetas, setBusquedaRecetas] = useState({
    nombre: "",
    categoria: "",
  });

  // estado de la api
  const [consultar, setConsultar] = useState(false);

  const { nombre, categoria } = busquedaRecetas;

  useEffect(() => {
    if (consultar) {
      const obtenerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
        
        const resultado = await axios.get(url);
        setRecetas(resultado.data.drinks);

      };
      obtenerRecetas();
    }
  }, [busquedaRecetas]);

  return (
    <RecetasContext.Provider
      value={{
        recetas,
        setBusquedaRecetas,
        setConsultar,
      }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
