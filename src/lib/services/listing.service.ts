import type { IAuthKey } from "../../auth.config";
import ApiRestClient, { axiosInstance, type IResponse } from "../axios.config";
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
        return new Promise((resolve, reject) => {
            this.get<IListing[]>(`listings/${id}`)
            .then((response) => {
                const data = response.data = response.data.map((listingItem) => {
                    const tasksList = listingItem.tasks = listingItem.tasks.map((taskItem) => {
                        return {
                            ...taskItem,
                            listing: (taskItem.listing as unknown as IListing).id
                        }
                    });

                    return {
                        ...listingItem,
                        tasks: tasksList
                    }
                });
                
                response.data = data;
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    };
    
    addListing = (listing: IListing): IResponse<IListing> => {
        const userIdStorage = localStorage.getItem(ELocalStorage.USER_ID);
        if (userIdStorage) {
            listing.user = parseInt(userIdStorage);
        }

        return new Promise((resolve, reject) => {
            this.post<IListing & IAuthKey>("listings", listing)
                .then((response) => {
                    if (response.status === EHttpCode.CREATED) {
                        const authKeyStorage = localStorage.getItem(ELocalStorage.AUTH_KEY);
                        if (!authKeyStorage && response.data.key) {
                            localStorage.setItem(ELocalStorage.AUTH_KEY, response.data.key);
                            localStorage.setItem(ELocalStorage.USER_ID, (response.data.user).toString());
                            
                            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.key}`;
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