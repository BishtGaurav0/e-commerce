import { auth } from "../firebase";

export function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

export function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

export function signout() {
    return auth.signOut();
}