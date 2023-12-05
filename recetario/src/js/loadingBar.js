/**
 * Muestra la barra de carga y oculta las recetas existentes.
 * @param {string} containerId - Identificador del contenedor donde se mostrará la barra de carga.
 */
export function showLoadingBar(containerId) {
    let container = document.querySelector(containerId);
    let loader = document.querySelector("#loader");
    let rows = document.querySelectorAll(".row");

    // Eliminamos las recetas existentes
    rows.forEach(row => container.removeChild(row));

    if (loader) {
        // Si el loader ya existe, reiniciamos la animación y lo mostramos
        loader.style.animationIterationCount = "infinite";
        loader.style.display = "block";
    } else {
        // Si no existe el loader, lo creamos
        createLoadingBar(containerId);
    }
}

/**
 * Crea la barra de carga y la añade al contenedor especificado.
 * @param {string} containerId - Identificador del contenedor donde se añadirá la barra de carga.
 */
function createLoadingBar(containerId) {
    let container = document.querySelector(containerId);
    let loader = document.createElement("div");

    loader.classList.add("loader");
    loader.id = "loader";
    container.appendChild(loader);
}

/**
 * Oculta la barra de carga.
 */
export function hideLoadingBar() {
    let loader = document.querySelector("#loader");

    // Ocultamos y detenemos la animación de la barra de carga
    loader.style.display = "none";
    loader.style.animationIterationCount = "0";
}
