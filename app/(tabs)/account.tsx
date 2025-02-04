import {Image, ImageBase, ImageComponent, StyleSheet, Text, View} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {FontAwesome5} from "@expo/vector-icons";
import JobCardView from "@/components/ui/JobCardView";
import {useApp} from "@/app/useContextAccount";
import {Link} from "expo-router";

export default function TabTwoScreen() {
    const {jobs, account} = useApp()
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <FontAwesome5
          size={310}
          color="#808080"
          name="user-alt"
          style={styles.headerImage}
        />
      }>
        <Link href={"/info"} style={styles.section}>
            <View style={styles.sectionContent}>
                <img src={account?.avatar_url} alt={account?.first_name} width={28} height={28}/>
                <Text>Account info</Text>
            </View>
            <FontAwesome5 name={'chevron-right'} />
        </Link>
        <View style={styles.container_job}>
            {
                jobs.map((job: any, i: number) => (
                    <JobCardView job={job} key={i} />
                ))
            }
        </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
    container_job: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        borderStyle: 'solid',
    },
  titleContainer: {
      backgroundColor: 'transparent',
    flexDirection: 'row',
    gap: 8,
  },
    section: {
      display: 'flex',
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 15,
    },
    sectionContent: {
      display: 'flex',
        gap: 8,
        flexDirection: 'row',
        alignItems: 'center',
    }
});
