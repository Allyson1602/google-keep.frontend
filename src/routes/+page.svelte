<script lang="ts">
    import '../app.css';
    import FieldChecklist from '../components/FieldChecklist.svelte';
    import Checklist from '../components/Checklist.svelte';
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