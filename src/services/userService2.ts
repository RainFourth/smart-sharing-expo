
import {empty, isEmpty} from "@u2/utils";
import {FavoriteList, City, District} from "@se/apartmentsService2";
import {UserApi, userRepo} from "@r/userRepoMock";
import {RightsType} from "@u";
import {ServiceData} from "@se/utils";


export class User {
    public static fromUserApi(userApi?: UserApi|empty){
        const it = userApi
        if (isEmpty(it)) return it
        return new User(
            it.id, it.name, it.surname, it.patronymic,
            it.isVerified, it.birthDate, it.email,
            it.isEmailVerified, it.phone,
            City.fromCityApi(it.registrationCity),
            City.fromCityApi(it.workCity),
            it.favoriteLists.map(it=>FavoriteList.fromFavoriteListApi(it)!)
        )
    }
    clone(){
        return new User(
            this.id, this.name, this.surname, this.patronymic,
            this.isVerified, this.birthDate, this.email,
            this.isEmailVerified, this.phone, this.registrationCity, this.workCity,
            this.favoriteLists
        )
    }
    constructor(
        public id?: string,
        public name?: string,
        public surname?: string,
        public patronymic?: string,
        public isVerified?: boolean,
        public birthDate?: string|null, // todo timestamp ???
        public email?: string,
        public isEmailVerified?: boolean,
        public phone?: string,
        public registrationCity?: City|null,
        public workCity?: City|null,
        public favoriteLists: FavoriteList[] = [],
    ) { }
    get is_verified(){ return this.isVerified }
    get birth_date(){ return this.birthDate }
    get registration_city(){ return this.registrationCity }
    get work_city(){ return this.workCity }
    get is_email_confirmed(){ return this.isEmailVerified }

    // todo
    get role(){ return { role: 'USER' } }
    // todo
    get documents(){ return [{ path: 'sdlkfj' }] }
    // todo
    get rights(){ return ['USERS_SELF'] as RightsType[] }
}




export type ServiceUser = ServiceData<User|null>
const getCurrentUser = async (): Promise<ServiceUser> => {
    return userRepo.getCurrentUser().then(
        response => {
            const { status, data: { data, errors } } = response

            //console.log("user: ", data)

            if (status!==200 || errors){
                return { error: { code: 'error' } }
            }

            return {
                data: User.fromUserApi(data?.currentUser)
            }
        }, error => {
            return { error: { code: 'error' } }
        }
    )
}


export const userService = {
    getCurrentUser
}