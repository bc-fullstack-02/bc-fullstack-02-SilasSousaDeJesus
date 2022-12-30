import { THEME } from "../../theme/index";
import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
     container:{
        flexDirection:"row",
        alignItems:"center",
        borderWidth: 2,
        borderColor: THEME.COLORS.BACKGROUND_600,
        maxWidth: "100%",
        minWidth: 240,
        borderRadius: 12,
        backgroundColor: THEME.COLORS.BACKGROUND_600,
        padding: 8,
        
    },
    input: {
        marginStart: 12,
        flex: 1,
        color: THEME.COLORS.CAPTION_400,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
       placeHolderTextColor: THEME.COLORS.INPUT
    },
});