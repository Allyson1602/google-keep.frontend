import { writable } from 'svelte/store';
import type { IListingModel } from './models/listing.model';

function createListings() {
	const { subscribe, update } = writable<IListingModel[]>([
        {
            id: 1,
            title: 'Listing 1',
            tasks: [
                {
                    id: new Date().getTime() + parseInt(crypto.randomUUID()),
                    description: 'Description 1',
                    done: false
                },
                {
                    id: new Date().getTime() + parseInt(crypto.randomUUID()),
                    description: 'Description 3',
                    done: true
                },
                {
                    id: new Date().getTime() + parseInt(crypto.randomUUID()),
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
                    id: new Date().getTime() + parseInt(crypto.randomUUID()),
                    description: 'Description 2',
                    done: true
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
