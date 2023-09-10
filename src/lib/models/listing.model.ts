export interface ITask {
    id: number;
    description: string;
    done: boolean;
}

export interface IListingView {
    title: string;
    tasks: ITask[];
}

export interface IListingModel {
    id: number;
    title: string;
    tasks: ITask[];
}