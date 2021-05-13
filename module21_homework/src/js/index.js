import '../sass/base.scss';

import {menuActivation} from './mobileMenu';
import {collapsibleQuestions} from './collapsibleBlock';

function pageLoaded() {
    menuActivation();
    collapsibleQuestions();
}

document.addEventListener("DOMContentLoaded", pageLoaded);