
let submitbutton = document.getElementById('button');
  
const nextFunction = (e)=>{
        e.preventDefault();
        forget()
}
const checkOtpFunction = (e) =>{
        e.preventDefault()
            const payload = {
                email : document.getElementById('email').value,
                otp : document.getElementById('otp').value
            }
        checkotp(payload)
}
const setPasswordFunction = (e)=>{
        e.preventDefault()
            const payload = {
            email : document.getElementById('email').value,
            password : document.getElementById('password').value,
            confirmPassword : document.getElementById('confirmPassword').value,
            }
        setPassword(payload)
}
    

submitbutton.addEventListener('click' , nextFunction);


const forget = async () => {

        const email = {
            email :document.getElementById('email').value
        }

        try {
            const data = await fetch('http://localhost:8081/api/auth/sendOTP' , {
                method:'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(email)
            })
    
            const response = await data.json()

                if (response.success) {

                    document.getElementById('otp').classList.remove('hiden')
                    submitbutton.removeEventListener('click' , nextFunction);
                    submitbutton.addEventListener('click' ,checkOtpFunction)

                }
        } catch (error) {
            console.log(error);
        }
}

const checkotp = async(payload) => {
        
        try {
            const check = await fetch('http://localhost:8081/api/auth/checkOTP', {
                method:'post',
                headers:{"content-Type" : "application/json"},
                body: JSON.stringify(payload)
            })
    
            const response = await check.json();
    
                if (response.success) {

                    document.getElementById('email').classList.add('hiden')
                    document.getElementById('otp').classList.add('hiden')
                    document.getElementById('password').classList.remove('password')
                    document.getElementById('confirmPassword').classList.remove('password')

                    submitbutton.removeEventListener('click' , checkOtpFunction)
                    submitbutton.addEventListener('click' , setPasswordFunction)
                
                }
        } catch (e) {
            console.log(e.message);
        }
}

const setPassword = async (payload)=>{

    try {
        const data = await fetch('http://localhost:8081/api/auth/forgetPassword' ,{
            method : "post",
            headers :{"content-Type" :"application/json"},
            body : JSON.stringify(payload)
        })

        const response = await data.json()

        if (response.success) {
            alert('user password change successfuly')
            
                if (alert) {
                    document.getElementById('email').value =null
                    document.getElementById('otp').value = null
                    document.getElementById('password').value = null
                    document.getElementById('confirmPassword').value = null
                    window.location.href = "http://localhost:3000/login"
                }
        }

    } catch (error) {
        console.log(error.message);
    }
}
