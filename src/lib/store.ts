import { writable } from 'svelte/store';
import type { IListing } from './models/listing.model';

function createListings() {
	const { subscribe, update } = writable<IListing[]>([
        {
            id: 1,
            title: 'Listing 1',
            tasks: [
                {
                    id: 1,
                    description: 'Description 1',
                    done: false
                },
                {
                    id: 2,
                    description: 'Description 3',
                    done: true
                },
                {
                    id: 3,
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
                    id: 4,
                    description: 'Description 2',
                    done: true
                }
            ]
        },
        {
            id: 3,
            title: 'Listing 2',
            tasks: [
                {
                    id: 4,
                    description: 'Description 2',
                    done: true
                }
            ]
        },
        {
            id: 4,
            title: 'Listing 2',
            tasks: [
                {
                    id: 4,
                    description: 'Description 2',
                    done: true
                }
            ]
        },
        {
            id: 5,
            title: 'Listing 2',
            tasks: [
                {
                    id: 4,
                    description: 'Description 2',
                    done: true
                }
            ]
        }
    ]);

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
		removeListing
	};
}

export const listings = createListings();
