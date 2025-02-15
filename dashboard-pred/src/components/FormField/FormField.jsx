import React from "react";
import { useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { updateFormData } from "@/store/diabetesFormSlice";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { InfoIcon , ChevronUp , ChevronDown } from 'lucide-react';
import { Collapsible , CollapsibleContent , CollapsibleTrigger } from "../ui/collapsible";
import { Tooltip , TooltipContent , TooltipProvider , TooltipTrigger } from "../ui/tooltip";

function FormField({name , label , description , calculation}){
    const [isOpen , setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const value = useSelector((state)=>state.diabetesForm.formData[name]);

    return(
        <>
        <div className="space-y-2">
            <Label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button aria-label={`${label} info`}>
                            <InfoIcon className="h-4 w-4 ml-2 text-blue-500 cursor-pointer" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>{description}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </Label>
            <Input
             id = {name}
             name = {name}
             type = "number"
             placeholder = {description}
             value = {value || ""}
             onChange = {(e)=>dispatch(updateFormData({[name] : e.target.value}))}
             required
             className="w-full p-2 border-gray-300 rounded-md focus:ring-blue-500"
            />
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
            <button
            type = "button"
            onClick = {()=>!setIsOpen(!isOpen)}
            className="flex items-center text-xs text-blue-600 hover:text-blue-800 focus:outline-none">
                {isOpen ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                {isOpen ? "Hide details" : "Show details"}
            </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
               <p>
                <strong>Description:</strong> {description}
               </p>
               <p>
                <strong>How to calculate:</strong> {calculation}
               </p>
            </CollapsibleContent>
            </Collapsible>
        </div>
        </>
    );
}

export default FormField;