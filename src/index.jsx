/* ************************************************ */
/*File Name: index.js
* Author: Pudge
* Mail: EternalNight996@gmail.com
* Created Time: 2021年05月31日 星期一 00时57分03秒
*/


import ReactDOM from 'react-dom';

import Root from './root';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Root />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
serviceWorker.unregister();
