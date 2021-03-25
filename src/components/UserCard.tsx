import React from "react";
import {Text, VStack, HStack} from "@chakra-ui/react";
import firebase from "firebase";
import {UserRole} from "../types/User";

interface Props {
    name: string;
    email: string;
    role: UserRole;
    createdAt?: firebase.firestore.Timestamp;
}

const UserCard: React.FC<Props> = (props) => {

    const {name, email, role, createdAt} = props;

    const displayDate = `${createdAt?.toDate().toLocaleTimeString()} ${createdAt?.toDate().toLocaleDateString()}}`;

    return <VStack w='100%' border='1px solid gray' borderRadius={2} mb={1} p={1}>
        <HStack>
            <Text as='span'>
                {name} is a
            </Text>
            <Text color='red'>{role}
            </Text>
        </HStack>
        <Text as='span'>
            Created at: {displayDate}
        </Text>
        <Text as='i'>
            {email}
        </Text>
    </VStack>;
};

export default UserCard;