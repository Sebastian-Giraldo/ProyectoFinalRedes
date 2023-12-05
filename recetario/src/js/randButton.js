const results = document.getElementById('results');
const randomButton = document.getElementById('randomBtn');
const searchButton = document.getElementById('searchBtn');

// Asignamos eventos a los botones
randomButton.addEventListener('click', searchRand);
searchButton.addEventListener('click', search);

// Contenedor de recetas
let recetasContenedor = document.querySelector("#recetas-container");
// Contenedor de ingredientes
let ingredientesContenedor = document.querySelector("#ingredientes-container");

// Recuperación de lista de recetas
fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
    .then(response => response.json())
    .then(data => {
        // Mostramos las recetas en el contenedor
        data['meals'].forEach(receta => {
            let card = createCardCategoria(receta);
            recetasContenedor.appendChild(card);
        })
    })
    .catch(error => console.log(error));

// Función para crear una tarjeta de receta
const createCardCategoria = (receta) => {
    let card = document.createElement("div")
    card.classList.add("card");

    let imagenReceta = document.createElement("img")
    imagenReceta.src = receta["strMealThumb"]

    let nombrePlatillo = document.createElement("h2");
    nombrePlatillo.textContent = receta["strMeal"];

    card.appendChild(imagenReceta);
    card.appendChild(nombrePlatillo);

    return card
}

// Recuperación de lista de ingredientes
fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then(response => response.json())
    .then(data => {
        // Mostramos los ingredientes en el contenedor
        for (let i = 0; i < 4; i++) {
            let ingrediente = data['meals'][i];
            let card = createCardIngrediente(ingrediente)
            ingredientesContenedor.appendChild(card);
        }
    })
    .catch(error => console.log(error));

// Función para crear una tarjeta de ingrediente
const createCardIngrediente = (ingrediente) => {
    let card = document.createElement("div")
    card.classList.add("card");

    let nombreIngrediente = document.createElement("h2");
    nombreIngrediente.textContent = ingrediente["strIngredient"];

    card.appendChild(nombreIngrediente);

    return card
}

// Función para buscar una receta aleatoria
function searchRand() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let meal = data.meals[0]
            let title = meal.strMeal
            let inst = meal.strInstructions
            let img = meal.strMealThumb
            let ingArray = []

            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`]) {
                    ingArray.push(meal[`strIngredient${i}`])
                } else break;
            }

            // Creamos la estructura HTML para mostrar la receta
            results.innerHTML = `
                <h3>${title}</h3>
                <img src="${img}" alt="${title}">
                <div>${inst}</div>
                <div>
                    <h5>Ingredientes:</h5>
                    <ul>
                        ${ingArray.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>`;
        })
}

// Función para realizar una búsqueda
function search() {
    let searchInput = document.getElementById('searchInput').value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let meals = data.meals
            let bloques = []

            if (meals == null) {
                results.innerHTML = '<h3 class="mt-4 mb-5">No se encontraron resultados</h3>'
            } else {
                let gridHTML = `<h3 class="mt-4 mb-5">Resultados de la búsqueda</h3>    
                                <div class="row row-cols-1 row-cols-md-4 g-4" id= "grid">`

                bloques.push(gridHTML)

                for (let i = 0; i < meals.length; i++) {
                    let meal = meals[i]
                    let title = meal.strMeal
                    let img = meal.strMealThumb

                    let currentHTML =
                        `
                        <div class="mb-4 col">
                            <div class="card border-0 rounded-3 bg-light text-center h-100">
                                <a href="#" class="text-decoration-none text-reset">
                                    <img src="${img}" class="card-img-top" alt="${title}">
                                    <div class="card-body">
                                        <h5 class="card-title">${title}</h5>
                                    </div>
                                </a>
                            </div>
                        </div>
                        `
                    bloques.push(currentHTML)
                }

                gridHTML = '</div>'
                bloques.push(gridHTML)

                results.innerHTML = bloques.join('')
            }
        })
}
