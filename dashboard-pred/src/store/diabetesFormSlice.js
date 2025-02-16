import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formData: {
        gender: "",
        age: "",
        hypertension: 0,
        heart_disease: 0,
        smoking_history: "",
        bmi: "",
        HbA1c_level: "",
        blood_glucose_level: ""
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