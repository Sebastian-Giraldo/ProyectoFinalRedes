// Obtener el ID de la receta desde la URL
const recipeURL = window.location.href;
const id = recipeURL.split('i=')[1];
const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

// Elementos del DOM
const containerMeal = document.getElementById("containerMeal");
const imgMeal = document.getElementById("imgMeal");
const textMeal = document.getElementById("textMeal");

const containerIngredients = document.getElementById("containerIngredients");
const textIngredients = document.getElementById("textIngredients");

const instructions = document.getElementById("instructions");

// Función para consumir la API y mostrar la receta
function consumeAPI(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      addMeal(meal);
      addIngredients(meal);
      addInstructions(meal);
    })
    .catch(error => {
      console.error("Error al consumir la API:", error);
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario
    });
}

// Función para mostrar la información principal de la receta
function addMeal(meal) {
  textMeal.textContent = meal.strMeal;
  imgMeal.src = meal.strMealThumb;
}

// Función para mostrar los ingredientes de la receta
function addIngredients(meal) {
  textIngredients.textContent = "Ingredientes";

  // Filtrar los ingredientes y las imágenes
  const ingredients = [];
  const imagesIngredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      let ingredient = meal[`strIngredient${i}`];
      ingredients.push(ingredient);
      imagesIngredients.push(`https://www.themealdb.com/images/ingredients/${ingredient}.png`);
    } else {
      break;
    }
  }

  // Crear elementos para cada ingrediente y agregarlos al contenedor
  imagesIngredients.forEach((image, position) => {
    const ingredientContainer = document.createElement('div');
    ingredientContainer.classList.add("w-50", "mx-auto");

    const ingredientText = document.createElement('p');
    ingredientText.style.textAlign = "center";
    ingredientText.textContent = ingredients[position];

    const ingredientImg = document.createElement("img");
    ingredientImg.classList.add("mx-auto");
    ingredientImg.style.display = "block";
    ingredientImg.src = image;
    ingredientImg.height = 80;

    ingredientContainer.appendChild(ingredientImg);
    ingredientContainer.appendChild(ingredientText);

    containerIngredients.appendChild(ingredientContainer);
  });
}

// Función para mostrar las instrucciones de la receta
function addInstructions(meal) {
  // Limpiar el contenedor de instrucciones
  instructions.innerHTML = "";

  // Dividir las instrucciones por párrafos y agregarlos a la lista
  meal.strInstructions.split(".").forEach(paragraph => {
    if (paragraph.trim() !== "") {
      let li = document.createElement("li");
      li.textContent = `${paragraph.trim()}.`;
      instructions.appendChild(li);
    }
  });
}

// Llamar a la función para mostrar la receta
consumeAPI(url);
