export const onPassRecovery = (mail, setServerErr, setMailSend, setForgetPass, setLoginButtonLoad) => {
   setLoginButtonLoad(true);
   fetch("http://localhost:8000/users/auth/pass-recovery", {
        method: 'POST',  
        headers: { 'Content-Type': 'application/json',
     },  
        body: JSON.stringify({mail: mail}) })
     .then(data => {
      setLoginButtonLoad(false) 
         if(data.ok) {
            return data.text()
            .then(data => {
                setServerErr(" ");
                console.log(data);
                setMailSend(true);
                setForgetPass(false);
            })
         } else {
            return data.text()
            .then(text => setServerErr(text))
         }
     })
     .catch(err => {
      setLoginButtonLoad(false)
      console.log(err);
      setServerErr('Не удалось продолжить авторизацию. Попробуйте ещё раз');
  })
}