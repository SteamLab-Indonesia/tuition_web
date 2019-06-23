import firebase from 'firebase';
import {User, GENDER} from './User';

export class Teacher extends User{

    constructor(teacher)
    {
        super();
        this.subject = '';
        this.gender = GENDER.MALE;
    
        if (teacher)
        {
            this.name = teacher.name;
            this.email = teacher.email;
            this.username = teacher.username;
            this.birthday = teacher.birthday;
            this.password = teacher.password;
            this.phone = teacher.phone;
            this.address = teacher.address;
            this.subject = teacher.subject;
            this.gender = teacher.gender;    
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
            subject: this.subject,
            gender: this.gender
        }

    }
}

export function getTeacher(callback) {
    const db = firebase.firestore();
    db.collection("teacher").get()
    .then((snapshot) => {
        let teacher_list = []
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            teacher_list.push({
                id: doc.id,
                data: doc.data()
            });
        });
        callback(teacher_list);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
};

export function addTeacher(teacher)
{
    const db = firebase.firestore();
    db.collection('teacher').add(teacher.toJson());     
    firebase.auth().createUserWithEmailAndPassword(teacher.email,teacher.password).catch(function(error){
        var errorCode = error.code;
        var errorMessage=error.Message
    }); 
}

export function teacherLogin(teacher)
{
    firebase.auth().signInWithEmailAndPassword(teacher.email,teacher.password).catch(function(error){
        var errorCode = error.code;
        var errorMessage=error.Message
        console.log(error)
    }); 
}

