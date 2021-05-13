export const onSubmit = (name, password, birthday, mail, phone, 
    passport, passportDate, passportOrgan, passportCode, 
    driver, driverDate, isValid,
    setWarning, setSubmitActive, setErrMail, linkActive) => {

    setSubmitActive(true);
    
    if (!isValid) {
        setWarning("Данные введены некорректно");
        setSubmitActive(false);
        setTimeout(() => { setWarning(''); }, 3000);
    } else {
    
    let data = {
        name: name,
        password: password,
        birthday: birthday,
        mail: mail,
        phone: phone,
        passport: passport,
        passportDate: passportDate,
        passportOrgan: passportOrgan,
        passportCode: passportCode,
        driver: driver,
        driverDate: driverDate
};

fetch("http://localhost:8000/users", {
    method: 'POST',  
    headers: { 'Content-Type': 'application/json' },  
    body: JSON.stringify(data) })
.then(response => {
    setSubmitActive(false);
    console.log(response);
    setTimeout(() => {
        setWarning(false);     
    }, 2000);
    if(response.status == 400) { setWarning("Server: Данные введены некорректно") }
    else if(response.status == 401) { 
        setWarning("Такой почтовый ящик уже зарегистрирован");
        setErrMail("Почта уже зарегистрирована"); }
    else if(response.status == 200) { 
        linkActive(true);
} })
.catch(err => {
    setSubmitActive(false);
    console.log(err);
    setTimeout(() => {
        setWarning(false);
    }, 2000);
    if(err.message == "Failed to fetch") { setWarning("Не удалось продолжить регистрацию. Попробуйте ещё раз") }
} );
}}