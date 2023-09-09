<script lang="ts">
    let description = '';
</script>

<div class="flex justify-center">
    <input
        bind:value={description}
        placeholder="Criar uma nota..."
        class="w-full h-[46px] max-w-[409px] mt-4 mb-2 px-4 py-3 shadow rounded-lg bg-systemDark border border-systemGray placeholder:text-base placeholder:font-medium"
    />
</div>