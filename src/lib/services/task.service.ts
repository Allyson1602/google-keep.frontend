import ApiRestClient, { type IResponse } from "../axios.config";
import type { ITask } from "../models/task.model";

export interface ITaskService {
    listTasks: () => IResponse<ITask[]>;
    addTask: (task: ITask) => IResponse<ITask>;
    updateTask: (task: ITask) => IResponse<ITask>;
    removeTask: (id: string) => IResponse<boolean>;
}

class TaskService extends ApiRestClient implements ITaskService {
    listTasks = (): IResponse<ITask[]> => {
        return this.get("tasks");
    };
    
    addTask = (task: ITask): IResponse<ITask> => {
        return this.post("tasks", task);
    };

    updateTask = (task: ITask): IResponse<ITask> => {
        return this.patch(`tasks/${task.id}`, task);
    };

    removeTask = (id: string): IResponse<boolean> => {
        return this.delete("tasks", id);
    };
}

export default new TaskService();