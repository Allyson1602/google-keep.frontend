<script lang="ts">
    import Icon from '@iconify/svelte';
    import { listings } from "../store";
    import type { IListingModel } from '../models/listing.model';
    import listingService from '../services/listing.service';
    import FieldTask from './FieldTask.svelte';

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
    
    function handleChangeTitle(listing: IListingModel, ev: Event): void {
        const target = ev.target as HTMLInputElement;

        if (target.value.trim() === "") return;

        const newTitleListing: IListingModel = {
            ...listing,
            title: target.value
        }
        listings.updateListing(newTitleListing);
    }
    
    function handleClickRemoveListing(listingId: number): void {
        removeListing(listingId);
    }
    
    function handleClickUpdate(listing: IListingModel): void {
        updateListing(listing);
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
    
                        <FieldTask listing={listing} />
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