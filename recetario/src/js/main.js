// Seleccionamos los contenedores de recetas e ingredientes
const recetasContenedor = document.querySelector("#recetas-container");
const ingredientesContenedor = document.querySelector("#ingredientes-container");

// Seleccionamos el botón de búsqueda y le añadimos un event listener
const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', search);

// Recuperación de la lista de recetas
fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
    .then(response => response.json())
    .then(data => displayRecetas(data['meals']))
    .catch(error => console.error(error));

// Función para mostrar recetas en el contenedor correspondiente
function displayRecetas(meals) {
    let row = document.createElement("div");
    row.classList.add("row");

    meals.forEach(receta => {
        let card = createCardCategoria(receta);
        row.appendChild(card);
    });

    recetasContenedor.appendChild(row);
}

// Función para crear una tarjeta de receta
function createCardCategoria(receta) {
    let container = document.createElement("div");
    let card = document.createElement("div");

    container.classList.add("col-sm-12");
    container.classList.add("col-md-6");
    container.classList.add("col-lg-3");

    card.classList.add("card");
    card.classList.add("card-recipe");
    card.classList.add("mx-auto");
    card.style.minHeight = "450px";

    let imgReceta = document.createElement("img");
    imgReceta.style.maxWidth = "100%";
    imgReceta.src = receta["strMealThumb"];

    let link = document.createElement("a");
    link.href = `recipe.html?i=${receta.idMeal}`;
    link.classList.add("text-decoration-none");
    link.classList.add("text-reset");

    let nombrePlatillo = document.createElement("h2");
    nombrePlatillo.textContent = receta["strMeal"];
    nombrePlatillo.classList.add("title-index");
    nombrePlatillo.style.textAlign = "center";

    let button = document.createElement("a");
    button.href = createRef(receta["idMeal"]);
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.textContent = "¡A cocinar!";

    let buttonContainer = document.createElement("p");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(button);

    card.appendChild(imgReceta);
    card.appendChild(nombrePlatillo);
    card.appendChild(buttonContainer);
    container.appendChild(card);

    let imagenReceta = document.createElement("img");
    imagenReceta.classList.add("mw-100");
    imagenReceta.src = receta["strMealThumb"];

    return container;
}

// Función para crear un enlace de receta
function createRef(id) {
    return `recipe.html?i=${id}`;
}

// Recuperación de lista de ingredientes
fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then(response => response.json())
    .then(data => displayIngredientes(data['meals'].slice(0, 4)))
    .catch(error => console.error(error));

// Función para mostrar ingredientes en el contenedor correspondiente
function displayIngredientes(ingredientes) {
    ingredientes.forEach(ingrediente => {
        let card = createCardIngrediente(ingrediente);
        ingredientesContenedor.appendChild(card);
    });
}

// Función para crear una tarjeta de ingrediente
function createCardIngrediente(ingrediente) {
    let card = document.createElement("div");
    let nombreIngrediente = ingrediente["strIngredient"];

    card.classList.add("card");
    card.classList.add("card-ingredient");
    card.style.marginTop = "35px";

    let link = document.createElement("a");
    link.href = `ingredient.html?i=${nombreIngrediente}`;
    link.classList.add("text-decoration-none");
    link.classList.add("text-reset");

    let tituloIngrediente = document.createElement("h2");
    tituloIngrediente.textContent = nombreIngrediente;

    let imagenIngrediente = document.createElement("img");
    let urlImagen = `https://www.themealdb.com/images/ingredients/${nombreIngrediente}.png`;
    imagenIngrediente.src = urlImagen;
    imagenIngrediente.style.maxWidth = "100%";

    link.appendChild(imagenIngrediente);
    link.appendChild(tituloIngrediente);
    card.appendChild(link);

    return card;
}

// Funcionamiento del botón random
const randomButton = document.querySelector("#random-button");
randomButton.addEventListener('click', redirectToRandomRecipe);

// Función para redirigir a una receta aleatoria
function redirectToRandomRecipe() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const id = meal["idMeal"];
            location.href = `./recipe.html?i=${id}`;
        })
        .catch(error => console.error(error));
}

// Manejo de eventos para cambiar de página
const btnRecipes = document.querySelector("#btn-recipes");
const btnIngredients = document.querySelector("#btn-ingredients");

btnRecipes.addEventListener('click', () => changePage("./recipes.html"));
btnIngredients.addEventListener('click', () => changePage("./ingredients.html"));

// Función para cambiar de página
function changePage(url) {
    location.href = url;
}

// Función de búsqueda
function search() {
    const searchInput = document.getElementById('searchInput').value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(response => response.json())
        .then(data => displaySearchResults(data.meals))
        .catch(error => console.error(error));
}

// Función para mostrar resultados de búsqueda
function displaySearchResults(meals) {
    const results = document.getElementById('results');
    
    let bloques = [];

    if (!meals || meals.length === 0) {
        bloques.push('<h3 class="mt-4 mb-5">No se encontraron resultados</h3>');
    } else {
        let gridHTML = `<h3 class="mt-4 mb-5">Resultados de la búsqueda</h3>    
                        <div class="row row-cols-1 row-cols-md-4 g-4" id="grid">`;

        bloques.push(gridHTML);

        meals.forEach(meal => {
            let currentHTML = `
                <div class="mb-4 col">
                    <div class="card border-0 rounded-3 bg-light text-center h-100">
                        <a href="./recipe.html?i=${meal.idMeal}" class="text-decoration-none text-reset">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body">
                                <h5 class="card-title">${meal.strMeal}</h5>
                            </div>
                        </a>
                    </div>
                </div>`;
            bloques.push(currentHTML);
        });

        bloques.push('</div>');
    }

    results.innerHTML = bloques.join('');
}
