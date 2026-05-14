import { debounce } from './utils/debounce.js';
window.addEventListener('resize', debounce(()=>document.body.dataset.vw=window.innerWidth,250));
