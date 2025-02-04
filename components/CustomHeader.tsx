import {Pressable, StyleSheet, Text, View} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import React, {useEffect} from "react";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {useColorScheme} from "@/hooks/useColorScheme";
import {ThemedText} from "@/components/ThemedText";
import {useRouter} from "expo-router";

function CustomHeader({employee} : {employee: any}) {
    const colorScheme = useColorScheme();
    const router = useRouter()

    useEffect(() => {
        console.log("Employee",employee);
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('employee');
        router.navigate('/login')
    }

    return <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
            <View style={styles.layout}>
                <View style={styles.button}>
                    <img src={employee?.avatar_url} width={128} height={128} />
                    <View style={styles.row}>
                        <ThemedText type={"title"}>{employee?.first_name}</ThemedText>
                        <ThemedText type={"title"}>{employee?.last_name}</ThemedText>
                    </View>
                    <Pressable style={styles.logout} onPress={logoutHandler}>
                        <FontAwesome5 name="window-close" size={20} />
                        <Text>Logout</Text>
                    </Pressable>
                </View>
            </View>
        </ThemeProvider>
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "transparent",
    },
    logout: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: 'center',
        padding: 10,
        backgroundColor: "red",
        color: 'white',
        borderRadius: 10,
    },
    layout: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: 6,
    },
    row: {
        display: 'flex',
        gap: 5,
        flexDirection: 'row',
    }
});

export default CustomHeader;