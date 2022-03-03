import * as apartmentsRepository from '@r/apartmentsRepository';
import * as apartmentsMockRepo from "@r/apartmentsRepoMock";


async function getList(options) {
    const response = await apartmentsRepository.getList(options);

    return response;
}

async function getMyApartments(options) {
    const response = await apartmentsRepository.getMyApartments(options);

    return response;
}

async function getCoordinates(options) {
    const { error, payload, status } = await apartmentsRepository.getCoordinates(options);

    if (error) return { error, payload, status };

    const tmp = [];

    const items = payload.items;

    while (items.length > 0) {
        const first = items.splice(0, 1)[0];

        const group = {
            ids: [first.id],
            minPrice: first.price,
            coordinates: {
                latitude: first.latitude,
                longitude: first.longitude
            }
        };

        let i = 0;

        while (i < items.length) {
            const second = items[i];

            if (
                Math.abs(first.latitude - second.latitude) < 0.001 &&
                Math.abs(first.longitude - second.longitude) < 0.001
            ) {
                group.ids.push(second.id);

                if (second.price < group.minPrice) {
                    group.minPrice = second.price;
                }

                items.splice(i, 1);
            } else {
                i++;
            }
        }

        tmp.push(group);
    }

    payload.items = tmp;

    return { error, payload, status };
}

async function getApartment(id, represent) {
    const response = await apartmentsRepository.getApartment(id, represent);

    return response;
}

async function getApartmentRentsPeriod(id, startDate, endDate) {
    const response = await apartmentsRepository.getApartmentRentsPeriod(id, startDate, endDate);

    return response;
}

async function getFavoriteApartments(options) {
    const response = await apartmentsRepository.getFavoriteApartments(options);

    return response;
}

async function getCities(options) {
    //const response = await apartmentsRepository.getCities(options);
    const response = await apartmentsMockRepo.getCities()

    return response;
}

async function getStreets(cityId) {
    const response = await apartmentsRepository.getStreets(cityId);

    return response;
}

async function getHouses(cityId, streetId) {
    const response = await apartmentsRepository.getHouses(cityId, streetId);

    return response;
}

async function getCategories() {
    const response = await apartmentsRepository.getCategories();

    return response;
}

async function getReviews(apartmentId) {
    const response = await apartmentsRepository.getReviews(apartmentId);

    return response;
}

async function getFacilities() {
    const response = await apartmentsRepository.getFacilities();

    return response;
}

async function getDraft(apartmentId) {
    const response = await apartmentsRepository.getDraft(apartmentId);

    return response;
}

async function addToFavorites(options) {
    const response = await apartmentsRepository.addToFavorites(options);

    return response;
}

async function addApartmentNewImages(id, options) {
    const response = await apartmentsRepository.addApartmentNewImages(id, options);

    return response;
}

async function addRent(id, options) {
    const response = await apartmentsRepository.addRent(id, options);

    return response;
}

async function updateApartment(id, options) {
    const response = await apartmentsRepository.updateApartment(id, options);

    return response;
}

async function updateApartmentChecklist(id, options) {
    const response = await apartmentsRepository.updateApartmentChecklist(id, options);

    return response;
}

async function cancelApartmentDeletedImages(id, ids) {
    const response = await apartmentsRepository.cancelApartmentDeletedImages(id, ids);

    return response;
}

async function deleteFromFavorites(params, query, options = {}) {
    const response = await apartmentsRepository.deleteFromFavorites(params, query, options);

    return response;
}

async function deleteApartmentImages(id, ids) {
    const response = await apartmentsRepository.deleteApartmentImages(id, ids);

    return response
}

async function deleteApartmentNewImages(id, ids) {
    const response = await apartmentsRepository.deleteApartmentNewImages(id, ids);

    return response
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
}