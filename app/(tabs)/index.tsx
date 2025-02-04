import {Image, StyleSheet, Platform, Animated, Button, Alert, View, Text, Pressable} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import React, {useEffect, useState} from "react";
import ModalView from "@/components/ui/ModalView";
import JobCardView from "@/components/ui/JobCardView";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {useColorScheme} from "@/hooks/useColorScheme";
import {useApp} from "@/app/useContextAccount";
import {FontAwesome5} from "@expo/vector-icons";
import {ThemedText} from "@/components/ThemedText";

export default function HomeScreen() {
    const colorScheme = useColorScheme();

    const {todayJobs:jobs, nextJob} = useApp();

    const modal = <View style={styles.flex_row}>
        {nextJob ? <JobCardView job={nextJob} /> : <Text>No appointment for now</Text>}
    </View>


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ece0e0', dark: '#232323' }}
      headerImage={
        <Image
          source={require('@/assets/images/dimi-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
          <ThemedView style={styles.titleContainer}>
              <ThemedText type={"defaultSemiBold"}>Today's jobs</ThemedText>
              <ModalView Element={modal} text={<FontAwesome5 name="calendar-alt" size={18} />} />
          </ThemedView>
          <View style={styles.container_job}>
              {
                  jobs.map((job:any, i:number) => (
                      <JobCardView job={job} key={i} />
                  ))
              }
          </View>
      </ThemeProvider>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
    titleContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
  },
    container_job: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    flex_row: {
      display: 'flex',
      flexDirection: 'row',
        gap: '10px'

    },
    flex_col: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    }
});
