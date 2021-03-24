import React from "react";
import {FormControl, FormErrorMessage, FormLabel, Select} from "@chakra-ui/react";
import {useFormContext} from "react-hook-form";

interface Props {
    name: string;
    label: string;
    required?: boolean;
    errorMessage?: string;
    placeholder?: string;
}
const CustomSelect: React.FC<Props> = (props) => {
    const {name, label, required = false, errorMessage = 'This field is required', placeholder = '', children} = props;

    const {register, errors} = useFormContext();


    return <FormControl isInvalid={!!errors[name]} mb={1}>
        <FormLabel>{label}</FormLabel>
        <Select name={name} ref={register({
            required: {
                message: errorMessage,
                value: required
            }
        })}
                placeholder={placeholder}
        >
            {children}
        </Select>
        <FormErrorMessage>
            {errors[name] && errors[name].message}
        </FormErrorMessage>
    </FormControl>;
};

export default CustomSelect;