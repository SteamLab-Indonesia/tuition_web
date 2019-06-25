import {User, addUser, getUserListByPermission} from './User';
import PermissionLevel from './PermissionLevel';
import firebase from './firebase';

export default class Student extends User {

    constructor(student)
    {
        super();
        this.permission = PermissionLevel.STUDENTS;

        if (student)
        {
            this.name = student.name;
            this.email = student.email;
            this.username = student.username;
            this.birthday = student.birthday;
            this.password = student.password;
            this.phone = student.phone;
            this.address = student.address;
            this.gender = student.gender;
            if (student.organization)
            {
                const db = firebase.firestore();
                this.organization = db.collection('user').doc(student.organization);
            }
            if (student.branches)
                this.branches = student.branches;
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
            gender: this.gender,
            permission: this.permission,
            organization: this.organization,
            branches: this.branches
        }
    }

    save = () => {
        addUser(this);
    }
}

export function getStudent() {
    return getUserListByPermission(PermissionLevel.STUDENTS);
}



