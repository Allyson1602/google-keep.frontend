<script lang="ts">
    import { tick } from "svelte";
    import type { IListing, ITask } from "../models/listing.model";
    import Icon from "@iconify/svelte";

    let isNewTask = false;
    export function save(listing: IListing) {

    };
    export let isFocused = false;
    export let listing: IListing = {
        id: 0,
        title: "",
        tasks: []
    };

    $: if (!isFocused && listing.id === 0) {
        listing = {
            id: 0,
            title: "",
            tasks: []
        };
    }
    
    function handleClickRemoveTask(taskId: number): void {
        const alterTasks: ITask[] = listing.tasks.filter(taskItem => taskItem.id !== taskId);

        listing = {
            ...listing,
            tasks: alterTasks
        };
    }
    
    function handleChangeDescription(task: ITask, ev: Event): void {
        const target = ev.target as HTMLInputElement;

        if (target.value.trim() === "") return;

        const hasTask = listing.tasks.some(taskItem => taskItem.description === target.value);

        if (hasTask) return;

        task = {
            ...task,
            description: target.value
        };

        const alterTaskListing = listing.tasks.map(taskItem => {
            if (taskItem.id === task.id) {
                return task;
            }

            return taskItem;
        });

        listing = {
            ...listing,
            tasks: [...alterTaskListing]
        };
    }
    
    function handleClickNewTask(): void {
        const createTask: ITask = {
            id: new Date().getTime(),
            description: "",
            done: false
        };

        listing = {
            ...listing,
            tasks: [...listing.tasks, createTask]
        };
        
        tick();
        isNewTask = true;
    }
    
    function handleChangeDone(task: ITask): void {
        task = {
            ...task,
            done: !task.done
        };

        const alterTaskListing = listing.tasks.map(taskItem => {
            if (taskItem.id === task.id) {
                return task;
            }

            return taskItem;
        });

        listing = {
            ...listing,
            tasks: [...alterTaskListing]
        }
    }

    function update(ev: HTMLInputElement) {
        if (isNewTask) ev.focus();

        isNewTask = false;
    }
</script>

<div class="flex flex-col gap-3 mt-4">
    <div>
        {#each listing.tasks.filter(taskItem => !taskItem.done) as task (task.id)}
            <div class="flex justify-between first:mt-0 mt-2 group">
                <div class="flex items-center gap-2">
                    <input
                        checked={task.done}
                        on:change={() => handleChangeDone(task)}
                        type="checkbox"
                        class="w-4 h-4"
                    />
                    <input
                        use:update
                        value={task.description}
                        on:change={(ev) => handleChangeDescription(task, ev)}
                        class="text-sm bg-systemDark text-systemWhite outline-none"
                    />
                </div>
                
                <button on:click={() => handleClickRemoveTask(task.id)} class="px-1 group-hover:block hidden">
                    <Icon icon="ic:round-close" class="text-systemGray" width="20" height="20" />
                </button>
            </div>
        {/each}

        {#if listing.tasks.some(taskItem => taskItem.done) && listing.tasks.some(taskItem => !taskItem.done)}
            <div class="w-full h-[1px] my-3 bg-systemGray/40" />
        {/if}

        {#each listing.tasks.filter(taskItem => taskItem.done) as task (task.id)}
            <div class="flex justify-between first:mt-0 mt-2 group">
                <div class="flex items-center gap-2">
                    <input
                        checked={task.done}
                        on:change={() => handleChangeDone(task)}
                        type="checkbox"
                        class="w-4 h-4"
                    />
                    <input
                        value={task.description}
                        on:change={(ev) => handleChangeDescription(task, ev)}
                        class="text-sm bg-systemDark text-systemWhite outline-none"
                    />
                </div>
                
                <button on:click={() => handleClickRemoveTask(task.id)} class="px-1 group-hover:block hidden">
                    <Icon icon="ic:round-close" class="text-systemGray" width="20" height="20" />
                </button>
            </div>
        {/each}
    </div>

    {#if isFocused || listing.id > 0}
        <button on:click={handleClickNewTask} class="flex items-center gap-2 text-sm bg-systemDark text-systemWhite">
            <Icon icon="ic:baseline-add" class="w-4 h-4 text-systemWhite" />
            <p>Novo item da lista</p>
        </button>
    {/if}
</div>