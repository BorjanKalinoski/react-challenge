import {useState} from "react";
import {firestore} from "../../config/firebase";
import {CreateUserFormType} from "./CreateUserModalForm";
import {EditUserFormType} from "./EditUserModalForm";

export default function useFormHook(id?: string) {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmit = async (data: CreateUserFormType | EditUserFormType) => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            await firestore.collection('users').doc(id).set({
                ...data,
            }, {
                merge: true
            });
        } catch (e) {
            setErrorMessage(e.message);
        }
        setIsLoading(false);
    };

    return {
        onSubmit,
        isLoading,
        errorMessage
    }
};