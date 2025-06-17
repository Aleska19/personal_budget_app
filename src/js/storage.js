//Archivo reutilizable del local storage


export function guardarDatosEnStorage(clave, datos){
    localStorage.setItem(clave, JSON.stringify(datos));
}

export function obtenerDatosEnStorage(clave){
    return JSON.parse(localStorage.getItem(clave)) || [];
}