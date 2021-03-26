import React from "react";
import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import {useFormContext} from "react-hook-form";

interface Props {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    errorMessage?: string;
    minLength?: number;
    maxLength?: number;
    value?: string;
}

const CustomTextInput: React.FC<Props> = (props) => {
    const {name, required = false, errorMessage = 'This field is required', placeholder = '', label, type = 'text', minLength, value, maxLength} = props;


    const {register, errors} = useFormContext();


    return <FormControl isInvalid={!!errors[name]} mb={1}>
        <FormLabel>{label}</FormLabel>
        <Input
            type={type}
            name={name}
            placeholder={placeholder}
            defaultValue={value}
            ref={
                register({
                    required: {
                        message: errorMessage,
                        value: required
                    },
                    minLength:{
                        value: minLength!,
                        message: `The input must have at least ${minLength!} characters`
                    },
                    maxLength:{
                        value: maxLength!,
                        message: `The input cannot have more than ${maxLength!} characters`
                    },
                })
            }
        />
        <FormErrorMessage>
            {errors[name] && errors[name].message}
        </FormErrorMessage>
    </FormControl>;
};

export default CustomTextInput;