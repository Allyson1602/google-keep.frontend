<script lang="ts">
    let title = '';
    let description = '';
    let isFocused = false;
</script>

<div
    on:click={() => isFocused = true}
    on:keydown={() => isFocused = true}
    tabindex={30}
    role="button"
    class={(isFocused ? "h-[146px] " : "h-[46px] ") + "flex flex-col justify-between w-full max-w-[598px] mx-auto mt-4 mb-2 px-4 py-3 shadow rounded-lg bg-systemDark border border-systemGray md:mt-8"}
>
    <div>
        <input
            bind:value={title}
            placeholder="Título"
            class={(isFocused ? "block " : "hidden ") + "w-full px-1 pb-3 text-base font-medium bg-systemDark text-systemWhite outline-none"}
        />
    
        <input
            bind:value={description}
            placeholder="Criar uma nota..."
            class={(isFocused ? "py-3 " : "h-full ") + "w-full px-1 placeholder:font-medium bg-systemDark text-systemWhite text-sm outline-none"}
        />
    </div>

    <div class={(isFocused ? "block " : "hidden ") + "self-end"}>
        <button on:click|stopPropagation={() => isFocused = false} class={"pt-2 px-6 text-systemWhiteLight"}>concluir</button>
    </div>
</div>