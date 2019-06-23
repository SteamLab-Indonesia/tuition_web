import firebase from 'firebase';

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
    archive = false

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
            this.archive = user.archive
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
            gender: this.gender,
            archive: this.archive
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
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            console.log('SIGN IN WITH EMAIL:' + user.email);
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
        .catch((err) => {
            console.log('Error in set Firebase Persistence:');
            console.log(err);
            reject(err);
        });
    })    
}

export function userLogout()
{
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            resolve('success');
        }).catch(function(error) {
            // An error happened.
            reject(error);
        });
    });
}

export function getCurrentUser()
{
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

export function setUserDetails(id_num,name,username,password,birthday,gender,email,phone,address,school,archive) {
    console.log(id_num);
    const db = firebase.firestore();
    let query = db.collection("user").doc(id_num);
    query.set({
        name,username,password,birthday,gender,email,phone,address,school,archive
    });
}

export function setUserArchive(id_num,archive){
    const db = firebase.firestore();
    console.log('ARCHIVE DATA = ' + id_num);
    let query = db.collection("user").doc(id_num);
    query.update({
        archive
    })
}
