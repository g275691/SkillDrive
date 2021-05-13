import React from 'react';
import car5 from '../../img/home-page/car5.svg';

const Cta = () => (
    <section class="call__to__action">
        <div class="cta__container">
            <img src={ car5 } alt="Child and mini-car" />
            <h2>Попробуйте аренду на себе</h2>
            <a href="404.html" target="_blank" rel="nofollow">
                <button>Зарегистрироваться</button>
            </a>
        </div>
    </section>  
)

export default Cta;