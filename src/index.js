import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './store';
import App from './app';
// Styles
import 'styles/build.scss';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
