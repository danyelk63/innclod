import { isoString, UUID } from "@models";

//////////////////////////
///// Apí Interfaces /////
//////////////////////////

export interface IUserLogin {
    username: string;
    password: string;
}

export interface IUser {
    id: UUID;
    username: string;
    name: string;
    lastName: string;
    email: string;
    creatAt: isoString;
    phone?: string;
    imgProfile?: string;
}

////////////////////
///// Adapters /////
////////////////////

export class User {
    id: UUID;
    username: string;
    name: string;
    lastName: string;
    email: string;
    creatAt: Date;
    phone?: string;
    imgProfile?: string;

    constructor (data: IUser) {
        this.id = data.id;
        this.username = data.username;
        this.name = data.name;
        this.lastName = data.lastName;
        this.email = data.email;
        this.creatAt = new Date(data.creatAt);
        this.phone = data.phone;
        this.imgProfile = data.imgProfile;
    }
}