import { writable } from 'svelte/store';
import type { IListing } from './models/listing.model';

function createListings() {
	const { subscribe, update, set } = writable<IListing[]>([]);
    function addListing(listing: IListing) {
        update(listings => [...listings, listing]);
    }

    function updateListing(listing: IListing) {
        update(listings => listings.map(listingItem => listingItem.id === listing.id ? listing : listingItem));
    }

    function removeListing(id: number) {
        update(listings => listings.filter(listingItem => listingItem.id !== id));
    }

	return {
		subscribe,
		addListing,
		updateListing,
        set,
		removeListing
	};
}

export const listings = createListings();
