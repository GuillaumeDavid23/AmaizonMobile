import { DefaultTheme } from "react-native-paper";

const theme = {
    ...DefaultTheme,
    roundness: 0,
    colors: {
        ...DefaultTheme.colors,
        accent: "#DCD0C1",
        primary: "#647F94",
    },

    CustomButtonRadius: {
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        fontSize: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 10,

        elevation: 12,
    },
};

export default theme;
