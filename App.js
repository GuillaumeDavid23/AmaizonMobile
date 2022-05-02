import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import Logo from "./assets/logo.png"
export default function App() {
    return (
        <View style={styles.container}>
            <Image style={styles.tinyLogo} source={Logo} />
            <Text style={styles.title}>AMAIZON</Text>
            <StatusBar style="auto" />
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    tinyLogo: {
        width: 100,
        height: 100,
    },
    title: {
      fontWeight: "bold",
      fontSize: 25
    }
});
