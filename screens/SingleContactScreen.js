// Import react element
import * as React from "react";
import {
    StyleSheet,
    Text,
    View,
    Linking,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    KeyboardAvoidingView,
} from "react-native";

//Import selector for user infos
import { useSelector } from "react-redux";

//Import react hook form for edit form
import { useForm, Controller } from "react-hook-form";

//Import framework element
import { useTheme, TextInput } from "react-native-paper";

//Import customs elements
import CustomButton from "../components/CustomButtonIcon";
import SwitchCustom from "../components/CustomSwitch";
import Icon from "react-native-vector-icons/FontAwesome";

//Import fetch method
import {getClient, updateClient} from "../services/Contact";


export default function SingleContactScreen({ route, navigation }) {
    const { infos } = route.params;
    const user = useSelector((state) => state.user.auth);
    const theme = useTheme();
    const [isEditable, setIsEditable] = React.useState(false);
    const [client, setClient] = React.useState({});

    const SendButton = () => {
        return (
            <CustomButton
                CustomIcon={(size, color) => (
                    <Icon size={20} name="arrow-right" color={color} />
                )}
                text="Valider les changements"
                reversed={true}
                style={{
                    justifyContent: "center",
                    height: 40,
                    width: "80%",
                    alignSelf: "center",
                    marginTop: 20,
                    backgroundColor: theme.colors.success
                }}
                labelStyle={{ fontSize: 12 }}
                onPress={handleSubmit(onSubmit)}
            />
        );
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
        },
        mode: "onTouched",
        reValidateMode: "onTouched",
        shouldFocusError: true,
    });

    //CHARGEMENT DES DONNEES DU CLIENT
    React.useLayoutEffect(() => {
        getClient(infos._id, user.token).then((data) => {
            setClient(data.data);
            const dataClient = data.data;
            setValue("firstname", dataClient.firstname);
            setValue("lastname", dataClient.lastname);
            setValue("email", dataClient.email);
            setValue("phone", dataClient.phone);
        });
    }, []);

    //ENVOIE DES DONNEES
    const onSubmit = (data) => {
        updateClient(infos._id, user.token, data).then((response) => {
            console.log(response);
        })
    };

    return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {/* HEADER START */}
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 50,
                            width: "100%",
                        }}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: theme.colors.primary,
                                height: 100,
                                width: 100,
                                borderRadius: 50,
                            }}
                        >
                            <Icon name="user" size={50} color="white" />
                        </View>
                        <Text style={styles.title}>
                            {infos.firstname} {infos.lastname}
                        </Text>
                    </View>
                    {/* HEADER END */}

                    {/* FORM START */}
                    <View>
                        {/* EDIT SWITCH START */}
                        <SwitchCustom
                            style={{ alignSelf: "center" }}
                            text="Modifier"
                            handleSwitch={setIsEditable}
                            isSwitchOn={isEditable}
                        />
                        {/* EDIT SWITCH END */}

                        {/* NAME INPUT START */}
                        <View
                            style={{
                                marginTop: 20,
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                            {/* LASTNAME INPUT START */}
                            <View style={{ width: "50%" }}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Champ nom requis",
                                        },
                                        pattern: {
                                            value: /^[a-z ,.'-]+$/i,
                                            message: "Entrer un nom valide",
                                        },
                                    }}
                                    name="lastname"
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <TextInput
                                            mode="outlined"
                                            label="Nom"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            autoComplete="lastname"
                                            value={value}
                                            error={errors?.lastname}
                                            style={{
                                                width: "80%",
                                                alignSelf: "center",
                                            }}
                                            disabled={!isEditable}
                                        />
                                    )}
                                />
                                {errors?.lastname && (
                                    <Text
                                        style={{
                                            color: theme.colors.error,
                                            alignSelf: "center",
                                        }}
                                    >
                                        {errors.lastname.message}
                                    </Text>
                                )}
                            </View>
                            {/* LASTNAME INPUT END */}

                            {/* FIRSTNAME INPUT START */}
                            <View style={{ width: "50%" }}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Champ nom requis",
                                        },
                                        pattern: {
                                            value: /^[a-z ,.'-]+$/i,
                                            message: "Entrer un nom valide",
                                        },
                                    }}
                                    name="firstname"
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <TextInput
                                            mode="outlined"
                                            label="Prénom"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            autoComplete="firstname"
                                            value={value}
                                            error={errors?.firstname}
                                            style={{
                                                width: "80%",
                                                alignSelf: "center",
                                            }}
                                            disabled={!isEditable}
                                        />
                                    )}
                                />
                                {errors?.firstname && (
                                    <Text
                                        style={{
                                            color: theme.colors.error,
                                            alignSelf: "center",
                                        }}
                                    >
                                        {errors.firstname.message}
                                    </Text>
                                )}
                            </View>
                            {/* FIRSTNAME INPUT END */}
                        </View>
                        {/* NAME INPUT START */}

                        {/* EMAIL INPUT START */}
                        <View style={{ marginTop: 20, alignItems: "center" }}>
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
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <TextInput
                                        mode="outlined"
                                        label="Email"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        autoComplete="email"
                                        value={value}
                                        error={errors?.email}
                                        style={{ width: "90%" }}
                                        disabled={!isEditable}
                                    />
                                )}
                                name="email"
                            />
                            {errors?.email && (
                                <Text style={{ color: theme.colors.error }}>
                                    {errors.email.message}
                                </Text>
                            )}
                        </View>
                        {/* EMAIL INPUT END */}

                        {/* PHONE INPUT START */}
                        <View style={{ marginTop: 20, alignItems: "center" }}>
                            <Controller
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Champ email requis",
                                    },
                                    pattern: {
                                        value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/i,
                                        message: "Entrer une email valide",
                                    },
                                }}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <TextInput
                                        mode="outlined"
                                        label="Téléphone"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        autoComplete="phone"
                                        value={value}
                                        error={errors?.phone}
                                        style={{ width: "90%" }}
                                        disabled={!isEditable}
                                    />
                                )}
                                name="phone"
                            />
                            {errors?.phone && (
                                <Text style={{ color: theme.colors.error }}>
                                    {errors.phone.message}
                                </Text>
                            )}
                        </View>
                        {/* PHONE INPUT END */}
                        {isEditable ? <SendButton /> : null}
                    </View>
                    {/* FORM END */}

                    <CustomButton
                        CustomIcon={(size, color) => (
                            <Icon size={20} name="phone" color={color} />
                        )}
                        text="Contacter par téléphone"
                        reversed={true}
                        style={{
                            justifyContent: "center",
                            height: 40,
                            width: "80%",
                            alignSelf: "center",
                            marginTop: 20,
                        }}
                        labelStyle={{ fontSize: 12 }}
                        onPress={() => Linking.openURL(`tel:${client.phone}`)}
                    />
                    <CustomButton
                        CustomIcon={(size, color) => (
                            <Icon size={20} name="envelope" color={color} />
                        )}
                        text="Contacter par Mail"
                        reversed={true}
                        style={{
                            justifyContent: "center",
                            height: 40,
                            width: "80%",
                            alignSelf: "center",
                            marginTop: 20,
                        }}
                        labelStyle={{ fontSize: 12 }}
                        onPress={() =>
                            Linking.openURL(`mailto:${client.email}`)
                        }
                    />
                </View>
            </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ECE6DE",
        paddingTop: 50,
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
    },
});
