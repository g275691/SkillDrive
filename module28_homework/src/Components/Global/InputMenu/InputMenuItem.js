import React, { useState } from 'react';

const InputMenuItem = ({city, onMouseDown}) => {

    return (
        <div className="input__menu__container-list-item"
        onMouseDown={onMouseDown}>
            {city}
        </div>
    )
}

export default InputMenuItem;