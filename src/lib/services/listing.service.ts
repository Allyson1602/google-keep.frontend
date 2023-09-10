import ApiRestClient, { type IResponse } from "../axios.config";
import type { IListingModel, IListingView } from "../models/listing.model";

export interface IListingService {
    listListingsByUserId: (userId: number) => IResponse<IListingModel[]>;
    addListing: (userId: number, listing: IListingView) => IResponse<IListingModel>;
    updateListing: (listing: IListingModel) => IResponse<IListingModel>;
    removeListing: (id: number) => IResponse<boolean>;
}

class ListingService extends ApiRestClient implements IListingService {
    listListingsByUserId = (userId: number): IResponse<IListingModel[]> => {
        return this.get(`/listing/user/${userId}`);
    };
    
    addListing = (userId: number, listing: IListingView): IResponse<IListingModel> => {
        return this.post(`/listing/user/${userId}`, listing);
    };

    updateListing = (listing: IListingModel): IResponse<IListingModel> => {
        return this.put(`/listing/${listing.id}`, listing);
    };

    removeListing = (id: number): IResponse<boolean> => {
        return this.delete(`/listing`, id);
    };
}

export default new ListingService();