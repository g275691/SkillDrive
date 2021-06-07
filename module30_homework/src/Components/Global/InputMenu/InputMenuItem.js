import React, { useState } from 'react';

const InputMenuItem = ({city, onMouseDown, selectedCity, category}) => {
    
    return (
        <div className="input__menu__container-list-item"
        onMouseDown={onMouseDown}>
            {city}
            {selectedCity == city && <div className="icon-check-mark">🗸</div>}
            {category && 
            <div className="input__menu__container-list-item-description">
                {city == "Легковая" ? "Категория B, BE" 
                : city == "Грузовая" ? "Категория C, CE" 
                : city == "Мотоциклы" ? "Категория A" : ""

                }
            </div>}
        </div>
    )
}

export default InputMenuItem;