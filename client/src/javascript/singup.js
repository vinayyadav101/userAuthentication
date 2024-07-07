
let submitButton = document.getElementById('submit')

submitButton.addEventListener('click' , (event)=>{

    event.preventDefault();

    const userData = {
        name:document.getElementById('name').value,
        email:document.getElementById('email').value,
        password:document.getElementById('password').value,
        confirmPassword:document.getElementById('confirmPassword').value,
        followers:document.getElementById('followers').value
    }
    
    singUp(userData)
})

const singUp = async (pyload) => {

    try {
        let error;
        const data = await fetch('http://localhost:8081/api/auth/signup',{
            method: 'post',
            headers : {"content-type":"application/json"},
            body: JSON.stringify(pyload)
        }).then( (res) =>{
            return res.json()
        }).then(data => error = data.success)

            if(error){
                location.reload()
                window.location.href = "http://localhost:3000/login"
            }
        
    } catch (error) {
        alert(error.message)
    }
}