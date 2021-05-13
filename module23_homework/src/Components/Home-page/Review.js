import React from 'react';
import ReviewSlideShow from './ReviewSlideShow';
import test from '../../img/Home-page/review0.svg';
import {reviewer} from './ReviewData';

const Review = () => {
    let [count, setCount] = React.useState(0);

    return (
    <section class="review">
        <div class="review__container">
            <h2>Отзывы клиентов</h2>
            <div class="slide__show">
                <div class="icon-arrow" onClick={()=> count!=0 ? setCount(count = count - 1) : setCount(count = 3)}/>
                <div class="slide__show-rect">
                    {[0,1,2,3].map(el => { return <div className={count == el ? "wrapper is-active" : "wrapper"}>
                        <ReviewSlideShow img={reviewer[el].img} name={reviewer[el].name} city={reviewer[el].city} monolog={reviewer[el].monolog}/>
                    </div> })}
                </div>
                <div class="icon-arrow" onClick={()=> count!=3 ? setCount(count = count + 1) : setCount(count = 0)}/>
            </div>
            <div className="review__container__circles">
                {[0,1,2,3].map(el => { return <div className={count == el ? "review__container__circles-item is-active" : "review__container__circles-item"} 
                onMouseEnter={()=> setCount(count = el)}/> })}
            </div>
            <img src={test} style={{display: "none"}}/>
        </div>
    </section>
    )
};

export default Review;