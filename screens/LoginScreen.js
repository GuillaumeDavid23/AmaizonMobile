import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Logo from "../assets/images/logoFull.png";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "../components/CustomButtonIcon";
import doLogin from "../services/UserLogin";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../redux/userSlice";

export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = React.useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "guigui@test.fr",
            password: "Guillaume5",
        },
        mode: "onTouched",
        reValidateMode: "onTouched",
        shouldFocusError: true,
    });
    const onSubmit = (data) => {
        doLogin(data.email, data.password).then((data) => {
            const dataFormat = {
                token: data.token,
                isLoggedIn: true,
                data: data.data
            };
            dispatch(setAuth(dataFormat));
            navigation.navigate("Home");
        });
    };
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={Logo} />
            <View style={{ marginTop: 20 }}>
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Champ email requis",
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Entrer une email valide",
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            mode="outlined"
                            label="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            autoComplete="email"
                            value={value}
                            error={errors?.email}
                            style={{ width: 300 }}
                        />
                    )}
                    name="email"
                />
                {errors?.email && (
                    <Text style={{ color: "red" }}>{errors.email.message}</Text>
                )}
            </View>

            <View style={{ marginBottom: 30, marginTop: 20 }}>
                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Champ mot de passe requis",
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            mode="outlined"
                            label="Mot de passe"
                            secureTextEntry={!isVisible}
                            onBlur={onBlur}
                            autoComplete="password"
                            onChangeText={onChange}
                            value={value}
                            error={errors?.password}
                            style={{ width: 300 }}
                            right={
                                <TextInput.Icon
                                    name={isVisible ? "eye-off" : "eye"}
                                    onPress={() => setIsVisible(!isVisible)}
                                />
                            }
                        />
                    )}
                    name="password"
                />
                {errors?.password && (
                    <Text style={{ color: "red" }}>
                        {errors.password.message}
                    </Text>
                )}
            </View>
            <CustomButton
                text="Connexion"
                CustomIcon={(size, color) => (
                    <Icon size={size} name="arrow-right" color={color} />
                )}
                onPress={handleSubmit(onSubmit)}
                reversed={true}
                disabled={errors.email || errors.password ? true : false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ECE6DE",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 250,
        height: 100,
        resizeMode: "contain",
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
    },
});
