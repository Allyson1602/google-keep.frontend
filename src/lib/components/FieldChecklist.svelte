<script lang="ts">
    import type { AxiosResponse } from "axios";
    import type { IListingModel, IListingView } from "../models/listing.model";
    import listingService from "../services/listing.service";
    import { listings } from "../store";

    let title = '';
    let description = '';
    let isFocused = false;

    function validate(): boolean {
        if (!title) return false;
        if (!description) return false;

        return true;
    }

    function getUserId(): number {
        let userId = localStorage.getItem("userid");

        if (!userId) {
            localStorage.setItem("userid", crypto.randomUUID());
            userId = localStorage.getItem("userid");
        }

        return parseInt(userId!);
    }
    
    function clean(): void {
        isFocused = false;
        title = '';
        description = '';
    }

    function addListing(): void {
        if (!validate()) return;

        const newListing: IListingView = {
            title: title,
            tasks: [
                {
                    description: description,
                    done: false
                }
            ]
        };

        listingService.addListing(getUserId(), newListing).then((response: AxiosResponse<IListingModel>) => {
            if (response.status === 201 && response.data) {
                listings.addListing(response.data);
            }
        });

        clean();
        return;
    }

    function handleClickConcluded(): void {
        addListing();
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