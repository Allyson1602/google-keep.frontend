import type { ITask } from "./task.model";

export interface IListing {
    id: number;
    title: string;
    tasks: ITask[];
}