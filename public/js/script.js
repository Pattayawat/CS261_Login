
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('btn'); 


const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');


loginForm.addEventListener('click', (e) => {
    let isValid = true;

    
    usernameError.textContent = '';
    passwordError.textContent = '';

    
    if (usernameInput.value.trim() === '') {
        usernameError.textContent = 'Please input username';
        usernameError.style.color = 'red';
        isValid = false;
    }

    
    if (passwordInput.value.trim() === '') {
        passwordError.textContent = 'Please input password';
        passwordError.style.color = 'red';
        isValid = false;
    }

    
    if (!isValid) {
        e.preventDefault(); 
    } else {
        
        submitLogin();
    }
});


function submitLogin() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-key': 'TU9d2e40823d89bb1d7077b146bbd5c3086fbdb07d9b81f66566b996837d897bd8262b9229d5d2dec5bc6d635c1d23854d'
        },
        body: JSON.stringify({ UserName:username, PassWord:password })
    })
    .then(response => response.json())
    .then(data => {
        const resultBox = document.getElementById("resultBox");
        const formBox = document.getElementById("wrp");
        resultBox.style.display = "block";
        formBox.classList.add("expanded")
        document.getElementById('message').innerText = "Result : " + data.message;
        document.getElementById('usernameResult').innerText = "Student ID : " + data.username;
        document.getElementById('displayname_en').innerText = "Student Name : " + data.displayname_en;
        document.getElementById('Status').innerText = "Status : " + data.type;
       
        
    })
    .catch(error => console.error('Error:', error));
}


const togglePasswordIcon = document.getElementById('toggle-password');


togglePasswordIcon.addEventListener('click', () => {
    const currentType = passwordInput.getAttribute('type');
    if (currentType === 'password') {
        passwordInput.setAttribute('type', 'text'); 
        togglePasswordIcon.classList.remove('bx-lock-alt'); 
        togglePasswordIcon.classList.add('bx-lock-open-alt'); 
    } else {
        passwordInput.setAttribute('type', 'password'); 
        togglePasswordIcon.classList.remove('bx-lock-open-alt'); 
        togglePasswordIcon.classList.add('bx-lock-alt'); 
    }
});
