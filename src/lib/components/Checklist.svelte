<script lang="ts">
    import Icon from '@iconify/svelte';
    import { tasks } from "../store";
</script>

<div>
    <div class="flex flex-col items-center mt-40">
        <div class="m-5">
            <Icon icon="mdi:lightbulb-outline" class="w-28 h-28 text-systemWhite/10" />
        </div>
        <p class="text-xl text-systemWhite/50 text-center">As notas adicionadas são exibidas aqui</p>
    </div>

    <div>
        {#each $tasks as task (task.id)}
            <p class="text-white">{task.title}</p>
        {/each}
    </div>
</div>