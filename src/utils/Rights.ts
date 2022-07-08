import {UserStateT} from "@rx/userReducer";
import {empty} from "@u2/utils";

export const Rights = {
	'USERS_NOT_VERIFIED': 'users.not_verified',
	'USERS_EMPLOYEE': 'users.employee',
	'USERS_SELF': 'user.self',
	'APARTMENTS_FAVORITES': 'apartments.favorites',
	'APARTMENTS_FAVORITES_SELF': 'apartments.favorites_self',
	'APARTMENTS_RENT': 'apartments.rent',
	'APARTMENTS_CREATE_NOT_VERIFIED': 'apartments.create_not_verified',
	'APARTMENTS_MANAGE_SELF': 'apartments.manage_self',
	'APARTMENTS_METERS': 'apartments.meters',
	'REQUESTS_CALL': 'requests.call',
	'REQUESTS_LAW': 'requests.law',
	'REQUESTS_ADMIN': 'requests.admin'
}
export type RightsType = keyof typeof Rights


export const hasRights = (user: UserStateT['user']|empty, rights: RightsType[]) => {
	if (user && user.rights) return rights.every(r=>user.rights.includes(r))
	return false
}