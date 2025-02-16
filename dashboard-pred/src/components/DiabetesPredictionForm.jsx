import React from "react";
import { useState } from "react";
import store from "@/store/store";
import { useSelector ,useDispatch } from "react-redux";
import { setLoading , setError , setPrediction } from "@/store/diabetesFormSlice";
import { Card , CardContent , CardDescription , CardFooter , CardHeader , CardTitle } from "./ui/card";
import { Activity , Loader2 , AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import FormField from "./FormField/FormField";
import axios from "axios";

function DiabetesPredictionForm(){
    const dispatch = useDispatch();
    const {formData , loading , error , prediction} = useSelector(state => state.diabetesForm)
    const handleSumbit = async (e)=>{
        e.preventDefault();
        dispatch(setLoading(true));
        dispatch(setError(""));
        dispatch(setPrediction(null));
        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", {
                features: [
                    formData.gender,
                    Number(formData.age),
                    Number(formData.hypertension), 
                    Number(formData.heart_disease), 
                    formData.smoking_history,
                    Number(formData.bmi),
                    Number(formData.HbA1c_level),
                    Number(formData.blood_glucose_level)
                ]
            });
            dispatch(setPrediction(response.data.prediction));
            // console.log(prediction[0])
        } catch (error) {
            console.error("API Error:", error.response ? error.response.data : error.message);
            dispatch(setError(error.response ? JSON.stringify(error.response.data) : "An error occurred"));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return(
        <>
        <div className="div min-h-screen bg-gradient-to-br from-blue-300 to-purple-300 py-12 px-4 sm:px-6 lg:px-8">
            <Card className='max-w-7xl mx-auto shadow-lg'>
                <CardHeader className='bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg'>
                    <CardTitle className="text-4xl flex items-center gap-2">
                        <Activity className="h-8 w-14"/>
                        Diabetes Risk Predictor
                    </CardTitle>
                    <CardDescription className="text-blue-100 text-xl">
                        Enter your health data for an AI powered diabetes Risk assessment.
                    </CardDescription>
                </CardHeader>
                <CardContent className="mt-6">
                    <form onSubmit={handleSumbit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                            name = "gender"
                            label = "Gender"
                            description="Gender"
                            calculation="What is your Gender"
                            type="text"
                            />
                            <FormField
                            name = "age"
                            label = "Age"
                            type = "number"
                            description="Age"
                            calculation="What is your age?"
                            />
                            <FormField
                            name = "hypertension"
                            label = "Hypertension"
                            type = "number"
                            description="If you have hypertension"
                            calculation="Use the bottom number from a blood pressure reading."
                            />
                            <FormField
                            name = "heart_disease"
                            label = "Heart Disease"
                            type = "number"
                            description="If you have any heart disease"
                            calculation="Any heart related problem"
                            />
                            <FormField
                            name="smoking_history"
                            label="Smoking History"
                            type = "text"
                            description="Any smoking history"
                            calculation="Give ans in current , never , No info"
                            />
                            <FormField
                            name="bmi"
                            label="BMI"
                            description="Body Mass Index (kg/m²)"
                            calculation="Calculate as weight (kg) divided by height squared (m²)."
                            />
                            <FormField
                            name="HbA1c_level"
                            label="HbA1c_level"
                            type = "number"
                            description="What is your HbA1c_level"
                            calculation="Hba1C"
                            />
                            <FormField
                            name="blood_glucose_level"
                            label="Blood Glucose Level"
                            type = "number"
                            description="Glucose Level"
                            calculation="Glucose Level"
                            />
                        </div>
                        <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500
                        transform transition-transform duration-300 hover:scale-105 hover:overflow-hidden"
                        disabled={loading}
                        >
                            {loading ?
                            <>
                            <Loader2 className="mr-4 h-8 w-8 animate-spin"/>
                            Analyzong...
                            </> :
                            "Predict Diabetes Risk"
                            }
                        </Button>
                    </form>
                    {error && (
                        <Alert variant="destructive" className="mt-6">
                        <AlertCircle className="h-5 w-5" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {prediction !== null && (
                        <Alert className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-blue-500">
                            <AlertTitle className="text-xl font-semibold text-blue-700">Prediction Result</AlertTitle>
                                <AlertDescription className="mt-2">
                                    <p className="text-gray-700 text-lg">Our model predicted that you have:</p>
                                    {/* <div className="mt-3">
                                        { <Progress value={prediction * 100} className="h-3 bg-blue-200" /> }
                                    </div> */}
                                    {/* <p className="mt-2 text-3xl font-bold text-blue-700">{}%</p> */}
                                    <p className="mt-2 text-base text-gray-600">
                                    {prediction[0] === 0
                                    ? "Low risk. Maintain a healthy lifestyle!"
                                    : "High risk. Please consult a doctor for a thorough evaluation."}
                                     </p>
                                </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </div>
        </>
    );
};

export default DiabetesPredictionForm;