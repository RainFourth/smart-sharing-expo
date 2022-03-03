import {View} from "react-native";


const Space = ({h,w}:{h?:number|string,w?:number|string}) => {
    return <View style={{
        backgroundColor: 'transparent',
        width: 0, height: 0,
        marginTop: h, marginRight: w
    }}/>
}
export default Space