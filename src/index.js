import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ComplaintForm from './complaint-form';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store.js';

ReactDOM.render(
  <Provider store={store}>
  <ComplaintForm />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
