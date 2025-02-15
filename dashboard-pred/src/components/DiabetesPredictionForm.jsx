import React from "react";
import { useState } from "react";
import { useSelector ,useDispatch } from "react-redux";
import { setLoading , setError , setPrediction } from "@/store/diabetesFormSlice";
import { Card , CardContent , CardDescription , CardFooter , CardHeader , CardTitle } from "./ui/card";
import { Activity , Loader2 , AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import FormField from "./FormField/FormField";


function DiabetesPredictionForm(){
    const dispatch = useDispatch();
    const {formData , loading , error , prediction} = useSelector(state => state.diabetesForm)

    const handleSumbit = async (e)=>{
        e.preventDefault();
        dispatch(setLoading(true));
        dispatch(setError(""));
        dispatch(setPrediction(null));
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            const simulatedPrediction = Math.random();
            dispatch(setPrediction(simulatedPrediction));
        } catch (error) {
            dispatch(setError("An error occurred while making the prediction. Please try again."));
        } finally{
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
                            name = "pregnancies"
                            label = "Pregnancies"
                            description="Number of times pregnant"
                            calculation="Count the number of pregnancies, including current if applicable else 0."
                            />
                            <FormField
                            name = "glucose"
                            label = "Glucose"
                            description="Plasma glucose concentration (mg/dL)"
                            calculation="Measured after a 2-hour oral glucose tolerance test."
                            />
                            <FormField
                            name = "bloodPressure"
                            label = "Blood Pressure"
                            description="Diastolic blood pressure (mm Hg)"
                            calculation="Use the bottom number from a blood pressure reading."
                            />
                            <FormField
                            name = "skinThickness"
                            label = "Skin Thickness"
                            description="Triceps skin fold thickness (mm)"
                            calculation="Measured using calipers on the back of the upper arm."
                            />
                            <FormField
                            name="insulin"
                            label="Insulin"
                            description="2-Hour serum insulin (μU/mL)"
                            calculation="Measured 2 hours after glucose load during an oral glucose tolerance test."
                            />
                            <FormField
                            name="bmi"
                            label="BMI"
                            description="Body Mass Index (kg/m²)"
                            calculation="Calculate as weight (kg) divided by height squared (m²)."
                            />
                            <FormField
                            name="diabetesPedigreeFunction"
                            label="Diabetes Pedigree Function"
                            description="Diabetes pedigree function"
                            calculation="A function that scores likelihood of diabetes based on family history."
                            />
                            <FormField
                            name="age"
                            label="Age"
                            description="Age (years)"
                            calculation="Your current age in years."
                            />
                        </div>
                        <Button
                        type="sumbit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
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
                                    <p className="text-gray-700 text-lg">The predicted probability of diabetes is:</p>
                                    <div className="mt-3">
                                        <Progress value={prediction * 100} className="h-3 bg-blue-200" />
                                    </div>
                                    <p className="mt-2 text-3xl font-bold text-blue-700">{(prediction * 100).toFixed(2)}%</p>
                                    <p className="mt-2 text-base text-gray-600">
                                    {prediction < 0.3
                                    ? "Low risk. Maintain a healthy lifestyle!"
                                    : prediction < 0.7
                                    ? "Moderate risk. Consider consulting a healthcare professional."
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