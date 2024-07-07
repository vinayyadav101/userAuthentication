
let userData;

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('button');

    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();
                const payload = {
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value  
                };
            login(payload);
        });
    }
});

const login = async (payload)=>{
    try {
        const data = await fetch('http://localhost:8081/api/auth/signin' , {
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            credentials: 'include',
            body: JSON.stringify(payload)
        })
        
        const response = await data.json()

            if (response.success) {
                window.location.href = 'http://localhost:3000/user'
            }
    } catch (error) {
        console.log(error);
    }
}


