import { UUID } from "@models";

//////////////////////////
///// Apí Interfaces /////
//////////////////////////

export interface ITask {
    id: UUID;
    userId: UUID;
    title: string;
    completed: boolean;
}