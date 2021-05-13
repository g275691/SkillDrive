import React, { Fragment } from 'react';

const CirclesBlock = ({span, isIcon, needLine}) => (  
    <Fragment>
        <div class="circles__container-wrapper">
            <div class="circles__container-wrapper-circle">
                <div className={isIcon.length > 1 ? isIcon : "number"}>{isIcon.length == 1 ? isIcon : ""}</div>
            </div>
            <span>{span}</span>
        </div>
        {needLine ? <div class="circles__container-line"></div> : ""}
    </Fragment>
)

export default CirclesBlock;