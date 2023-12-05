const grid = document.getElementById('grid');

const flags = ["us", "gb", "ca", "cn", "hr", "nl", "eg", "fr", "gr", "in",
    "ie", "it", "jm", "jp", "ke", "my", "mx", "ma", "pl", "pt",
    "ru", "es", "th", "tn", "tr", "eu", "vn"
];

const fetchData = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const data = await response.json();

        if (!data || !data.meals) {
            throw new Error('Invalid data format');
        }

        return data.meals;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

const buildHTML = (countries) => {
    return countries.map((country, index) => {
        const countryName = country.strArea;
        return `
            <div class="mb-5 col">
                <div class="card border-0 rounded-3 bg-light text-center">
                    <a href="javascript:void(0)" class="text-decoration-none text-reset">
                        <img src="https://www.countryflags.io/${flags[index]}/flat/64.png" class="card-img-top"
                            alt="${countryName}" style="max-width: 64px">
                        <div class="card-body">
                            <h5 class="card-title">${countryName}</h5>
                        </div>
                    </a>
                </div>
            </div>
        `;
    }).join('');
};

const renderCountries = async () => {
    const countries = await fetchData();
    const htmlContent = buildHTML(countries);
    grid.innerHTML = htmlContent;
};

// Llamada a la función para renderizar países al cargar la página
renderCountries();
