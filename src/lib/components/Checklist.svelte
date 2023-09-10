<script lang="ts">
    import Icon from '@iconify/svelte';
    import { listings } from "../store";
    import type { IListingModel, ITask } from '../models/listing.model';
    import listingService from '../services/listing.service';
    import { tick } from 'svelte';

    let isNewTask = false;

    function removeListing(listingId: number) {
        listingService.removeListing(listingId);
    }
    
    function updateListing(listing: IListingModel) {
        listingService.updateListing(listing).then((response) => {
            if (response.status === 200 && response.data) {
                listings.updateListing(response.data);
            }
        });
    }
    
    function handleClickNewTask(listing: IListingModel): void {
        const createTask: ITask = {
            id: new Date().getTime(),
            description: "",
            done: false
        };

        const newTaskListing: IListingModel = {
            ...listing,
            tasks: [...listing.tasks, createTask]
        };

        listings.updateListing(newTaskListing);
        
        tick();
        isNewTask = true;
    }
    
    function handleChangeTitle(listing: IListingModel, ev: Event): void {
        const target = ev.target as HTMLInputElement;

        if (target.value.trim() === "") return;

        const newTitleListing: IListingModel = {
            ...listing,
            title: target.value
        }
        listings.updateListing(newTitleListing);
    }
    
    function handleClickRemoveTask(taskId: number, listing: IListingModel): void {
        const alterTasks: ITask[] = listing.tasks.filter(taskItem => taskItem.id !== taskId);

        const alterListing: IListingModel = {
            ...listing,
            tasks: alterTasks
        }

        listings.updateListing(alterListing);
    }
    
    function handleChangeDescription(task: ITask, listing: IListingModel, ev: Event): void {
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

        const alterListing: IListingModel = {
            ...listing,
            tasks: [...alterTaskListing]
        }

        listings.updateListing(alterListing);
    }
    
    function handleChangeDone(task: ITask, listing: IListingModel): void {
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

        const alterListing: IListingModel = {
            ...listing,
            tasks: [...alterTaskListing]
        }

        listings.updateListing(alterListing);
    }
    
    function handleClickRemoveListing(listingId: number): void {
        removeListing(listingId);
    }
    
    function handleClickUpdate(listing: IListingModel): void {
        updateListing(listing);
    }

    function update(ev: HTMLInputElement) {
        if (isNewTask) ev.focus();

        isNewTask = false;
    }
</script>

<div class="max-w-[1248px] mx-auto">
    {#if $listings.length > 0}
        <div class="flex gap-2 justify-center lg:justify-start flex-col md:flex-row lg:max-w-[752px] max-w-[504px] mx-auto w-full mt-6">
            {#each $listings as listing (listing.id)}
                <div class="flex flex-col justify-between gap-3 w-full md:w-[238px] px-4 py-3 mt-2 rounded-lg bg-systemDark border border-systemGray">
                    <div>
                        <div class="flex justify-between">
                            <input
                                value={listing.title}
                                on:change={(ev) => handleChangeTitle(listing, ev)}
                                class="bg-systemDark text-systemWhite outline-none"
                            >
    
                            <button on:click={() => handleClickRemoveListing(listing.id)} class="px-1">
                                <Icon icon="mdi:delete-outline" class="text-systemGray hover:text-red-700" width="25" height="25" />
                            </button>
                        </div>
    
                        <div class="flex flex-col gap-3 mt-4">
                            <div>
                                {#each listing.tasks.filter(taskItem => !taskItem.done) as task (task.id)}
                                    <div class="flex justify-between first:mt-0 mt-2 group">
                                        <div class="flex items-center gap-2">
                                            <input
                                                checked={task.done}
                                                on:change={() => handleChangeDone(task, listing)}
                                                type="checkbox"
                                                class="w-4 h-4"
                                            />
                                            <input
                                                use:update
                                                value={task.description}
                                                on:change={(ev) => handleChangeDescription(task, listing, ev)}
                                                class="text-sm bg-systemDark text-systemWhite outline-none"
                                            />
                                        </div>
                                        
                                        <button on:click={() => handleClickRemoveTask(task.id, listing)} class="px-1 group-hover:block hidden">
                                            <Icon icon="ic:round-close" class="text-systemGray" width="20" height="20" />
                                        </button>
                                    </div>
                                {/each}

                                {#if listing.tasks.some(taskItem => taskItem.done)}
                                    <div class="w-full h-[1px] my-3 bg-systemGray/40" />
                                {/if}

                                {#each listing.tasks.filter(taskItem => taskItem.done) as task (task.id)}
                                    <div class="flex justify-between first:mt-0 mt-2 group">
                                        <div class="flex items-center gap-2">
                                            <input
                                                checked={task.done}
                                                on:change={() => handleChangeDone(task, listing)}
                                                type="checkbox"
                                                class="w-4 h-4"
                                            />
                                            <input
                                                value={task.description}
                                                on:change={(ev) => handleChangeDescription(task, listing, ev)}
                                                class="text-sm bg-systemDark text-systemWhite outline-none"
                                            />
                                        </div>
                                        
                                        <button on:click={() => handleClickRemoveTask(task.id, listing)} class="px-1 group-hover:block hidden">
                                            <Icon icon="ic:round-close" class="text-systemGray" width="20" height="20" />
                                        </button>
                                    </div>
                                {/each}
                            </div>

                            <div>
                                <button on:click={(ev) => handleClickNewTask(listing)} class="flex items-center gap-2 text-sm bg-systemDark text-systemWhite">
                                    <Icon icon="ic:baseline-add" class="w-4 h-4 text-systemWhite" />
                                    <p>Novo item da lista</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class={"self-end"}>
                        <button on:click={() => handleClickUpdate(listing)} class={"pt-2 px-1 text-systemWhiteLight"}>atualizar</button>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="flex flex-col items-center mt-40">
            <div class="m-5">
                <Icon icon="mdi:lightbulb-outline" class="w-28 h-28 text-systemWhite/10" />
            </div>
            <p class="text-xl text-systemWhite/50 text-center">As notas adicionadas são exibidas aqui</p>
        </div>
    {/if}
</div>