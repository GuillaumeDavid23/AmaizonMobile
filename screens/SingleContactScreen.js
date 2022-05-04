import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../components/CustomButtonIcon";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SingleContactScreen({ navigation }) {
    const user = useSelector((state) => state.user.auth.data);
    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginBottom: 50,
                    width: "100%",
                }}
            >
                <CustomButton
                    CustomIcon={(size, color) => (
                        <Icon size={20} name="arrow-left" color={color} />
                    )}
                    text="Retour"
                    reversed={false}
                    style={{
                        justifyContent: "center",
                        height: 40,
                    }}
                    labelStyle={{ fontSize: 12 }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Un client</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ECE6DE",
        paddingTop: 50,
        alignItems: "center",
    },
    logo: {
        height: 200,
        resizeMode: "contain",
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
    },
});
