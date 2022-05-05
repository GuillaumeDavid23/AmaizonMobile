import * as React from "react";
import { Text, View } from "react-native";
import { useTheme, Switch } from "react-native-paper";

const SwitchCustom = ({ style, text, handleSwitch, isSwitchOn }) => {
    const theme = useTheme();

    const onToggleSwitch = () => handleSwitch(!isSwitchOn);

    return (
        <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
            <Text>{text}</Text>
            <Switch
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
                color={theme.colors.primary}
            />
        </View>
    );
};
export default SwitchCustom;
