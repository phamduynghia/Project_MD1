// const signup = document.getElementById('signup')
// const na = document.getElementById('na')
// const te = document.getElementById('te')
// const em = document.getElementById('em')
// const formnew = document.getElementById('formnew')
// const password = document.getElementById('password');
// const confirmPassword = document.getElementById('confirm-password');
// const errorCategoryName = document.getElementById('error-category-name')
// const adnew = document.querySelector('#adnew');

// let categoryUpdate = null;

// signup.addEventListener('click', function () {
//     const profiles = JSON.parse(localStorage.getItem("PROFILE_LOCAL")) || []
//     let id = 1;
//     if (profiles.length > 0) {
//         id = profiles[profiles.length - 1].id + 1;
//     }

//     let profileCheck = checkErrors();
//     if (!profileCheck) {
//         return;
//     }
//     else {
//         Swal.fire({
//             position: "center",
//             icon: "success",
//             title: "đăng ký thành công",
//             showConfirmButton: false,
//             timer: 1500,
//         })
//     }

//     const profile = {
//         id,
//         Name: na.value,
//         Team: te.value,
//         Email: em.value,
//         password: password.value,
//         confirm_password: confirmPassword.value,
//     }
//     profiles.push(profile);
//     localStorage.setItem('PROFILE_LOCAL', JSON.stringify(profiles));

// })




// signup.addEventListener('click', function () {
//     const registerForm = signup.getElementById('register-form');
//     registerForm.addEventListener('submit', function (event) {
//         event.preventDefault();
//         const password = document.getElementById('password').value;
//         const confirmPassword = document.getElementById('confirm-password').value;
//         if (password !== confirmPassword) {
//             errorCategoryName.innerHTML = "mật khẩu nhập lại không trùng khớp"
//             return
//         } else {
//             errorCategoryName.innerHTML = ""
//         }
//     });
// });



document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const account = { name, email, password };
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts.push(account);
    localStorage.setItem('accounts', JSON.stringify(accounts));

    displayAccounts();
    document.getElementById('signupForm').reset();
});

function displayAccounts() {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const accountList = document.getElementById('accountList');
    accountList.innerHTML = '';

    accounts.forEach((account, index) => {
        const li = document.createElement('li');
        li.textContent = `Name: ${account.name}, Email: ${account.email}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteAccount(index);
        });
        li.appendChild(deleteButton);
        accountList.appendChild(li);
    });
}

function deleteAccount(index) {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts.splice(index, 1);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    displayAccounts();
}

displayAccounts();