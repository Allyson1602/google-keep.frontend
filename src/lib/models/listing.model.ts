import type { ITask } from "./task.model";

export interface IListing {
    id: number;
    user_id: number;
    title: string;
    tasks: ITask[];
}