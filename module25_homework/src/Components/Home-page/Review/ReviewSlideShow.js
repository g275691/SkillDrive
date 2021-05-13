import React, { Fragment } from 'react';

const ReviewSlideShow = ({img, name, city, monolog}) => (
    <Fragment>
        <img src={img} alt="Client's portrait" />
        <div class="wrapper__text">
            <span class="wrapper__text-name">{name}</span>
            <span class="wrapper__text-city">{city}</span>
            <span class="wrapper__text-monolog">{monolog}</span>
        </div>
    </Fragment>
)

export default ReviewSlideShow;