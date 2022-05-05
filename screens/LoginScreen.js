// React imports
import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

// Design imports
import { TextInput, Snackbar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../assets/images/logoFull.png";
import CustomButton from "../components/CustomButtonIcon";

// Service imports
import doLogin from "../services/UserLogin";

// Redux imports
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/userSlice";

// HookForm imports
import { useForm, Controller } from "react-hook-form";

export default function LoginScreen({ navigation }) {
    // Retrieve Redux dispatch
    const dispatch = useDispatch();

    // Password state
    const [isVisible, setIsVisible] = React.useState(false);

    // SnackBar states
    const [isSnackVisible, setIsSnackVisible] = React.useState(false);
    const [snackText, setSnackText] = React.useState("");

    // Destructuring HookForm hook
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onTouched",
        reValidateMode: "onTouched",
        shouldFocusError: true,
    });

    /**
     * Submit function for HookForm submit
     * @param {Object} data Form info
     */
    const onSubmit = (data) => {
        doLogin(data.email, data.password)
            // On Promise Successful
            .then((data) => {
                // Formating datas
                const dataFormat = {
                    token: data.token,
                    isLoggedIn: true,
                    data: data.data,
                };

                // Dispatching formatted data to redux store
                dispatch(setAuth(dataFormat));

                // Navigate to Home from Tab navigation
                navigation.navigate("HomeTabNav");
            })
            // On Promise Reject
            .catch((err) => {
                // Handling rejected Promise
                err.then((reason) => {
                    // Adding text to SnackBar
                    setSnackText(reason.error);
                }).finally(() => {
                    // In any case: show error SnackBar
                    setIsSnackVisible(true);
                });
            });
    };
    return (
        <View style={styles.container}>
            {/* Brand Logo */}
            <Image style={styles.logo} source={Logo} />

            {/* Email Form part */}
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
                {/* Email Form show-error part */}
                {errors?.email && (
                    <Text style={{ color: "red" }}>{errors.email.message}</Text>
                )}
            </View>

            {/* Password Form part */}
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
                {/* Password Form show-error part */}
                {errors?.password && (
                    <Text style={{ color: "red" }}>
                        {errors.password.message}
                    </Text>
                )}
            </View>

            {/* Submit Button */}
            <CustomButton
                text="Connexion"
                CustomIcon={(size, color) => (
                    <Icon size={size} name="arrow-right" color={color} />
                )}
                onPress={handleSubmit(onSubmit)}
                reversed
                disabled={errors.email || errors.password ? true : false}
            />

            {/* SnackBar */}
            <Snackbar
                visible={isSnackVisible}
                onDismiss={() => setIsSnackVisible(false)}
                action={{
                    label: "Fermer",
                    onPress: () => {
                        setIsSnackVisible(false);
                    },
                }}
            >
                Erreur - {snackText}
            </Snackbar>
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
