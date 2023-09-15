import type { IAuthKey } from "../../auth.config";
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
        return new Promise((resolve, reject) => {
            this.post<IListing & IAuthKey>("listings", listing)
                .then((response) => {
                    if (response.status === 201) {
                        const authKeyStorage = localStorage.getItem("authKey");
                        if (!authKeyStorage && response.data.key) {
                            localStorage.setItem("authKey", response.data.key);
                        }
                    }

                    delete response.data.key;

                    console.log(response.data.key);
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