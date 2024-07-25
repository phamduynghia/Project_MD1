const categoryProduct = document.getElementById('category-product')

const btnAdd = document.getElementById('btn-add')
const btnCancel = document.getElementById('btn-cancel')


btnAdd.onclick = function () {
    coating.style.display = "flex"
}

btnCancel.onclick = function () {
    coating.style.display = "none"
}

function renderCategory() {
    const categoryLocal = JSON.parse(localStorage.getItem('categories')) || []
    let stringHTML = ""
    for (let i = 0; i < categoryLocal.length; i++) {
        stringHTML +=
            `
            <option value=${categoryLocal[i].id}>${categoryLocal[i].name}</option>
        `
    }
    categoryProduct.innerHTML = stringHTML
}
renderCategory()