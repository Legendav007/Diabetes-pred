import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formData : {
        pregnancies: "",
        glucose: "",
        bloodPressure: "",
        skinThickness: "",
        insulin: "",
        bmi: "",
        diabetesPedigreeFunction: "",
        age: "",
    },
    loading: false,
    error: "",
    prediction: null,
};

const diabetesFormSlice = createSlice({
    name : 'diabetesForm',
    initialState,
    reducers : {
        updateFormData : (state , action)=>{
            state.formData = {...state.formData, ...action.payload};
        },
        setLoading : (state , action)=>{
            state.loading = action.payload;
        },
        setError : (state , action)=>{
            state.error = action.payload;  
        },
        setPrediction : (state , action)=>{
            state.prediction = action.payload;
        },
    },
});

export const {updateFormData , setError , setLoading , setPrediction} = diabetesFormSlice.actions;
export default diabetesFormSlice.reducer;