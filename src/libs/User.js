import firebase from 'firebase';

export const GENDER = {
    MALE: 'Male',
    FEMALE: 'Female'
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
    const db = firebase.firestore();
    db.collection('user').add(user.toJson());     
    firebase.auth().createUserWithEmailAndPassword(user.email,user.password).catch(function(error){
        var errorCode = error.code;
        var errorMessage=error.Message
    }); 
}


export function getUserDetails(username, callback) {
    const db = firebase.firestore();
    let query = db.collection("user").where("email", '==', username)
    query.get().then((snapshot) => {
        let user_list = []
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    })
}

export function userLogin(user)
{
    firebase.auth().signInWithEmailAndPassword(user.email,user.password).then(() =>{
        getUserDetails(user.email);
    }).catch(function(error){
        var errorCode = error.code;
        var errorMessage=error.Message
    }); 
}
    
