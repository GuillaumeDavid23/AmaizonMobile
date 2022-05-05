import { DefaultTheme } from "react-native-paper";

const theme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        ...DefaultTheme.colors,
        accent: "#DCD0C1",
        primary: "#647F94",
        success: "#2C6F29",
        error: "#AE0000",
    },

    CustomButtonRadius: {
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        fontSize: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 7,
    },
};

export default theme;
