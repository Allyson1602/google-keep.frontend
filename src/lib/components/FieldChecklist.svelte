<script lang="ts">
  import { EHttpCode } from "../enums/local-storage.enum";
    import type { IListing } from "../models/listing.model";
  import type { ITask } from "../models/task.model";
    import listingService from "../services/listing.service";
    import { listings } from "../store";
    import Icon from "@iconify/svelte";
    import { tick } from "svelte";

    let newListing: IListing = {
        id: 0,
        userId: 0,
        title: "",
        tasks: []
    };
    let isFocused = false;
    let isNewTask = false;

    function addListing(): void {
        listingService.addListing(newListing).then((response) => {
            if (response.status === EHttpCode.CREATED && response.data) {
                listings.addListing(response.data);
            }
        });

        clean();
        return;
    }
    
    function clean(): void {
        isFocused = false;

        newListing = {
            id: 0,
            userId: 0,
            title: '',
            tasks: []
        };
    }

    function handleClickConcluded(): void {
        addListing();
    }

    function handleChangeTitle(ev: Event): void {
        const target = ev.target as HTMLInputElement;

        if (target.value.trim() === "") return;

        newListing = {
            ...newListing,
            title: target.value
        }
    }
    
    function handleClickRemoveTask(taskId: number): void {
        const alterTasks: ITask[] = newListing.tasks.filter(taskItem => taskItem.id !== taskId);

        newListing = {
            ...newListing,
            tasks: alterTasks
        };
    }
    
    function handleChangeDescription(task: ITask, ev: Event): void {
        const target = ev.target as HTMLInputElement;

        if (target.value.trim() === "") return;

        const hasTask = newListing.tasks.some(taskItem => taskItem.description === target.value);

        if (hasTask) return;

        task = {
            ...task,
            description: target.value
        };

        const alterTaskListing = newListing.tasks.map(taskItem => {
            if (taskItem.id === task.id) {
                return task;
            }

            return taskItem;
        });

        newListing = {
            ...newListing,
            tasks: [...alterTaskListing]
        };
    }
    
    function handleClickNewTask(): void {
        const createTask: ITask = {
            id: new Date().getTime(),
            listing_id: 0,
            description: "",
            done: false
        };

        newListing = {
            ...newListing,
            tasks: [...newListing.tasks, createTask]
        };
        
        tick();
        isNewTask = true;
    }
    
    function handleChangeDone(task: ITask): void {
        task = {
            ...task,
            done: !task.done
        };

        const alterTaskListing = newListing.tasks.map(taskItem => {
            if (taskItem.id === task.id) {
                return task;
            }

            return taskItem;
        });

        newListing = {
            ...newListing,
            tasks: [...alterTaskListing]
        }
    }

    function update(ev: HTMLInputElement) {
        if (isNewTask) ev.focus();

        isNewTask = false;
    }
</script>

<div
    on:click={() => isFocused = true}
    on:keydown={() => isFocused = true}
    tabindex={30}
    role="button"
    class={(isFocused ? "min-h-[146px] " : "h-[46px] ") + "flex flex-col justify-between w-full max-w-[598px] mx-auto mt-4 mb-2 px-4 py-3 shadow-[0_1px_2px_0_rgba(0,0,0,0.6),_0_2px_6px_2px_rgba(0,0,0,0.302)] rounded-lg bg-systemDark border border-systemGray md:mt-8"}
>
    <div>
        <input
            value={newListing.title}
            on:change={handleChangeTitle}
            placeholder="Criar novo checklist..."
            class={"w-full px-1 text-base font-medium bg-systemDark text-systemWhite outline-none"}
        />
    </div>

    <div class="flex flex-col gap-3 mt-4">
        <div>
            {#each newListing.tasks.filter(taskItem => !taskItem.done) as task (task.id)}
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
    
            {#if newListing.tasks.some(taskItem => taskItem.done) && newListing.tasks.some(taskItem => !taskItem.done)}
                <div class="w-full h-[1px] my-3 bg-systemGray/40" />
            {/if}
    
            {#each newListing.tasks.filter(taskItem => taskItem.done) as task (task.id)}
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

        {#if isFocused}
            <button on:click={handleClickNewTask} class="flex items-center gap-2 text-sm bg-systemDark text-systemWhite">
                <Icon icon="ic:baseline-add" class="w-4 h-4 text-systemWhite" />
                <p>Novo item da lista</p>
            </button>
        {/if}
    </div>

    <div class={(isFocused ? "block " : "hidden ") + "self-end"}>
        <button on:click|stopPropagation={handleClickConcluded} class={"pt-2 px-6 text-systemWhiteLight hover:text-systemWhite"}>criar</button>
    </div>
</div>