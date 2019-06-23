import {User, getUserListByPermission, addUser} from './User';
import PermissionLevel from './PermissionLevel';

export class Teacher extends User{

    constructor(teacher)
    {
        super();
        this.subject = '';
        this.permission = PermissionLevel.TEACHER;
    
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
            gender: this.gender,
            permission: this.permission
        }
    }
}

export function getTeacher() {
    return getUserListByPermission(PermissionLevel.TEACHER);
};

export function addTeacher(teacher)
{
    return addUser(teacher);
}
