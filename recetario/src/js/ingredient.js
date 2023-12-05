// Importamos funciones y objetos desde módulos externos
import {
    createContainer,
    createCardThumbnail,
    createCardData,
    createRef,
    createCardLink,
    addRecipes,
    appendChildren,
} from './htmlNodes';

import { showLoadingBar, hideLoadingBar } from './loadingBar';

// Seleccionamos el contenedor de recetas y obtenemos el nombre del ingrediente de la URL
const recipesContainer = document.querySelector("#recipes-container");
const url = window.location.href;
const ingredientName = url.split('i=')[1];

// Mostramos la barra de carga antes de realizar la solicitud de recetas
showLoadingBar("#recipes-container");

// Realizamos una solicitud para obtener recetas basadas en el ingrediente
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data["meals"] === null) {
            // Si no hay recetas disponibles, ocultamos la barra de carga y mostramos un mensaje
            hideLoadingBar();
            showNoIngredientMessage();
        } else {
            // Si hay recetas, mostramos el ingrediente y creamos los nodos de las recetas
            showIngredient();
            createRecipesNodes(data["meals"]);
        }
    })
    .catch(function (error) {
        console.log(error);
    });

// Función para mostrar un mensaje cuando no hay recetas disponibles para el ingrediente
const message = document.querySelector("#message");

function showNoIngredientMessage() {
    message.style.display = "block";
}

// Funciones para mostrar el ingrediente y capitalizar su nombre
function showIngredient() {
    const heading = document.querySelector("h1");
    heading.textContent = capitalize(ingredientName);
}

function capitalize(name) {
    return (name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).split('_').join(" ");
}

// Función para crear y mostrar nodos de recetas en el DOM
function createRecipesNodes(meals) {
    let recipes = [];

    meals.forEach(meal => {
        // Creamos elementos para representar cada receta
        let recipe = createContainer("col-sm-12", "col-md-6", "col-lg-3");
        let card = createContainer("card", "card-short", "mx-auto");
        let body = createContainer("card-body");

        // Creamos nodos para los datos de la receta
        let thumbnail = createCardThumbnail(meal["strMealThumb"]);
        let title = createCardData("h2", "card-title", meal["strMeal"]);
        let button = createCardLink(createRef(meal["idMeal"]), "btn", "btn-primary");
        let buttonContainer = document.createElement("p");

        // Agregamos los nodos al contenedor
        buttonContainer.classList.add("button-container");
        buttonContainer.appendChild(button);
        appendChildren(body, title, buttonContainer);
        appendChildren(card, thumbnail, body);
        recipe.appendChild(card);

        recipes.push(recipe); // Agregamos la receta al conjunto de recetas
    });

    // Ocultamos la barra de carga y añadimos las recetas al contenedor
    hideLoadingBar();
    addRecipes(recipes, recipesContainer);
}
