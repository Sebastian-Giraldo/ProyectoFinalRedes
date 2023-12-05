export function createContainer(...types) {
    const container = document.createElement("div");
    container.classList.add(...types);
    return container;
}

export function createCardThumbnail(src) {
    const thumbnail = document.createElement("img");
    thumbnail.src = src;
    thumbnail.classList.add("card-img-top");
    return thumbnail;
}

export function createCardData(element, type, text) {
    const data = document.createElement(element);
    const isLongTitle = text.length > 40;

    if (isLongTitle) {
        data.classList.add("long-title");
    }

    data.classList.add(type);
    data.textContent = text;
    return data;
}

export function createRef(id) {
    return `recipe.html?i=${id}`;
}

export function createCardLink(href, ...types) {
    const button = document.createElement("a");
    button.classList.add(...types);
    button.href = href;
    button.textContent = "¡A cocinar!";
    return button;
}

export function addRecipes(recipes) {
    const recipesContainer = document.querySelector("#recipes-container");

    recipes.forEach((recipe, index) => {
        if (index % 4 === 0) {
            const row = createContainer("row");
            recipesContainer.appendChild(row);
        }

        const row = recipesContainer.lastElementChild;
        row.appendChild(recipe);
    });
}

export function appendChildren(parent, ...children) {
    children.forEach(child => parent.appendChild(child));
}
