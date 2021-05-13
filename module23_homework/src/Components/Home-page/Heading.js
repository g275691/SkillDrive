import React from 'react';
import car1 from '../../img/home-page/car1.svg';
import car1Mobile from '../../img/home-page/car1-mobile.svg';

const Heading = () => (
    <section className="heading">
            <div className="heading__container">
                <div className="heading__container__registration">
                    <h1>Каршеринг в любой точке России</h1>
                    <span>Будьте всегда за рулём во время путешествий и командировок.</span>
                    <a href="Main.html" target="_blank" rel="nofollow">
                        <button>Зарегистрироваться</button>
                    </a>
                </div>
                <img src={ car1 } alt="Woman near a car" />
                <img className="is-mobile" src={ car1Mobile } alt="Woman near a car" />
            </div>
    </section>
)

export default Heading;