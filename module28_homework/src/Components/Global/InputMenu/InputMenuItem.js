import React, { useState } from 'react';

const InputMenuItem = ({city, onMouseDown, selectedCity}) => {
    
    return (
        <div className="input__menu__container-list-item"
        onMouseDown={onMouseDown}>
            {city}
            {selectedCity == city && <div className="icon-check-mark">🗸</div>}
        </div>
    )
}

export default InputMenuItem;