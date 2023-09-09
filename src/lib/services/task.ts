import type { ITaskView } from "../models/task";

export interface ITaskService {
    listTasksByUserId: (userId: number) => ITaskView[];
}

class TaskService implements ITaskService {
    listTasksByUserId = (userId: number): ITaskView[] => {
        return [];
    };
}

export default new TaskService();