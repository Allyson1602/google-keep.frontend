<script lang="ts">
    import Icon from '@iconify/svelte';
    import { listings } from "../store";
    import type { IListing } from '../models/listing.model';
    import listingService from '../services/listing.service';
    import { tick } from 'svelte';
    import type { ITask } from '../models/task.model';
    import taskService from '../services/task.service';
    import { EHttpCode } from '../enums/local-storage.enum';
  

    let isNewTask = false;
    let updatedListings: number[] = [];

    function removeListing(listingId: number): void {
        listingService.removeListing(listingId).then((response) => {
            if (response.status === EHttpCode.OK && response.data) {
                listings.removeListing(listingId);
            }
        });
    }

    function updateListing(listing: IListing): void {
        listingService.updateListing(listing).then((response) => {
            if (response.status === EHttpCode.OK && response.data) {
                listings.updateListing(response.data);
                updatedListings = [...updatedListings, listing.id];
            }
        });
    }

    function addTask(task: ITask, listing: IListing): void {
        taskService.addTask(task).then((response) => {
            if (response.status === EHttpCode.CREATED && response.data) {
                const newTaskListing: IListing = {
                    ...listing,
                    tasks: [...listing.tasks, response.data]
                };

                listings.updateListing(newTaskListing);
                updatedListings = [...updatedListings, listing.id];
                
                tick();
                isNewTask = true;
            }
        });
    }

    function updateTask(task: ITask, listing: IListing): void {
        taskService.updateTask(task).then((response) => {
            if (response.status === EHttpCode.OK && response.data) {
                const alterTaskListing = listing.tasks.map(taskItem => {
                    if (taskItem.id === task.id) {
                        return task;
                    }

                    return taskItem;
                });

                const alterListing: IListing = {
                    ...listing,
                    tasks: [...alterTaskListing]
                }

                listings.updateListing(alterListing);
                updatedListings = [...updatedListings, listing.id];
            }
        });
    }

    function removeTask(taskId: string, listing: IListing): void {
        taskService.removeTask(taskId).then((response) => {
            if (response.status === EHttpCode.OK && response.data) {
                const alterListing: IListing = {
                    ...listing,
                    tasks: listing.tasks.filter(taskItem => taskItem.id !== taskId)
                };

                listings.updateListing(alterListing);
                updatedListings = [...updatedListings, listing.id];
            }
        });
    }
    
    function handleClickNewTask(listing: IListing): void {
        const createTask: ITask = {
            id: self.crypto.randomUUID(),
            listing: listing.id,
            description: "",
            done: false
        };

        addTask(createTask, listing);
    }
    
    function handleChangeTitle(listing: IListing, ev: Event): void {
        const target = ev.target as HTMLInputElement;

        if (target.value.trim() === "") return;
        
        const newTitleListing: IListing = {
            ...listing,
            title: target.value
        }

        updateListing(newTitleListing);
    }
    
    function handleClickRemoveTask(taskId: string, listing: IListing): void {
        removeTask(taskId, listing);
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

        updateTask(task, listing);
    }
    
    function handleChangeDone(task: ITask, listing: IListing): void {
        task = {
            ...task,
            done: !task.done
        };

        updateTask(task, listing);
    }
    
    function handleClickRemoveListing(listingId: number): void {
        removeListing(listingId);
    }
    
    function handleClickUpdate(listing: IListing): void {
        updatedListings = updatedListings.filter(updatedListingItem => updatedListingItem !== listing.id);
    }

    function update(ev: HTMLInputElement) {
        if (isNewTask) ev.focus();

        isNewTask = false;
    }
</script>

<div class="max-w-[1248px] mx-auto">
    {#if $listings.length > 0}
        <div class="flex gap-2 flex-wrap justify-center lg:justify-start flex-col md:flex-row lg:max-w-[752px] max-w-[504px] mx-auto w-full mt-6">
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
                                {#if listing.tasks?.length > 0}
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

                                    {#if listing.tasks.some(taskItem => taskItem.done) && listing.tasks.some(taskItem => !taskItem.done)}
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
                                {/if}
                            </div>

                            <div>
                                <button on:click={() => handleClickNewTask(listing)} class="flex items-center gap-2 text-sm bg-systemDark text-systemWhite">
                                    <Icon icon="ic:baseline-add" class="w-4 h-4 text-systemWhite" />
                                    <p>Novo item da lista</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class={"self-end"}>
                        {#if updatedListings.some(updatedListingItem => updatedListingItem === listing.id)}
                            <button on:click={() => handleClickUpdate(listing)} class={"pt-2 px-1 text-systemWhiteLight hover:text-systemWhite"}>atualizar</button>
                        {/if}
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