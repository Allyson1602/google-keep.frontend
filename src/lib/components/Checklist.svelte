<script lang="ts">
    import Icon from '@iconify/svelte';
    import { listings } from "../store";
  import type { IListingModel } from '../models/listing.model';
    
    function handleChangeTitle(listing: IListingModel ,ev: Event): void {
        const target = ev.target as HTMLInputElement;

        if (target.value.trim() === "") return;

        listings.updateListing(listing); // salvar o banco quando clicar em concluir
    }
</script>

<div class="max-w-[1248px] mx-auto">
    {#if $listings.length > 0}
        <div class="flex gap-2 justify-center lg:justify-start flex-col md:flex-row lg:max-w-[752px] max-w-[504px] mx-auto w-full mt-6">
            {#each $listings as listing (listing.id)}
                <div class="w-full md:w-[238px] px-4 py-3 mt-2 rounded-lg bg-systemDark border border-systemGray">
                    <input
                        value={listing.title}
                        on:change={(ev) => handleChangeTitle(listing, ev)}
                        class="bg-systemDark text-systemWhite outline-none"
                    >

                    <div class="flex flex-col gap-2 mt-3">
                        {#each listing.tasks as task (task.description)}
                            <div class="flex items-center gap-2">
                                <input
                                    id="description"
                                    type="checkbox"
                                    class="w-[18px] h-[18px]"
                                />
                                <label for="description" class="text-systemWhiteLight text-sm">{task.description}</label>
                            </div>
                        {/each}
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