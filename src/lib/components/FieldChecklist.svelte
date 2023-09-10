<script lang="ts">
    import type { AxiosResponse } from "axios";
    import type { IListingModel, IListingView } from "../models/listing.model";
    import listingService from "../services/listing.service";
    import { listings } from "../store";
    import FieldTask from "./FieldTask.svelte";

    let newListing: IListingView = {
        title: "",
        tasks: []
    };
    let isFocused = false;

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

        newListing = {
            title: '',
            tasks: []
        };
    }

    function addListing(): void {
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

    function handleChangeTitle(ev: Event): void {
        const target = ev.target as HTMLInputElement;

        if (target.value.trim() === "") return;

        newListing = {
            ...newListing,
            title: target.value
        }
    }
</script>

<div
    on:click={() => isFocused = true}
    on:keydown={() => isFocused = true}
    tabindex={30}
    role="button"
    class={(isFocused ? "min-h-[146px] " : "h-[46px] ") + "flex flex-col justify-between w-full max-w-[598px] mx-auto mt-4 mb-2 px-4 py-3 shadow-[0_1px_2px_0_rgba(0,0,0,0.6),_0_2px_6px_2px_rgba(0,0,0,0.302)] rounded-lg bg-systemDark border border-systemGray md:mt-8"}
>
    <div>
        <input
            value={newListing.title}
            on:change={handleChangeTitle}
            placeholder="Criar novo checklist..."
            class={"w-full px-1 text-base font-medium bg-systemDark text-systemWhite outline-none"}
        />
    </div>

    <FieldTask isFocused={isFocused} />

    <div class={(isFocused ? "block " : "hidden ") + "self-end"}>
        <button on:click|stopPropagation={handleClickConcluded} class={"pt-2 px-6 text-systemWhiteLight"}>criar</button>
    </div>
</div>