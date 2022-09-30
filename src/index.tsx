import { setupIonicReact } from '@ionic/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './fonts/BlackOpsOne-Regular.ttf'
import './fonts/SpecialElite-Regular.ttf'
setupIonicReact({
  swipeBackEnabled: false,// also prevent swiping back on either platform
	hardwareBackButton: false// this is what you need (android only)
});
ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

