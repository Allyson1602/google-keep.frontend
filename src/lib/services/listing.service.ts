import ApiRestClient, { type IResponse } from "../axios.config";
import type { IListing } from "../models/listing.model";

export interface IListingService {
    listListings: () => IResponse<IListing[]>;
    addListing: (listing: IListing) => IResponse<IListing>;
    updateListing: (listing: IListing) => IResponse<IListing>;
    removeListing: (id: number) => IResponse<boolean>;
}

class ListingService extends ApiRestClient implements IListingService {
    listListings = (): IResponse<IListing[]> => {
        return this.get("listings");
    };
    
    addListing = (listing: IListing): IResponse<IListing> => {
        return this.post("listings", listing);
    };

    updateListing = (listing: IListing): IResponse<IListing> => {
        return this.patch(`listings/${listing.id}`, listing);
    };

    removeListing = (id: number): IResponse<boolean> => {
        return this.delete("listings", id);
    };
}

export default new ListingService();