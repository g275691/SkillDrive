import {decodeToken} from './decodeToken';
import "regenerator-runtime/runtime.js"; 

import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY,
    MILLISECONDS_IN_SECOND, ACCESS_TOKEN_UPDATE_DIFF}
    from './constants';

export async function checkToken(url, method, body) {
    let accessToken = localStorage.getItem("accessToken");
    const tokenData = decodeToken(accessToken);
    const currentTime = Math.round(Date.now() / MILLISECONDS_IN_SECOND);
    if(!tokenData) return console.log("Пользователь не авторизован");
    const diff = tokenData.exp - currentTime;
    console.log(diff);
    const isAccessTokenValid = diff > ACCESS_TOKEN_UPDATE_DIFF;

    if(!isAccessTokenValid) {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

        const response = await fetch("http://localhost:8000/users/auth/refresh", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            },
            body: JSON.stringify( tokenData ),
        })
        console.log(response);
        
        if(response.ok) {
            const data = await response.json();
            localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.accessToken);
            localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, data.refreshToken);
        } else {
            console.log("Не прошли валидацию")
        }
    }
        
    return fetch(url, {
        method,  
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
     },  
        body: JSON.stringify(body) 
    })
}