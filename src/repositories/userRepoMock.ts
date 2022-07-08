import {CityApi, DistrictApi, FavoriteListApi} from "@r/apartmentsRepoMock";
import {ax} from "@r/utils";
import {GraphQlData} from "@se/utils";



export type UserApi = {
    id: string
    name: string
    surname: string
    patronymic: string
    isVerified: boolean
    birthDate: string|null
    email: string
    isEmailVerified: boolean
    phone: string
    registrationCity: CityApi|null
    workCity: CityApi|null
    //apartmentAppraisals: ApartmentAppraisalApi[]
    favoriteLists: FavoriteListApi[]
}


async function getCurrentUser() {
    return ax.post<GraphQlData<{ currentUser: UserApi|null }>>('', {
        query: `query {
            currentUser {
                id
                name
                surname
                patronymic
                isVerified
                birthDate
                email
                isEmailVerified
                phone
                registrationCity {
                    id
                    name
                }
                workCity {
                    id
                    name
                }
                apartmentAppraisals {
                    apartment {id, name}
                    rating, review, isFavorite
                }
                favoriteLists { 
                    id,name
                }
            }
        }`
    })
}


export const userRepo = {
    getCurrentUser
}