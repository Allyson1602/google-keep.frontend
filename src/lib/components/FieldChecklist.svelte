<script lang="ts">
  import type { ITaskView } from "../models/task";
  import { tasks } from "../store";

    let title = '';
    let description = '';
    let isFocused = false;

    function validate(): boolean {
        return true;
    }

    function handleClickConcluded(): void {
        if (validate()) {
            isFocused = false;

            // criar requisição para adicionar task no bd
            const newTask: ITaskView = {
                title: title,
                description: description,
                done: false
            };
            // tasks.addTask(newTask);

            title = '';
            description = '';
        }
    }
</script>

<div
    on:click={() => isFocused = true}
    on:keydown={() => isFocused = true}
    tabindex={30}
    role="button"
    class={(isFocused ? "h-[146px] " : "h-[46px] ") + "flex flex-col justify-between w-full max-w-[598px] mx-auto mt-4 mb-2 px-4 py-3 shadow-[0_1px_2px_0_rgba(0,0,0,0.6),_0_2px_6px_2px_rgba(0,0,0,0.302)] rounded-lg bg-systemDark border border-systemGray md:mt-8"}
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
            class={(isFocused ? "py-3 " : "h-full ") + "w-full px-1 placeholder:font-medium bg-systemDark text-systemWhite outline-none"}
        />
    </div>

    <div class={(isFocused ? "block " : "hidden ") + "self-end"}>
        <button on:click|stopPropagation={handleClickConcluded} class={"pt-2 px-6 text-systemWhiteLight"}>concluir</button>
    </div>
</div>