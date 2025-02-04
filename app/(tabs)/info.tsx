import {Pressable, StyleSheet, Text, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {useColorScheme} from "@/hooks/useColorScheme";
import React, {useEffect} from "react";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {FontAwesome5} from "@expo/vector-icons";
import {useApp} from "@/app/useContextAccount";
import CustomHeader from "@/components/CustomHeader";

export default function Info(){
    const {account} = useApp()
    const colorScheme = useColorScheme();

    useEffect(() => {
    }, []);

    return <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
        <CustomHeader employee={account} />
    </ThemeProvider>
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: "transparent",
    },
    layout: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: 6,
    }
});