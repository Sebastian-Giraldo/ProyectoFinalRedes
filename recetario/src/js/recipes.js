// Importaciones de funciones y módulos
import {
    createContainer, 
    createCardThumbnail,
    createCardData,
    createRef,
    createCardLink,
    addRecipes,
    appendChildren,
} from './htmlNodes'

import { showLoadingBar, hideLoadingBar } from './loadingBar'

// Obtener todos los elementos de letra en la página
let letters = document.querySelectorAll(".page-link")

// Asignar un evento de clic a cada letra
letters.forEach(letter => {
    letter.addEventListener('click', (e) => {
        // Actualizar la interfaz de usuario para informar al usuario que se recibió su indicación
        showLoadingBar("#recipes-container")
        hideNoRecipesMessage()
        setActive(e.target)

        // Obtener la letra y realizar la petición
        let letterChar = e.target.textContent.toLowerCase()

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letterChar}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // Mostrar las recetas o informar al usuario que no hay
            if(data["meals"] === null) {
                hideLoadingBar()
                showNoRecipesMessage()
            } else createRecipesNodes(data["meals"])
        })
        .catch(function (error) {
            console.log(error)
        })
    })
})

// Elemento de mensaje de que no se encontraron recetas
const message = document.querySelector("#message")

// Mostrar mensaje de que no se encontraron recetas
function showNoRecipesMessage() {
    message.style.display = "block"
}

// Ocultar mensaje de que no se encontraron recetas
function hideNoRecipesMessage() {
    message.style.display = "none"
}

// Activar botón de letra seleccionada
function setActive(button) {
    let letters = document.querySelectorAll(".page-item")

    // Desactivar otros botones
    letters.forEach(letter => {
        if (letter.classList.contains("active")) {
            letter.classList.remove("active")
        }
    })

    // Activar el botón seleccionado
    button.parentNode.classList.add("active")
}

// Crear y mostrar las recetas
function createRecipesNodes(meals) {
    let recipes = []

    meals.forEach(meal => {
        // Crear un contenedor por cada platillo
        let recipe = createContainer("col-sm-12", "col-md-6", "col-lg-3")
        let card = createContainer("card", "card-recipe", "card-long", "mx-auto")
        let body = createContainer("card-body")

        // Crear los nodos de los datos
        let thumbnail = createCardThumbnail(meal["strMealThumb"])
        let title = createCardData("h2", "card-title", meal["strMeal"])
        let category = createCardData("p", "card-text", meal["strCategory"])
        let area = createCardData("p", "card-text", meal["strArea"])
        let button = createCardLink(createRef(meal["idMeal"]), "btn", "btn-primary")
        let buttonContainer = document.createElement("p")

        // Agregar los datos a la tarjeta
        buttonContainer.classList.add("button-container")
        buttonContainer.appendChild(button)

        appendChildren(body, title, category, area, buttonContainer)
        appendChildren(card, thumbnail, body)
        
        recipe.appendChild(card)
        
        recipes.push(recipe) // Agregar la receta al conjunto de recetas
    }) 

    hideLoadingBar()
    addRecipes(recipes)
}

// Mostrar las recetas que comienzan con "A" al cargar la página
const recipesA = document.querySelector("#a-button")
const click = new Event('click')
recipesA.dispatchEvent(click)
