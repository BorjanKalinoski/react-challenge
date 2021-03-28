import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import { firestore } from '../../config/firebase';
import { useUserData } from '../../contexts/UserDataContext';
import Loading from '../common/Loading';
import UserCard from './UserCard';
import { User } from '../../types/User';

const UsersList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [otherUsers, setOtherUsers] = useState<User[]>([]);

  const { currentUser } = useUserData()!;

  //set up listener to fetch all other users
  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .where('email', '!=', currentUser?.email)
      .onSnapshot((snapshot) => {
        setIsLoading(true);

        const users: User[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as User),
        }));

        setOtherUsers(users);
        setIsLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, [currentUser?.email]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {otherUsers.length === 0 && <Text>There are no users to display.. Create some!</Text>}

      {otherUsers.map((user) => (
        <UserCard key={user.id!} id={user.id!} {...user} />
      ))}
    </>
  );
};

export default UsersList;
