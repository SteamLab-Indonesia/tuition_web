import firebase from 'firebase';
import { initFirebase } from './firebase';

export const GENDER = {
    MALE: 'male',
    FEMALE: 'female'
};

export class User {

    name = '';
    email = '';
    username = '';
    birthday = '';
    password = '';
    phone = '';
    address = '';
    school = '';
    gender = GENDER.MALE;

    constructor(user)
    {
        if (user)
        {
            this.name = user.name;
            this.email = user.email;
            this.username = user.username;
            this.birthday = user.birthday;
            this.password = user.password;
            this.phone = user.phone;
            this.address = user.address;
            this.school = user.school;
            this.gender = user.gender;    
        }
    }

    toJson = () => {
        return {
            name: this.name,
            email: this.email,
            username: this.username,
            birthday: this.birthday,
            password: this.password,
            phone: this.phone,
            address: this.address,
            school: this.school,
            gender: this.gender
        }

    }
}

export function getUser(callback) {
    initFirebase();
    const db = firebase.firestore();
    db.collection("user").get()
    .then((snapshot) => {
        let user_list = []
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            user_list.push({
                id: doc.id,
                data: doc.data()
            });
        });
        callback(user_list);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
};

export function addUser(user)
{
    initFirebase();
    const db = firebase.firestore();
    db.collection('user').add(user.toJson());     
    firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
    .then((success) => {
        success.updateProfile({
            displayName: user.name
        });
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage=error.Message
    }); 
}


export function getUserDetail2(username, callback) {
    return new Promise((resolve, reject) => {
        initFirebase();
        const db = firebase.firestore();
        let query = db.collection("user").where("email", '==', username)
        query.get().then((snapshot) => {
            if (snapshot.empty)
                resolve(null);
            resolve(snapshot.docs[0].data());
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export function userLogin(user)
{
    return new Promise((resolve, reject) => {
        initFirebase();
        firebase.auth().signInWithEmailAndPassword(user.email,user.password).then(() =>{
            getUserDetail2(user.email).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        }).catch(function(error){
            reject(error);
        });             
    })    
}

export function getCurrentUser()
{
    initFirebase();
    let user = firebase.auth().currentUser;
    if (user)
    {
        return { name: user.displayName, email: user.email };
    }
    else
        return null;
}

export function getUserDetails(id_num) {
    console.log(id_num);
    return new Promise((resolve, reject) => {
        initFirebase();
        const db = firebase.firestore();
        let query = db.collection("user").doc(id_num);
        query.get().then((doc) => {
            if (!doc.exists)
                resolve(null);
            else
                resolve(doc.data());
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export function setUserDetails(id_num,name,username,password,birthday,gender,email,phone,address,school) {
    console.log(id_num);
    initFirebase();
    const db = firebase.firestore();
    let query = db.collection("user").doc(id_num);
    query.set({
        name,username,password,birthday,gender,email,phone,address,school
    });

}

