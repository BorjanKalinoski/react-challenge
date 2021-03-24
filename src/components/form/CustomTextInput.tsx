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
}

const CustomTextInput: React.FC<Props> = (props) => {
    const {name, required = false, errorMessage = 'This field is required', placeholder = '', label, type = 'text'} = props;

    const {register, errors} = useFormContext();


    return <FormControl isInvalid={!!errors[name]}>
        <FormLabel>{label}</FormLabel>
        <Input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={
                register({
                    required: {
                        message: errorMessage,
                        value: required
                    }
                })
            }
        />
        <FormErrorMessage>
            {errors[name] && errors[name].message}
        </FormErrorMessage>
    </FormControl>;
};

export default CustomTextInput;