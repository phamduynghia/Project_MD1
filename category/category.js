const categoryName = document.getElementById('category-name')
const errorCategoryName = document.getElementById('error-category-name')
const coating = document.getElementById('coating')
const listCategory = document.getElementById('list-category')
const titleForm = document.getElementById('title-form')
const sortCategory = document.getElementById('sort-category')

const btnSubmit = document.getElementById('btn-submit')
const btnAdd = document.getElementById('btn-add')
const btnCancel = document.getElementById('btn-cancel')


let categoryUpdate = null;

btnAdd.onclick = function () {
    coating.style.display = "flex"
}

btnCancel.onclick = function () {
    titleForm.innerHTML = "Add Category"
    categoryName.value = ""
    errorCategoryName.innerHTML = ""
    coating.style.display = "none"
}

btnSubmit.addEventListener('click', function () {
    const categoryLocal = JSON.parse(localStorage.getItem("categories")) || []

    let id = 1
    if (categoryLocal.length > 0) {
        id = categoryLocal[categoryLocal.length - 1].id + 1
    }

    const newCategory = {
        id: id,
        name: categoryName.value.trim()
    }

    if (!newCategory.name) {
        errorCategoryName.innerHTML = "Chua nhap ten"
        return
    } else {
        errorCategoryName.innerHTML = ""
    }


    if (categoryUpdate) {

        let index = categoryLocal.findIndex(el => el.name.toLowerCase() == newCategory.name.toLowerCase())
        if (index !== -1 && categoryLocal[index].id !== categoryUpdate.id) {
            errorCategoryName.innerHTML = "Ten bi trung"
            return
        } else {
            errorCategoryName.innerHTML = ""
        }

        const indexUpdate = categoryLocal.findIndex(el => el.id == categoryUpdate.id)
        categoryLocal[indexUpdate].name = newCategory.name
        localStorage.setItem('categories', JSON.stringify(categoryLocal))
        btnCancel.onclick()
        renderCategory()
    }

    let index = categoryLocal.findIndex(el => el.name.toLowerCase() == newCategory.name.toLowerCase())
    if (index !== -1) {
        errorCategoryName.innerHTML = "Ten bi trung"
        return
    } else {
        errorCategoryName.innerHTML = ""
    }


    categoryLocal.push(newCategory)
    localStorage.setItem('categories', JSON.stringify(categoryLocal))

    btnCancel.onclick()
    renderCategory()
})

function renderCategory() {
    const categoryLocal = JSON.parse(localStorage.getItem("categories")) || []


    if (sortCategory.value == 'aes') {
        categoryLocal.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortCategory.value == 'des') {
        categoryLocal.sort((a, b) => b.name.localeCompare(a.name))
    }

    let stringHTMl = ""
    for (let i = 0; i < categoryLocal.length; i++) {
        stringHTMl +=
            `
            <tr>
                <td>${i + 1}</td>
                <td>${categoryLocal[i].id}</td>
                <td>${categoryLocal[i].name}</td>
                <td>
                    <button onclick="enterEdit(${categoryLocal[i].id})" >Edit</button>
                    <button onclick="deleteCategory(${categoryLocal[i].id})" >Delete</button>
                </td>
            </tr>
        `
    }
    listCategory.innerHTML = stringHTMl
}
renderCategory()

function deleteCategory(idDelete) {
    if (confirm("Xoa")) {
        const categoryLocal = JSON.parse(localStorage.getItem("categories")) || []
        const indexDelete = categoryLocal.findIndex(el => el.id === idDelete)
        categoryLocal.splice(indexDelete, 1)
        localStorage.setItem('categories', JSON.stringify(categoryLocal))
        renderCategory()
    }
}

function enterEdit(idEdit) {
    const categoryLocal = JSON.parse(localStorage.getItem("categories")) || []
    const categoryEdit = categoryLocal.find(el => el.id === idEdit)

    categoryName.value = categoryEdit.name

    categoryUpdate = categoryEdit
    titleForm.innerHTML = "Edit Category"

    btnAdd.onclick()
}

sortCategory.onclick = function () {
    renderCategory()
}