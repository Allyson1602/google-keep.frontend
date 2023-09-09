import { writable } from 'svelte/store';
import type { ITaskModel } from './models/task';

function createTasks() {
	const { subscribe, update } = writable<ITaskModel[]>([]);

    function addTask(task: ITaskModel) {
        update(tasks => [...tasks, task]);
    }

    function updateTask(id: number, task: ITaskModel) {
        update(tasks => tasks.map(taskItem => taskItem.id === id ? task : taskItem));
    }

    function removeTask(id: number) {
        update(tasks => tasks.filter(taskItem => taskItem.id !== id));
    }

	return {
		subscribe,
		addTask,
		updateTask,
		removeTask
	};
}

export const tasks = createTasks();
