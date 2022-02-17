import { API_URL } from "@env";

import { fetcher, prettyPrint } from '@u';

async function getList(options) {
    const response = await fetcher.get(`${API_URL}/apartments`, {
        query: {
            represent: 'list',
            represent_list_type: 'user',
            ...options
        }
    })

    return response;
}

async function getMyApartments(options) {
    const response = await fetcher.get(`${API_URL}/apartments`, {
        query: {
            represent: 'list',
            represent_list_type: 'owner',
            ...options
        }
    })

    return response;
}

async function getCoordinates(options) {
    const response = await fetcher.get(`${API_URL}/apartments`, {
        query: {
            represent: 'coordinates',
            ...options
        }
    });

    return response;
}

async function getApartment(id, represent = 'user') {
    const response = await fetcher.get(`${API_URL}/apartments/${id}`, {
        query: {
            represent
        }
    });

    return response;
}

async function getApartmentRentsPeriod(id, startDate, endDate) {
    const response = await fetcher.get(`${API_URL}/apartments/${id}/not_free_periods`, {
        query: {
            check_start_date: startDate,
            check_end_date: endDate
        }
    })

    return response;
}

async function getFavoriteApartments(options) {
    const response = await fetcher.get(`${API_URL}/users/current/apartments/favorites`, options);

    return response;
}

async function getCities() {
    const response = await fetcher.get(`${API_URL}/cities`);

    return response;
}

async function getStreets(cityId) {
    const response = await fetcher.get(`${API_URL}/streets`, {
        query: {
            cities_ids: [cityId]
        }
    });

    return response;
}

async function getHouses(cityId, streetId) {
    const response = await fetcher.get(`${API_URL}/houses`, {
        query: {
            cities_ids: [cityId],
            streets_ids: [streetId]
        }
    })

    return response;
}

async function getCategories() {
    const response = await fetcher.get(`${API_URL}/apartments/categories`);

    return response;
}

async function getReviews(apartmentId) {
    const response = await fetcher.get(`${API_URL}/apartments/${apartmentId}/reviews`);

    return response;
}

async function getDraft(apartmentId) {
    // const response = await fetcher.get(`${API_URL}/apartments/${apartmentId}/draft`);
    const response = await fetcher.get(`${API_URL}/apartments/${apartmentId}/draft`);

    return response;
}

async function updateApartment(id, options) {
    const response = await fetcher.put(`${API_URL}/apartments/${id}`, options);

    return response;
}

async function updateApartmentChecklist(id, options) {
    const response = await fetcher.put(`${API_URL}/apartments/${id}/checklist`, options);

    return response;
}

async function cancelApartmentDeletedImages(id, ids) {
    const response = await fetcher.del(`${API_URL}/apartments/${id}/images/draft/deleted`, {
        query: {
            apartments_images_ids: ids
        }
    });

    return response;
}

async function addToFavorites(options) {
    const response = await fetcher.post(`${API_URL}/apartments/favorites`, options)

    return response;
}

async function addApartmentNewImages(id, options) {
    const response = await fetcher.post(`${API_URL}/apartments/${id}/images`, options, { type: 'multipart' });

    return response;
}

async function addRent(id, options) {
    const response = await fetcher.post(`${API_URL}/apartments/${id}/rents`, options);

    return response;
}

async function deleteFromFavorites(id, query, options = {}) {
    const response = await fetcher.del(`${API_URL}/apartments/favorites/${id}`, { query, options });

    return response;
}

async function getFacilities() {
    const response = await fetcher.get(`${API_URL}/checklist`);

    return response;
}

async function deleteApartmentImages(id, ids) {
    const response = await fetcher.del(`${API_URL}/apartments/${id}/images`, {
        query: {
            ids
        }
    });

    return response;
}

async function deleteApartmentNewImages(id, ids) {
    const response = await fetcher.del(`${API_URL}/apartments/${id}/images/draft/created`, {
        query: {
            ids
        }
    });

    return response;
}

export {
    getList,
    getMyApartments,
    getCoordinates,
    getApartment,
    getApartmentRentsPeriod,
    getFavoriteApartments,
    getCities,
    getStreets,
    getHouses,
    getCategories,
    getReviews,
    getFacilities,
    getDraft,
    addToFavorites,
    addApartmentNewImages,
    addRent,
    updateApartment,
    updateApartmentChecklist,
    cancelApartmentDeletedImages,
    deleteFromFavorites,
    deleteApartmentImages,
    deleteApartmentNewImages
};