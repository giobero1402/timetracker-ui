import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import React, {useEffect, useState} from "react";
import {useApp} from "@/app/useContextAccount";
import {Dropdown} from "react-native-element-dropdown";
import {AntDesign} from "@expo/vector-icons";
import {UrlPostApp} from "@/scripts/fetch";
import endpoints from "@/scripts/endpoints";
import {useNavigation, useRouter} from "expo-router";

export default function LoginView(){
    const [email, setEmail] = useState("");
    const [profiles, setProfiles] = useState<any>([]);
    const [isFocus, setIsFocus] = useState(false);
    const [sent, setSent] = useState(false);
    const [code, setCode] = useState("");
    const {accounts, setAccount} = useApp()
    const router = useRouter()

    useEffect(() => {
        setProfiles(accounts.map((item:any)=> (
            {
                label: `${item.first_name} ${item.last_name}`,
                value: item.email
            }
        )))

    }, [accounts]);

    const sendAuthHandler = async () => {
        UrlPostApp(endpoints.send_code(email), 'POST', {})
        setSent(true);
    }
    const validateCodeHandler = async () => {
        console.log(code)
        const rta = await UrlPostApp(endpoints.verify, 'POST', {
            email: email,
            code: code,
        })

        if(!rta.email){return alert('Code Failed')}

        const acc = accounts.find((value:any) => value.email === rta.email)

        localStorage.setItem('employee', JSON.stringify(acc))
        setAccount(acc)
        console.log(acc)
        router.navigate('/')
    }
    return <>
    <View style={[styles.container, styles.main]}>
        <ThemedText type={"title"}>Login</ThemedText>
        <View style={[styles.container, styles.scene]}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={profiles}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select your account email' : '...'}
                searchPlaceholder="Search..."
                value={email}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setEmail(item.value);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />
            {email &&
                <Pressable style={styles.button} onPress={sendAuthHandler}>
                <ThemedText style={styles.text} type={"default"}>
                    Send Code
                </ThemedText>
            </Pressable>
            }
            {sent && <View>
                <TextInput style={[styles.code]} placeholder={"Code"} value={code} onChangeText={setCode} keyboardType={"numeric"}  />
                <Pressable style={[styles.button, styles.validate]} onPress={validateCodeHandler}>
                    <ThemedText style={styles.text} type={"default"}>Validate</ThemedText>
                </Pressable>
            </View>}
        </View>
    </View>
    </>
}
const styles = StyleSheet.create({
    main: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    scene: {
        width: "80%",
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        padding: 20,
        backgroundColor: '#eaeaea',
    },
    button: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        textAlign: 'center',
    },
    validate: {
        backgroundColor: '#eda334',
    },
    text: {
        textAlign: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 8,
    },
    code: {
        alignSelf: 'center',
        height: 80,
        width: 90,
        padding: 2,
        borderWidth: 1,
        fontSize:24,
        marginBottom: 10,
        textAlign: 'center',
        borderRadius: 10
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

});