<script lang="ts">
    import Icon from '@iconify/svelte';
    import { tasks } from "../store";
</script>

<div>
    {#if $tasks.length > 0}
        <div class="w-full max-w-[598px] mx-auto mt-6">
            {#each $tasks as task (task.id)}
                <div class="px-4 py-3 mt-2 rounded-lg bg-systemDark border border-systemGray">
                    <p class="text-base font-medium text-systemWhiteLight">{task.title}</p>

                    <div class="flex flex-col gap-2 mt-3">
                        <div class="flex items-center gap-2">
                            <input
                                id="description"
                                type="checkbox"
                                class="w-[18px] h-[18px] text-blue-600 bg-systemDark border-systemGray rounded"
                            />
                            <label for="description" class="text-systemWhiteLight">{task.description}</label>
                        </div>
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