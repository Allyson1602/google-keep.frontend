import ApiRestClient, { type IResponse } from "../axios.config";
import type { IListingModel, IListingView } from "../models/listing.model";

export interface IListingService {
    listListingsByUserId: (userId: number) => IResponse<IListingModel[]>;
    addListing: (userId: number, listing: IListingView) => IResponse<IListingModel>;
    updateListing: (id: number, listing: IListingModel) => IResponse<IListingModel>;
    deleteListing: (id: number) => IResponse<boolean>;
}

class ListingService extends ApiRestClient implements IListingService {
    listListingsByUserId = (userId: number): IResponse<IListingModel[]> => {
        return this.get(`/listing/user/${userId}`);
    };
    
    addListing = (userId: number, listing: IListingView): IResponse<IListingModel> => {
        return this.post(`/listing/user/${userId}`, listing);
    };

    updateListing = (id: number, listing: IListingModel): IResponse<IListingModel> => {
        return this.put(`/listing/${id}`, listing);
    };

    deleteListing = (id: number): IResponse<boolean> => {
        return this.delete(`/listing`, id);
    };
}

export default new ListingService();