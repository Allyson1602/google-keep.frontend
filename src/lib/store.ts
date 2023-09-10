import { writable } from 'svelte/store';
import type { ITaskModel } from './models/task.model';

function createTasks() {
	const { subscribe, update } = writable<ITaskModel[]>([
        {
            id: 1,
            title: 'Task 1',
            description: 'Description 1',
            done: false
        },
        {
            id: 2,
            title: 'Task 2',
            description: 'Description 2',
            done: false
        }
    ]);

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
