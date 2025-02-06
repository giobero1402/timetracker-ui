import {ThemedText} from "@/components/ThemedText";
import {Pressable, StyleSheet, Text, View, Animated, Easing} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {AntDesign, FontAwesome5} from "@expo/vector-icons";
import ModalView from "@/components/ui/ModalView";
import {useApp} from "@/app/useContextAccount";

const JobCardView = ({job, editable}:{job:any, editable:boolean}) => {
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
                 <ThemedText type="title">{job?.customer?.first_name}</ThemedText>}
             {job?.customer?.last_name &&
                 <ThemedText type="title">{job?.customer?.last_name}</ThemedText>}
         </View>
         <AntDesign name={"calendar"} size={22} />
         <View style={styles.flex_row}>
             <ThemedText style={styles.startText} type="defaultSemiBold">{new Date(job?.schedule?.scheduled_start).toLocaleString()}</ThemedText>
             <ThemedText style={styles.endText} type="defaultSemiBold">{new Date(job?.schedule?.scheduled_end).toLocaleString()}</ThemedText>
         </View>
         {editable ?
             <View style={styles.flex_row}>
                 {
                     option.state !== 'start' ?
                         <Pressable
                             style={[styles.button, styles.buttonStart]}
                             onPress={startHandle}>
                             <FontAwesome5 style={styles.icon} name="play" size={26} color="white" />
                             <Text style={styles.textStyle}>{option?.date ? new Date(option?.date).toLocaleTimeString() : 'Start'}</Text>
                         </Pressable>
                         :
                         <Pressable
                             style={[styles.button, styles.buttonStop]}
                             onPress={stopHandle}>
                             <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                                 <FontAwesome5 style={styles.icon} name="circle-notch" size={26} color="white" />
                             </Animated.View>
                             <Text style={styles.textStyle}>{option?.date ? new Date(option?.date).toLocaleTimeString() : 'Stop'}</Text>
                         </Pressable>
                 }
             </View>:
             <View style={styles.flex_row}>
                 {
                     option.state !== 'start' ?
                             <Text style={styles.buttonStart}>{option?.date ? new Date(option?.date).toLocaleTimeString() : 'Start'}</Text>
                         :
                             <Text style={styles.buttonStop}>{option?.date ? new Date(option?.date).toLocaleTimeString() : 'Stop'}</Text>
                 }
             </View>

         }
         <ModalView Element={employeesModal} text={<ThemedText style={styles.textStyle} type={"link"}>See workers</ThemedText>} />
     </View>
 )
}

const styles = StyleSheet.create({
    button: {
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        width: 120,
        height: 120,

        borderWidth: 2,
        borderColor: "#cfb628",
        borderRadius: '100%',
    },
    buttonStart: {
        color: "#dfdfdf",
        backgroundColor: "#76bc63",
    },
    buttonStop: {
        color: "#dfdfdf",
        backgroundColor: "#bc6363",
    },
    icon: {
        padding: 8,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    endText: {
        color: '#ff6868',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    startText: {
        color: '#48b1c1',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container_job: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        backgroundColor: 'white',
        borderRadius: 15,
        gap: '10px',

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
        gap: '10px'
    }
});

export default JobCardView;