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