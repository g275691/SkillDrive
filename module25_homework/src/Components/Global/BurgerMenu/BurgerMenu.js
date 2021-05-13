import React from 'react';

const BurgerMenu = () => {
    let [burger, animateBurger] = React.useState(false);
    const handleClick = () => {
        document.querySelector(".mobile__wrapper").classList.toggle("is-active");
        burger ? animateBurger(false) : animateBurger(true);  
    };
    return (
    <div className={burger ? "mobile__burger is-mobile" : "mobile__burger is-active is-mobile"} onClick={handleClick}>
        {[0,1,2].map((el) => {
            return <div className="mobile__burger-rect" style={burger ? {animation: `rect-${el} 1s ease-in-out both`} : 
            {animation: `rect-${el+3} 0.8s ease-out both reverse`}}></div>
        })}
    </div>
)}

export default BurgerMenu;