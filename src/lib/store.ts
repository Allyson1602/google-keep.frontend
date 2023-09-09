import { writable } from 'svelte/store';

interface Itask {
    id: number;
    title: string;
    description: string;
    done: boolean;
}

function createTasks() {
	const { subscribe, set, update } = writable<Itask[]>([]);

    function addTask(task: Itask) {
        update(tasks => [...tasks, task]);
    }

    function updateTask(id: number, task: Itask) {
        update(tasks => tasks.map(taskItem => taskItem.id === id ? task : taskItem));
    }

    function removeTask(id: number) {
        update(tasks => tasks.filter(taskItem => taskItem.id !== id));
    }

	return {
		// subscribe,
		addTask,
		updateTask,
		removeTask
	};
}

export const tasks = createTasks();
