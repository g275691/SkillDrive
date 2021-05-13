export const onLogin = (mail, password, setServerErr, closeLogin, setLoginButtonLoad) => {
    setLoginButtonLoad(true);
    let data = {
        mail: mail, 
        password: password,
    }
    fetch("http://localhost:8000/users/auth/access", {
        method: 'POST',  
        headers: { 'Content-Type': 'application/json',
     },  
        body: JSON.stringify(data) })
    .then(response => { 
        setLoginButtonLoad(false)
        if(response.ok) {
            closeLogin(true);
            setServerErr(' ');
            
            return response.json()
            .then(response => {
                localStorage.setItem("accessToken", response.accessToken);
                localStorage.setItem("refreshToken", response.refreshToken);
            })
        } else {
            return response.text()
            .then(text => setServerErr(text))
        }
     } )
    .catch(err => {
        setLoginButtonLoad(false)
        console.log(err);
        setServerErr('Не удалось продолжить авторизацию. Попробуйте ещё раз');
    })
}