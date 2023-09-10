<script lang="ts">
    import type { AxiosResponse } from "axios";
    import type { IListing, ITask } from "../models/listing.model";
    import listingService from "../services/listing.service";
    import { listings } from "../store";
    import Icon from "@iconify/svelte";
    import { tick } from "svelte";

    let newListing: IListing = {
        id: 0,
        title: "",
        tasks: []
    };
    let isFocused = false;
    let isNewTask = false;

    function getUserId(): number {
        let userId = localStorage.getItem("userid");

        if (!userId) {
            localStorage.setItem("userid", crypto.randomUUID());
            userId = localStorage.getItem("userid");
        }

        return parseInt(userId!);
    }
    
    function clean(): void {
        isFocused = false;

        newListing = {
            id: 0,
            title: '',
            tasks: []
        };
    }

    function addListing(): void {
        console.log(newListing);

        listingService.addListing(getUserId(), newListing).then((response: AxiosResponse<IListing>) => {
            if (response.status === 201 && response.data) {
                listings.addListing(response.data);
            }
        });

        clean();
        return;
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
    
    function handleClickRemoveTask(taskId: number, listing: IListing): void {
        const alterTasks: ITask[] = listing.tasks.filter(taskItem => taskItem.id !== taskId);

        newListing = {
            ...listing,
            tasks: alterTasks
        };
    }
    
    function handleChangeDescription(task: ITask, listing: IListing, ev: Event): void {
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

        newListing = {
            ...listing,
            tasks: [...alterTaskListing]
        };
    }
    
    function handleClickNewTask(listing: IListing): void {
        const createTask: ITask = {
            id: new Date().getTime(),
            description: "",
            done: false
        };

        newListing = {
            ...listing,
            tasks: [...listing.tasks, createTask]
        };
        
        tick();
        isNewTask = true;
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
        {#each newListing.tasks as task (task.id)}
            <div class="flex justify-between first:mt-0 mt-2 group">
                <input
                    use:update
                    value={task.description}
                    on:change={(ev) => handleChangeDescription(task, newListing, ev)}
                    class="text-sm bg-systemDark text-systemWhite outline-none"
                />
                
                <button on:click={() => handleClickRemoveTask(task.id, newListing)} class="px-1 group-hover:block hidden">
                    <Icon icon="ic:round-close" class="text-systemGray" width="20" height="20" />
                </button>
            </div>
        {/each}

        {#if isFocused}
            <button on:click={(ev) => handleClickNewTask(newListing)} class="flex items-center gap-2 text-sm bg-systemDark text-systemWhite">
                <Icon icon="ic:baseline-add" class="w-4 h-4 text-systemWhite" />
                <p>Novo item da lista</p>
            </button>
        {/if}
    </div>

    <div class={(isFocused ? "block " : "hidden ") + "self-end"}>
        <button on:click|stopPropagation={handleClickConcluded} class={"pt-2 px-6 text-systemWhiteLight hover:text-systemWhite"}>criar</button>
    </div>
</div>