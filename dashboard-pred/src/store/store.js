import {configureStore} from '@reduxjs/toolkit';
import diabetesFormReducer from './diabetesFormSlice';

const store = configureStore({
    reducer : {
        diabetesForm : diabetesFormReducer,
    },
});

export default store;