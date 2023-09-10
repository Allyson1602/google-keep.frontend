export interface ITask {
    id: number;
    description: string;
    done: boolean;
}

export interface IListing {
    id: number;
    title: string;
    tasks: ITask[];
}