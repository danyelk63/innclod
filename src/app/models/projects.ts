import { UUID } from "@models";

//////////////////////////
///// Apí Interfaces /////
//////////////////////////

export interface IProject {
    id: UUID;
    name: string;
    description?: string;
    email?: string;
}