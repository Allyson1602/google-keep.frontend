<script lang="ts">
    import '../app.css';
    import Checklist from '../lib/components/Checklist.svelte';
    import FieldChecklist from '../lib/components/FieldChecklist.svelte';
</script>

<main>
    <header class="px-1">
        <FieldChecklist />
    </header>

    <div>
        <!-- {#each [] as {}} -->
            <Checklist />
        <!-- {/each} -->
    </div>
</main>
  
<style lang="postcss">
    :global(html) {
        background-color: theme(colors.systemDark);
    }
</style>