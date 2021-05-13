export const onResetPassword = (validPass, setValidPassErr, setPassErr, setRepeatPassErr, 
    setResetPassSuccess, setServerErr, setMailErr, mail, pass) => {
    
    if(!validPass) {
        setValidPassErr(true);
        setPassErr(true);
        setRepeatPassErr(true);
        return;
    } else {
        setValidPassErr(false);
    };
    let data = {
        mail: mail,
        password: pass
    }
    fetch(`http://localhost:8000/users/auth/pass-reset${document.location.search}`, {
        method: 'POST',  
        headers: { 'Content-Type': 'application/json', },  
     body: JSON.stringify(data) })
        .then(response => {
            if(response.ok) {
                setResetPassSuccess(true);
                setServerErr(" ");
                return response.json()
                .then(response => {
                    localStorage.setItem("accessToken", response.accessToken);
                    localStorage.setItem("refreshToken", response.refreshToken);
                })
            } else {
                return response.text()
                .then(text => {
                    setServerErr(text);
                    text == "Такая почта не зарегистрирована" || text == "Запроса на сброс пароля от вас не поступало" ?
                    setMailErr(true) : setMailErr(false);
                    if(text == "Новый пароль должен отличаться от старого") 
                    { setPassErr(true); setRepeatPassErr(true) } 
                    else { setPassErr(false); setRepeatPassErr(false) };
                })
            }
        })
        .catch(()=>setServerErr("Не удалось продолжить сброс пароля. Попробуйте ещё раз"))
}