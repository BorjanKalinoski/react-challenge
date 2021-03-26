import React from "react";
import {Text, VStack, HStack, } from "@chakra-ui/react";
import {CloseIcon, } from "@chakra-ui/icons";
import firebase from "firebase";
import {UserRole} from "../types/User";
import {useUser} from "../contexts/UserContext";
import EditUserForm from "./form/EditUserForm";

interface Props {
    name: string;
    email: string;
    role: UserRole;
    createdAt: firebase.firestore.Timestamp;
    id: string;
}

const UserCard: React.FC<Props> = (props) => {

    const {name, email, role, createdAt, id} = props;
    const {deleteUser, canDelete, canEdit} = useUser()!;

    const displayDate = `${createdAt?.toDate().toLocaleTimeString()} ${createdAt?.toDate().toLocaleDateString()}`;

    return <VStack w='100%' border='1px solid gray' borderRadius={2} mb={1} p={1} position='relative'>
        <HStack>
            {!role
                ? <Text as='span'>
                    <Text as='span' fontWeight='semibold'>
                        {name}
                    </Text>
                    {' '}
                    has no role :(
                </Text>
                : <Text as='span'>
                    <Text as='span' fontWeight='semibold'>
                        {name}
                    </Text>
                    {' '}
                    is a
                    {' '}
                    <Text as='span' color='red'>
                        {role}
                    </Text>
                </Text>
            }
        </HStack>
        <Text as='span'>
            Created at: {displayDate}
        </Text>
        <Text as='i'>
            {email}
        </Text>
        {canDelete() &&
        <CloseIcon
            cursor='pointer'
            color='red'
            position='absolute'
            top='0'
            right='2'
            onClick={() => deleteUser(id!)}
        />
        }
        {canEdit() && <EditUserForm values={{name, email, role, id}}/>}
    </VStack>;
};

export default UserCard;