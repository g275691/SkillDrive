import React from 'react';
import CirclesBlock from '../CirclesBlock/CirclesBlock';

const RentRule = () => (
    <section class="rent-rule">
        <div class="rent-rule__container">
            <h2>Как арендовать автомобиль</h2>
            <div class="circles__container">
                <CirclesBlock span="Выберите автомобиль" isIcon="1" needLine/>
                <CirclesBlock span="Забронируйте дату и время" isIcon="2" needLine/>
                <CirclesBlock span="Наша комиссия всего 3%" isIcon="3"/>
            </div>
        </div>
    </section>
)

export default RentRule;