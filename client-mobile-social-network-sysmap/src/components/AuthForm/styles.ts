import { THEME } from "../../theme";
import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container:{
        flexDirection:"column",
        alignItems:"center",
    },
    containerPosition :{
        alignItems:"center",
    },
    logo: {
        marginTop: 50,
    },
   button:{
    borderRadius: 2
   },
   link:{
    color: THEME.COLORS.CAPTION_400,
    fontSize:THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    textAlign: "center",
    textDecorationLine:"underline"
   }
});