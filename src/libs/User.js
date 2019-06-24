import firebase from 'firebase';
import PermissionLevel from './PermissionLevel';
import { setData } from './SessionData';

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
    archive = false;
    permission = PermissionLevel.GUEST;
    modules = [];
    organization = null;
    branches = [];

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
            this.archive = user.archive;
            this.permission = user.permission;
            this.modules = user.modules;
            this.organization = user.organization;
        }
    }

    toJson = () => {
        return {
            name: this.name,
            email: this.email,
            username: this.username,
            birthday: this.birthday,
            phone: this.phone,
            address: this.address,
            school: this.school,
            gender: this.gender,
            archive: this.archive,
            permission: this.permission,
            modules: this.modules,
            organization: this.organization,
            branches: this.branches
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
    return new Promise((resolve, reject) => {
        const db = firebase.firestore();
            let userRef = db.collection('user').add(user.toJson());
        firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
        .then((success) => {
                // success.updateProfile({
                //     displayName: user.name
                // });
                resolve(userRef);
        })
        .catch(function(error){
                reject(error);
        }); 
    })
}


export function getUserByEmail(username, callback) {
    return new Promise((resolve, reject) => {
        const db = firebase.firestore();
        let query = db.collection("user").where("email", '==', username)
        query.get().then((snapshot) => {
            if (snapshot.empty)
                resolve(null);
            resolve({ id: snapshot.docs[0].id,
                data: snapshot.docs[0].data()
            });
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export function getUserListByPermission(permission) {
    return new Promise((resolve, reject) => {
        const db = firebase.firestore();
        // Multiple Permission Level queries
        if (Array.isArray(permission))
        {
            let user_list = [];
            let queries = permission.map((item) => {
                return db.collection("user").where("permission", '==', item).get();
            })
            Promise.all(queries).then((snapArray) => {
                for(let j=0; j < snapArray.length; ++j)
                {
                    let snapshot = snapArray[j];
                    if (!snapshot.empty)
                    {
                        for(let i=0; i < snapshot.docs.length; ++i)
                        {
                            user_list.push({
                                id: snapshot.docs[i].id,
                                data: snapshot.docs[i].data()
                            })
                        } 
                    }                    
                }
                resolve(user_list);
            })
        }
        // Single Permission
        else
        {
            db.collection("user").where("permission", '==', permission).get()
            .then((snapshot) => {
                if (snapshot.empty)
                    resolve(null);
                let user_list = [];
                for(let i=0; i < snapshot.docs.length; ++i)
                {
                    user_list.push({
                        id: snapshot.docs[i].id,
                        data: snapshot.docs[i].data()
                    })
                }
                resolve(user_list);
            })
            .catch((error) => {
                reject(error);
            })            
        }
    })
}

export function userLogin(user)
{
    return new Promise((resolve, reject) => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            firebase.auth().signInWithEmailAndPassword(user.email,user.password).then(() =>{
                getUserByEmail(user.email).then((res) => {
                    if (res && res.data && res.data.organization)
                    {
                        res.data.organization.get().then((orgResp) => {
                            setData(orgResp.id, orgResp.data().name, res.data.branch, res.id, res.data);
                            resolve(res);        
                        }).catch((err) => {
                            reject(err);
                        })
                    }
                    else
                    {
                        setData(null, null, null, res.id, res.data);
                        resolve(res);    
                    }
                }).catch((err) => {
                    reject(err);
                })
            }).catch(function(error){
                reject(error);
            });
        })
        .catch((err) => {
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

export function setUserDetails(id_num,name,username,password,birthday,gender,email,phone,address,school) {
    console.log(id_num);
    const db = firebase.firestore();
    let query = db.collection("user").doc(id_num);
    query.set({
        name,username,password,birthday,gender,email,phone,address,school
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
