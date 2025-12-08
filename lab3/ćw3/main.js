const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const tableBody = document.getElementById("table-body");

let originalData = [];


async function fetchProducts() {
    try{
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();

        originalData = data.products.slice(0, 30);

        renderTable(originalData);
    } catch(error){
        console.error("Błąd pobierania danych:", error);
    }
    
}

function renderTable(products){
    tableBody.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td><img src="${product.thumbnail}" alt="${product.title}"/></td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        `
        
        tableBody.appendChild(row)
    });
}

function processData(){
    const searchText = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;

    let processedData = originalData.filter(product =>{
        return product.title.toLowerCase().includes(searchText);
    });

    if (sortValue === "asc"){
        processedData.sort((a,b) => a.title.localeCompare(b.title))
    } else if(sortValue === "desc"){
        processedData.sort((a,b) => b.title.localeCompare(a.title))

    }

    renderTable(processedData);
}

searchInput.addEventListener("input", processData);
sortSelect.addEventListener("change", processData);

fetchProducts();