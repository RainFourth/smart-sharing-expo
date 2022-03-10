import {createStackNavigator} from "@react-navigation/stack";
import CitiesScreen from "@sc/App/Apartments/CitiesScreen/CitiesScreen";
import MapScreen from "@sc/App/Apartments/Map/MapScreen";
import BottomTabBar from "@sc/App/BottomTabBar";


const StackNav = createStackNavigator()

const ApartmentsNav = () => {
    return <StackNav.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='CitiesScreen'
    >
        <StackNav.Screen
            name='CitiesScreen'
            component={CitiesScreen}
        />
        <StackNav.Screen
            name='MapScreen'
            component={MapScreen}
        />
    </StackNav.Navigator>
}
export default ApartmentsNav