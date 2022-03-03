import React, {useEffect, useRef} from 'react'
import {Keyboard, StyleSheet, TextInput, View} from "react-native";
import {ThemeType} from "@t";
import {useThemeNew} from "@h";
import {inf} from "@u2/utils";
import SearchIc from "@c/SvgIcons/SearchIc";
import {useDispatch, useSelector} from "react-redux";
import {setAppNavMapMode} from "@rx/appReducer";
import {StateType} from "@rx/store";
import {useBackHandler} from "@react-native-community/hooks";
import {useKeyboard} from "@h/useKeyboard";
import {sg} from "@u2/styleGlobal";
import Space from "@c/Space";



const makeStyle = (t: ThemeType) => StyleSheet.create({
    bgc: {
        width: '100%', height: 50,
        backgroundColor: t.mainColors.bgc0,
        borderRadius: inf, // round corners

        elevation: 10,
    },
    text: {
        flex:1,
        textAlignVertical: 'center',
        fontSize: 20,
        fontFamily: t.font.font.normal,
        color: t.mainColors.onBgc0
    }
})



type SearchWidgetProps = {

}
const SearchWidget = ({  }:SearchWidgetProps) => {

    const { style:s, themeObj } = useThemeNew(makeStyle)
    //const d = useDispatch()
    const inputRef = useRef<TextInput>(null)
    const [isKbdShown] = useKeyboard()

    useBackHandler(()=>{
        if (inputRef.current?.isFocused()){
            blurInput()
            return true
        }
        return false
    })


    const blurInput = () => {
        Keyboard.dismiss()
        inputRef.current?.blur()
    }

    const onInputFocus = () => {

    }

    const onTouchInput = () => {
        if (!isKbdShown && inputRef.current){
            inputRef.current.blur()
            inputRef.current.focus()
        }
    }




    return <View style={[sg.row, s.bgc]}>
        <View style={[{height: '100%', width: 50}, sg.centerContent]}>
            <SearchIc color={themeObj.mainColors.onBgc0} size={24} />
        </View>


        <View style={{flex:1}}>
            <TextInput
                onTouchStart={onTouchInput}
                ref={inputRef}
                onFocus={onInputFocus}
                onBlur={blurInput}
                style={s.text} placeholder='Введите город'
                placeholderTextColor={themeObj.mainColors.secondary2}
            />
        </View>

        <Space w={20}/>

    </View>
}
export default SearchWidget