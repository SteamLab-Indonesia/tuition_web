import {User, addUser, getUserListByPermission} from './User';
import PermissionLevel from './PermissionLevel';

export class Student extends User {

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
            this.organizations = student.organizations;
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
            organizations: this.organizations,
            branches: this.branches
        }
    }
}

export function getStudent() {
    return getUserListByPermission(PermissionLevel.STUDENTS);
}

export function add(student)
{
    return addUser(student);
}


