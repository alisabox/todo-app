import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { reducer } from './store/reducer';
import { loadState, saveState } from './store/local-storage';
import './index.css';
import App from './components/app/app'

// Создаем хранилище redux и загружаем в него состояние из локального хранилища
const store = configureStore({
  reducer: reducer,
  preloadedState: loadState(),
});

// Создаем подписку на локальное хранилище
store.subscribe(() => {
  saveState(store.getState());
});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
