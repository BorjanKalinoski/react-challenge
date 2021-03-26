import React from "react";
import {Alert, AlertDescription, AlertIcon} from "@chakra-ui/react";
import {AlertProps} from "@chakra-ui/alert/dist/types/alert";

interface Props extends AlertProps {

}
//this component is not completely finished, i just wanted a quick way to reuse it across different components
const CustomAlert: React.FC<Props> = (props) => {
    const {status = 'error', children, ...others} = props;

    return <Alert status={status} mb={2} {...others}>
        <AlertIcon/>
        <AlertDescription>{children}</AlertDescription>
    </Alert>;
};

export default CustomAlert;