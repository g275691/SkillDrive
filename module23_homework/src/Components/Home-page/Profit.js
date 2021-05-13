import React from 'react';
import CirclesBlock from './CirclesBlock';

const Profit = () => {

    return (
    <section class="profit">
        <div class="profit__container">
            <h2>У вас есть автомобиль?</h2>
            <span class="profit__container-text">Чтобы он не простаивал — сдавайте его в аренду и зарабатывайте.</span>
            <div class="circles__container">

                <CirclesBlock span="Вы сами указываете цену" isIcon="icon-Profit1" needLine/>
                <CirclesBlock span="Мы страхуем автомобили" isIcon="icon-Profit2" needLine/>
                <CirclesBlock span="Наша комиссия всего 3%" isIcon="icon-Profit3" needLine/>
                <CirclesBlock span="Выплаты каждую неделю" isIcon="icon-Profit4"/>

            </div>
        </div>
    </section>
    )
}

export default Profit;