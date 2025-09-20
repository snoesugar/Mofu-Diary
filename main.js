import 'bootstrap/dist/css/bootstrap.min.css'; //中年新增，使用彈出視窗需要
import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/js/air-datepicker-setting';

console.log('Hello world');

import bg1   from './assets/images/bg/bg1.png';
import e9    from './assets/images/overview/Ellipse9.png';
import e8    from './assets/images/overview/Ellipse8.png';
import e8big from './assets/images/overview/Ellipse8-big.png';

const root = document.documentElement;
root.style.setProperty('--bg-scene-img', `url("${bg1}")`);
root.style.setProperty('--save-bg-img',  `url("${e9}"), url("${e8}")`);
root.style.setProperty('--tasks-bg-img', `url("${e8big}")`);





