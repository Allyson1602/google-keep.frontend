import type { ITask } from "./task.model";

export interface IListing {
    id: number;
    userId: number;
    title: string;
    tasks: ITask[];
}