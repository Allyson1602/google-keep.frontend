import type { ITask } from "./task.model";

export interface IListing {
    id: number;
    user: number;
    title: string;
    tasks: ITask[];
}