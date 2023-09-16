import type { IAuthKey } from "../../auth.config";
import ApiRestClient, { type IResponse } from "../axios.config";
import { EHttpCode, ELocalStorage } from "../enums/local-storage.enum";
import type { IListing } from "../models/listing.model";

export interface IListingService {
    listListings: (id: number) => IResponse<IListing[]>;
    addListing: (listing: IListing) => IResponse<IListing>;
    updateListing: (listing: IListing) => IResponse<IListing>;
    removeListing: (id: number) => IResponse<boolean>;
}

class ListingService extends ApiRestClient implements IListingService {
    listListings = (id: number): IResponse<IListing[]> => {
        return this.get("listings", { id });
    };
    
    addListing = (listing: IListing): IResponse<IListing> => {
        return new Promise((resolve, reject) => {
            this.post<IListing & IAuthKey>("listings", listing)
                .then((response) => {
                    if (response.status === EHttpCode.CREATED) {
                        const authKeyStorage = localStorage.getItem(ELocalStorage.AUTH_KEY);
                        if (!authKeyStorage && response.data.key) {
                            localStorage.setItem(ELocalStorage.AUTH_KEY, response.data.key);
                            localStorage.setItem(ELocalStorage.USER_ID, (response.data.user_id).toString());
                        }
                    }

                    delete response.data.key;

                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    updateListing = (listing: IListing): IResponse<IListing> => {
        return this.patch(`listings/${listing.id}`, listing);
    };

    removeListing = (id: number): IResponse<boolean> => {
        return this.delete("listings", id);
    };
}

export default new ListingService();