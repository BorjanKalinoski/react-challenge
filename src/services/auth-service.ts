import firebase  from "firebase";
import {User} from "../types/User";

async function registerUser(user: User) {
    const response = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password!);
    console.log(response);
    console.log(firebase.auth().currentUser);
}

async function loginUser(user: User) {
    const response = await firebase.auth().signInWithEmailAndPassword(user.email, user.password!);
}

export default {
    registerUser
};