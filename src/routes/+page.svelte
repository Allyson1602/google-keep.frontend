<script lang="ts">
    import '../app.css';
    import Checklist from '../lib/components/Checklist.svelte';
    import FieldChecklist from '../lib/components/FieldChecklist.svelte';
</script>

<main class="px-2">
    <header>
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