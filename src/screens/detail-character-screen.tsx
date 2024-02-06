import React, { useCallback } from "react";
import {
    SafeAreaView,
    Text,
    TouchableHighlight,
    View,
    Button, StyleSheet,
    Image, ScrollView,
    SectionList,
    FlatList
} from "react-native";
import { RootStackScreenProps } from "@navigation/navigation.types";
import { Colors, Outlines, Sizing, Typography } from "@styles/index";
import { AvatarHeaderScrollView } from 'react-native-sticky-parallax-header'
import { SafeAreaProvider } from 'react-native-safe-area-context'



export const DetailCharacterScreen = ({ route }: RootStackScreenProps<"DetailCharacter">

) => {
    // Function to make the date readable
    const parseISOString = useCallback((s: any) => {
        let b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));

    }, []
    )


    const params = route.params
    let date = params?.created
    return (
        <ScrollView style={{} } >
            <View style={styles.imageView}>
                <Image style={styles.image}
                    source={{ uri: params?.image }}
                />
            </View>


            <View style={{ paddingHorizontal: Sizing.x30, }}>
                <View style={{ marginVertical: Sizing.x20 }}>
                    <Text style={Typography.header.x50}>{params?.name}</Text>
                    <Text>{params?.species}</Text>
                </View>



                <View style={styles.rowView}>
                    <View style={{ flex: 0.6 }}>
                        <Text style={styles.heading}>ID</Text>
                        <Text style={styles.value}>{params?.id}</Text>

                    </View>

                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.heading}>Gender</Text>
                        <Text style={styles.value}>{params?.gender}</Text>
                    </View>
                </View>

                <View style={styles.rowView}>
                    <View style={{ flex: 0.6 }}>
                        <Text style={styles.heading}>Status</Text>
                        <Text style={styles.value}>{params?.status}</Text>
                    </View>

                    <View style={{ flex: 0.4 }}>
                        <Text style={styles.heading}>Created</Text>
                        <Text style={styles.value}>{parseISOString(date).toDateString()}</Text>

                    </View>
                </View>

                <View style={[styles.rowView,{marginBottom: 0}]}>
                    {/* <View style={{ flex: 0.6 }}>


                        <Text style={styles.heading}>Type</Text>
                        <Text style={styles.value}>{params?.type}</Text>
                    </View> */}

                    <View style={{ flex: 0.4 }}>


                    </View>
                </View>

                {/* ORIGINS */}
                <View style={{}}>
                    <View style={{ marginBottom: Sizing.x15 }}>
                        <Text style={[Typography.header.x40, { marginBottom: Sizing.x5 }]}>Origins</Text>
                        <View style={styles.originView}>
                            <Text style={Typography.body.x10}>{params?.origin.name}</Text>
                        </View>
                    </View>

                    {/* LOCATIONS */}
                    <View style={{ marginBottom: Sizing.x15 }}>
                        <Text style={[Typography.header.x40, { marginBottom: Sizing.x5 }]}>Location</Text>
                        <View style={styles.originView}>
                            <Text style={Typography.body.x10}>{params?.location.name}</Text>
                        </View>
                    </View>


                    {/* EPISODES */}
                    <View style={{ marginBottom: Sizing.x15 }}>
                        <Text style={[Typography.header.x40, { marginBottom: Sizing.x5 }]}>Episode Appearance</Text>
                        <View style={[styles.episodesView]}>
{/* 
                            {
                                <FlatList
                                    numColumns={6}
                                    style={{flexGrow:1}}
                                    data={params?.episode}
                                    renderItem={({ item, index }) =>
                                        <View key={index} style={styles.episodesOuterView}>
                                            <Text style={Typography.body.x10}>{item.split('episode/')[1]}</Text>
                                        </View>
                                    }


                                />

                            } */}
                            {params?.episode.map((val, index) => {
                                return (
                                    <View key={index} style={styles.episodesOuterView}>
                                        <Text style={Typography.body.x10}>{val.split('episode/')[1]}</Text>
                                    </View>)

                            })

                            }
                        </View>
                    </View>
                </View>
            </View>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    rowView: {
        flexDirection: "row",
        marginBottom: Sizing.x10
    },
    heading: {
        ...Typography.subheader.x30

    },
    value: {
        ...Typography.body.x10
    },
    originView: {
        paddingHorizontal: Sizing.x15,
        paddingVertical: Sizing.x1,
        backgroundColor: Colors.Location.brand,
        borderRadius: Outlines.borderRadius.large,
        alignSelf: 'flex-start'

    },
    episodesView: {
        flexWrap:'wrap',
        paddingVertical: Sizing.x1,
        borderRadius: 15,
        flexDirection:'row',
        // width:'100%'
        // width: Sizing.x40,

    },
    image: {
        height: Sizing.screen.height / 2,
        width: "100%",
        resizeMode: "cover",
    },
    imageView: {
        // backgroundColor: "red",
        flex: 1,
    },
    episodesOuterView: {
        marginVertical:Sizing.x5,
        marginHorizontal:Sizing.x5,
        paddingHorizontal:Sizing.x10,
        // flex:1,
        backgroundColor: Colors.Episodes.brand,
        alignItems: 'center',
        paddingVertical: Sizing.x2,
        borderRadius: 15,
        width:Sizing.x50
    },
})