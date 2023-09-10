import ApiRestClient, { type IResponse } from "../axios.config";
import type { ITaskModel, ITaskView } from "../models/task.model";

export interface ITaskService {
    listTasksByUserId: (userId: number) => IResponse<ITaskModel[]>;
    addTask: (userId: number, task: ITaskView) => IResponse<ITaskModel>;
    updateTask: (id: number, task: ITaskModel) => IResponse<ITaskModel>;
    deleteTask: (id: number) => IResponse<boolean>;
}

class TaskService extends ApiRestClient implements ITaskService {
    listTasksByUserId = (userId: number): IResponse<ITaskModel[]> => {
        return this.get(`/task/user/${userId}`);
    };
    
    addTask = (userId: number, task: ITaskView): IResponse<ITaskModel> => {
        return this.post(`/task/user/${userId}`, task);
    };

    updateTask = (id: number, task: ITaskModel): IResponse<ITaskModel> => {
        return this.put(`/task/${id}`, task);
    };

    deleteTask = (id: number): IResponse<boolean> => {
        return this.delete(`/task`, id);
    };
}

export default new TaskService();