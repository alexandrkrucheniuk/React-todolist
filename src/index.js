// Core
import React from 'react';
import ReactDOM from 'react-dom';
import Catcher from './components/Catcher';

// Instruments
import './theme/reset.css';

// App
import App from './containers/App';

ReactDOM.render(
    <Catcher>
        <App />
    </Catcher>
    , document.getElementById('root'));
