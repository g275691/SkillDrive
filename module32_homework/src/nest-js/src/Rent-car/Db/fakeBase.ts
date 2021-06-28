for (let index = 0; index < 9; index++) {   
    fetch("http://localhost:8000/rent-car", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(
            {
                "brand": [
                    "BMW", "Kia", "Hyondai", "Nissan", "Lada", "Mersedes", "Mazda", "Toyota", "Mustang"
                ][index],
                "model": [
                    "3-series", "Optima", "Solaris", "Skyline", "Granta", "S-class", "RX-8", "Camry", "Shelby"
                ][index],
                "year": [2016,2017,2018,2021][Math.floor(Math.random()*4)],
                "engine": ["Бензин", "Газ", "Дизель"][Math.floor(Math.random()*3)],
                "power": [150,200,180][Math.floor(Math.random()*3)],
                "transmission": ["Автомат", "Механическая"][Math.floor(Math.random()*2)],
                "driveUnit": ["Передний привод", "Задний привод", "Полный привод"][Math.floor(Math.random()*2)],
                "price": [2500,3000,3500][Math.floor(Math.random()*3)],
                "city": ["Москва", "Санкт-Петербург"][Math.floor(Math.random()*2)],
                "category": (index == 3 ? "Грузовая" : "Легковая"),
                "rating": [1,2,3,4,5][Math.floor(Math.random()*5)],
                "photo": `car${index}.svg`,
                "owner": ["test4@yandex.ru", "test0@yandex.ru", "test2@yandex.ru", "test1@yandex.ru", "test1@yandex.ru", "test0@yandex.ru", "test2@yandex.ru", "test3@yandex.ru", "test0@yandex.ru"][index],
                "dateAvailable": (index > 6 ? [[["2021", "12","30"], ["2022", "1","29"]]] : [])
            }
        )
    })
    }

    for (let index = 0; index < 9; index++) {
        fetch(`http://localhost:8000/rent-car/car${index}.svg`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "latitude": "59.919984",
                "longitude": "30.338949"
            })
    })  
    }
// [
//     {
//         "brand": "BMW",
//         "model": "3-series",
//         "year": 2017,
//         "engine": "Бензин",
//         "power": 180,
//         "transmission": "Автомат",
//         "driveUnit": "Задний привод",
//         "price": 3000,
//         "city": "Москва",
//         "category": "Легковая",
//         "rating": 3,
//         "photo": "car0.svg",
//         "owner": "test1@yandex.ru"
//     },
//     {
//         "brand": "Kia",
//         "model": "Optima",
//         "year": 2017,
//         "engine": "Газ",
//         "power": 200,
//         "transmission": "Автомат",
//         "driveUnit": "Передний привод",
//         "price": 2500,
//         "city": "Санкт-Петербург",
//         "category": "Легковая",
//         "rating": 2,
//         "photo": "car1.svg",
//         "owner": "test2@yandex.ru"
//     },
//     {
//         "brand": "Hyondai",
//         "model": "Solaris",
//         "year": 2018,
//         "engine": "Бензин",
//         "power": 150,
//         "transmission": "Автомат",
//         "driveUnit": "Передний привод",
//         "price": 2500,
//         "city": "Москва",
//         "category": "Легковая",
//         "rating": 4,
//         "photo": "car2.svg",
//         "owner": "test4@yandex.ru"
//     },
//     {
//         "brand": "Nissan",
//         "model": "Skyline",
//         "year": 2016,
//         "engine": "Бензин",
//         "power": 150,
//         "transmission": "Механическая",
//         "driveUnit": "Задний привод",
//         "price": 3500,
//         "city": "Санкт-Петербург",
//         "category": "Легковая",
//         "rating": 1,
//         "photo": "car3.svg",
//         "owner": "test1@yandex.ru"
//     },
//     {
//         "brand": "Lada",
//         "model": "Granta",
//         "year": 2021,
//         "engine": "Газ",
//         "power": 200,
//         "transmission": "Механическая",
//         "driveUnit": "Задний привод",
//         "price": 3500,
//         "city": "Москва",
//         "category": "Легковая",
//         "rating": 4,
//         "photo": "car4.svg",
//         "owner": "test1@yandex.ru"
//     },
//     {
//         "brand": "Mersedes",
//         "model": "S-class",
//         "year": 2018,
//         "engine": "Дизель",
//         "power": 200,
//         "transmission": "Механическая",
//         "driveUnit": "Задний привод",
//         "price": 3500,
//         "city": "Москва",
//         "category": "Легковая",
//         "rating": 3,
//         "photo": "car5.svg",
//         "owner": "test4@yandex.ru"
//     },
//     {
//         "brand": "Mazda",
//         "model": "RX-8",
//         "year": 2018,
//         "engine": "Газ",
//         "power": 150,
//         "transmission": "Механическая",
//         "driveUnit": "Передний привод",
//         "price": 3500,
//         "city": "Санкт-Петербург",
//         "category": "Легковая",
//         "rating": 5,
//         "photo": "car6.svg",
//         "owner": "test3@yandex.ru"
//     },
//     {
//         "brand": "Toyota",
//         "model": "Camry",
//         "year": 2016,
//         "engine": "Бензин",
//         "power": 150,
//         "transmission": "Механическая",
//         "driveUnit": "Передний привод",
//         "price": 3500,
//         "city": "Санкт-Петербург",
//         "category": "Легковая",
//         "rating": 1,
//         "photo": "car7.svg",
//         "owner": "test1@yandex.ru"
//     },
//     {
//         "year": 2016,
//         "engine": "Газ",
//         "power": 150,
//         "transmission": "Механическая",
//         "driveUnit": "Передний привод",
//         "price": 2500,
//         "city": "Москва",
//         "category": "Легковая",
//         "rating": 2,
//         "photo": "car8.svg",
//         "owner": "test0@yandex.ru"
//     }
// ]