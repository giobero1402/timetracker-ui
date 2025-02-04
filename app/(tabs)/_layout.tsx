import {Tabs, useFocusEffect, useRouter} from 'expo-router';
import React from 'react';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {FontAwesome5} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <>
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Jobs',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="wrench" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
            name="info"
            options={{
                href: null
            }}
        />
            <Tabs.Screen
                name="account"
                options={{
                    title: 'Account',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={28} color={color} />,
                }}
            />
        </Tabs>

    </>
  );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'flex-end',
        backgroundColor: "transparent",
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    absolutelayout: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        top: 5,
        right: 5,
        zIndex: 1,
        borderRadius: 10,
    }
});