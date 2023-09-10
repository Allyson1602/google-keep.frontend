<script lang="ts">
    import '../app.css';
    import Checklist from '../lib/components/Checklist.svelte';
    import FieldChecklist from '../lib/components/FieldChecklist.svelte';
</script>

<main class="px-2 min-w-[250px]">
    <header>
        <FieldChecklist />
    </header>

    <div>
        <Checklist />
    </div>
</main>
  
<style lang="postcss">
    :global(html) {
        background-color: theme(colors.systemDark);
    }
</style>