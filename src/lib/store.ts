import { writable } from 'svelte/store';
import type { IListingModel } from './models/listing.model';

function createListings() {
	const { subscribe, update } = writable<IListingModel[]>([
        {
            id: 1,
            title: 'Listing 1',
            tasks: [
                {
                    description: 'Description 1',
                    done: false
                },
                {
                    description: 'Description 3',
                    done: false
                },
                {
                    description: 'Description 4',
                    done: false
                }
            ]
        },
        {
            id: 2,
            title: 'Listing 2',
            tasks: [
                {
                    description: 'Description 2',
                    done: false
                }
            ]
        }
    ]);

    function addListing(listing: IListingModel) {
        update(listings => [...listings, listing]);
    }

    function updateListing(listing: IListingModel) {
        update(listings => listings.map(listingItem => listingItem.id === listing.id ? listing : listingItem));
    }

    function removeListing(id: number) {
        update(listings => listings.filter(listingItem => listingItem.id !== id));
    }

	return {
		subscribe,
		addListing,
		updateListing,
		removeListing
	};
}

export const listings = createListings();
