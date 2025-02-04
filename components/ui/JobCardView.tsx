import {ThemedText} from "@/components/ThemedText";
import {Pressable, StyleSheet, Text, View, Animated, Easing} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {FontAwesome5} from "@expo/vector-icons";
import ModalView from "@/components/ui/ModalView";
import {useApp} from "@/app/useContextAccount";

const JobCardView = ({job}:{job:any}) => {
    const {saveInfo} = useApp()

    const {status} = useApp()
    const [option, setOption] = useState<any>('start')
    const rotateAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (status && status.hasOwnProperty(job?.id)) {
            const stoppedValue = status[job?.id]
            console.log(stoppedValue)
            setOption(stoppedValue);
        }
        startAni()
    }, [status]);

    const startAni = () => {
        const rotate = () => {
            rotateAnim.setValue(0)
            Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start()
        };
        rotate()
    }

    const startHandle = () => {
        const values = {
            customer: job.customer.first_name,
            job_id: job.id,
            start: new Date(),
        }
        startAni()
        saveInfo(values)
    }
    const stopHandle = () => {
        const values = {
            customer: job.customer.first_name,
            job_id: job.id,
            start: option.date,
            stop: new Date(),
        }
        saveInfo(values)
    }

    const employeesModal = <View style={styles.flex_col}>
        {
            job?.assigned_employees?.map((value:any, i:number) => (
                    <ThemedText key={i} type={"link"}>{value.first_name + " " + value.last_name}</ThemedText>
            ))
        }
    </View>
    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
 return (
     <View style={styles.container_job}>
         <View style={styles.flex_row}>
             {job?.customer?.first_name &&
                 <ThemedText type="subtitle">{job?.customer?.first_name}</ThemedText>}
             {job?.customer?.last_name &&
                 <ThemedText type="subtitle">{job?.customer?.last_name}</ThemedText>}
         </View>
             <ModalView Element={employeesModal} text={<FontAwesome5 name="user-alt" size={18} />} />
         <View style={styles.flex_row}>
             <ThemedText type="defaultSemiBold">{new Date(job?.schedule?.scheduled_start).toLocaleString()}</ThemedText>
             <ThemedText>-</ThemedText>
             <ThemedText darkColor={"#756512"} type="defaultSemiBold">{new Date(job?.schedule?.scheduled_end).toLocaleString()}</ThemedText>
         </View>
         <View style={styles.flex_row}>
             {
                 option.state !== 'start' ?
                     <Pressable
                         style={[styles.button]}
                         onPress={startHandle}>
                         <FontAwesome5 style={styles.icon} name="play" size={26} color="green" />
                         <Text style={styles.textStyle}>{option?.date ? new Date(option?.date).toLocaleTimeString() : 'Start'}</Text>
                     </Pressable>
                     :
                         <Pressable
                             style={[styles.button]}
                             onPress={stopHandle}>
                             <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                                <FontAwesome5 style={styles.icon} name="circle-notch" size={26} color="red" />
                             </Animated.View>
                             <Text style={styles.textStyle}>{option?.date ? new Date(option?.date).toLocaleTimeString() : 'Stop'}</Text>
                         </Pressable>
             }
         </View>
     </View>
 )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        alignItems: "center",
    },
    icon: {
        padding: 8,
    },
    textStyle: {
        color: 'blue',
        fontWeight: 'bold',
        textAlign: 'center',

        borderTopWidth: 2,
        borderTopColor: "#dfdfdf",
    },
    container_job: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 15,
        gap: '5px',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    flex_row: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: '10px'

    },
    flex_col: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    }
});

export default JobCardView;