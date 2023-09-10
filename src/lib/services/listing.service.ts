import ApiRestClient, { type IResponse } from "../axios.config";
import type { IListing } from "../models/listing.model";

export interface IListingService {
    listListingsByUserId: (userId: number) => IResponse<IListing[]>;
    addListing: (userId: number, listing: IListing) => IResponse<IListing>;
    updateListing: (listing: IListing) => IResponse<IListing>;
    removeListing: (id: number) => IResponse<boolean>;
}

class ListingService extends ApiRestClient implements IListingService {
    listListingsByUserId = (userId: number): IResponse<IListing[]> => {
        return this.get(`/listing/user/${userId}`);
    };
    
    addListing = (userId: number, listing: IListing): IResponse<IListing> => {
        return this.post(`/listing/user/${userId}`, listing);
    };

    updateListing = (listing: IListing): IResponse<IListing> => {
        return this.put(`/listing/${listing.id}`, listing);
    };

    removeListing = (id: number): IResponse<boolean> => {
        return this.delete(`/listing`, id);
    };
}

export default new ListingService();