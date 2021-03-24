import firebase  from "firebase";
import {User} from "../types/User";

async function registerUser(user: User) {
    try {

        console.log('registering');
        const response = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password!);
        console.log('awkdokdaso');
        const uid = await response.user?.uid;
        console.log(uid);

        const resp = await firebase.firestore().collection('users').doc(uid).set({
            name: user.name,
            email: user.email,
            role: user.role
        });
        console.log('firestore is', response);
    } catch (e) {
        console.log(e);
    }
}

export default {
    registerUser
};