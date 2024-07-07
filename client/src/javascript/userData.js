
const userData = async() => {
    try {
        const data = await fetch ('http://localhost:8081/api/auth/user',{
            method : 'GET',
            credentials : "include",
        })
        const response = await data.json()

        updateData(response.data)

    } catch (e) {
        console.log(e);
    }
}

userData()

const updateData = (data)=> {
    document.getElementById('userName').innerText = data.name
    document.getElementById('email').innerText = data.email
    document.getElementById('followers').innerText = data.followers
}

const logout = async() => {
     try {
        const removeCookie = await fetch('http://localhost:8081/api/auth/logout',{
            method : 'post',
            credentials: 'include'
        })
   const data= await removeCookie.json()
   if (data.success) {
        alert('user logout success')
        
        if (alert) {
            document.getElementById('userName').innerText =null
            document.getElementById('email').innerText = null
            document.getElementById('followers').innerText = null
            window.location.href = "http://localhost:3000/login"
            
        }
        
   }
       
     } catch (e) {
        console.log(e);
     }
}