// Seleccionamos el elemento con el ID 'grid' en el DOM
const grid = document.getElementById('grid');

// Realizamos una solicitud para obtener la lista de ingredientes
fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // Extraemos la lista de ingredientes del objeto de datos
        let meals = data.meals;

        // URL base para las imágenes de los ingredientes
        let url = "https://www.themealdb.com/images/ingredients/";

        // Array para almacenar los bloques de HTML de cada ingrediente
        let bloques = [];

        // Iteramos sobre los primeros 36 ingredientes (o el total si hay menos)
        for (let i = 0; i < Math.min(36, meals.length); i++) {
            // Extraemos información del ingrediente actual
            let ingred = meals[i];
            let id = ingred.idIngredient;
            let name = ingred.strIngredient;
            let desc = ingred.strDescription;

            // Construimos la URL completa de la imagen del ingrediente
            let complete_url = url + name + ".png";

            // Creamos el HTML para el ingrediente actual y lo agregamos al array
            let currentHTML =
                `
                <div class="mb-4 col">
                    <div class="card card-ingredient border-0 rounded-3 bg-light text-center h-100">
                        <a href="./ingredient.html?i=${name}" class="text-decoration-none text-reset">
                            <img src="${complete_url}" class="card-img-top"
                                alt="${name}">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                            </div>
                        </a>
                    </div>
                </div>
                `;
            bloques.push(currentHTML);
        }

        // Asignamos el HTML al elemento 'grid'
        grid.innerHTML = bloques.join('');
    });
