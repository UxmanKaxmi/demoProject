import React, { useCallback, useState, } from "react";
import { StyleSheet, View, Text, Pressable, Image, TouchableWithoutFeedback, } from "react-native";




import { Colors, Outlines, Sizing, Typography } from "styles";
import Icon from 'react-native-vector-icons/AntDesign';
import { useAppDispatch, useAppSelector } from "hooks/index";
import { RootState } from "store/store";
import { setFilter } from "features/character/actions/selected-filter-slice";
import genderIcon from "@imgs/gender-icon.png"
import speciesIcon from "@imgs/species-icon.png"
import idIcon from "@imgs/id-icon.png"

import { useNavigation } from '@react-navigation/native';
import { FILTER_CHARACTER } from "features/character";


const closeIcon = <Icon name="close" size={Sizing.icons.x30} color={Colors.neutral.black} />;
const selectedIcon = <Icon name="check" size={Sizing.icons.x30} color={Colors.neutral.black} />;
const ByName = <Icon name="user" size={Sizing.icons.x30} color={Colors.neutral.black} />;

const BottomSheetComponent = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch()
    const selectedFilter = useAppSelector((state: RootState) => state.selectedFilter.value)


    const handleCloseModalPress = useCallback(() => {
        navigation.goBack()
    }, []);

    return (
        <Pressable onPress={()=>navigation.goBack()}  style={styles.container}>
            {/* <Pressable onPress={()=>navigation.goBack()} style={{backgroundColor:'red',height:'100%'}} > */}
            <View style={styles.innerContainer}>

                <View style={[, styles.modalHeadingView]}>
                    <Text style={Typography.header.x50}>
                        Filters
                    </Text>

                    <Pressable onPress={() => handleCloseModalPress()} style={{ marginEnd: Sizing.x20 }}>
                        {closeIcon}
                    </Pressable>

                </View>




                <Pressable id="name"
                    style={({ pressed }) => [
                        { backgroundColor: pressed ? Colors.neutral.s200 : 'transparent' },
                        styles.button
                    ]}
                    onPress={() => dispatch(setFilter(FILTER_CHARACTER.NAME))}
                >
                    <View style={styles.byNameView}>
                        <View style={styles.byNameInnerView}>
                            {ByName}
                        </View>

                        <View style={styles.ByNameHeadingView}>
                            <Text style={[{ flexDirection: 'row' }, Typography.subheader.x40]}>
                                By Name
                            </Text>
                        </View>

                        {selectedFilter == "Name" ? <View style={styles.iconView}>
                            {selectedIcon}
                        </View> : null}
                    </View>
                </Pressable>

                <Pressable id="gender" style={({ pressed }) => [
                    { backgroundColor: pressed ? Colors.neutral.s200 : 'transparent' },
                    styles.button
                ]}
                    onPress={() => dispatch(setFilter(FILTER_CHARACTER.GENDER))}

                >
                    <View style={styles.byNameView}>
                        <View style={styles.byNameInnerView}>
                            <Image style={[styles.icon]} source={genderIcon} />
                        </View>

                        <View style={styles.ByNameHeadingView}>
                            <Text style={[{ flexDirection: 'row' }, Typography.subheader.x40]}>
                                By Gender
                            </Text>
                        </View>

                        {selectedFilter == "Gender" ? <View style={styles.iconView}>
                            {selectedIcon}
                        </View> : null}
                    </View>
                </Pressable>


                <Pressable id="species" style={({ pressed }) => [
                    { backgroundColor: pressed ? Colors.neutral.s200 : 'transparent' },
                    styles.button
                ]}
                    onPress={() => dispatch(setFilter(FILTER_CHARACTER.SPECIES))}

                >
                    <View style={styles.byNameView}>
                        <View style={styles.byNameInnerView}>
                            <Image style={[styles.icon]} source={speciesIcon} />
                        </View>

                        <View style={styles.ByNameHeadingView}>
                            <Text style={[{ flexDirection: 'row' }, Typography.subheader.x40]}>
                                By Species
                            </Text>
                        </View>

                        {selectedFilter == "Species" ? <View style={styles.iconView}>
                            {selectedIcon}
                        </View> : null}
                    </View>
                </Pressable>
            </View>
            {/* </Pressable> */}
        </Pressable>

    );
};

const styles = StyleSheet.create({
    iconView: {
        flex: 0.2,
        alignItems: "flex-end",
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    ByNameHeadingView: {
        alignSelf: "center",
        marginStart: Sizing.x30,
        flex: 0.6,
    },
    byNameInnerView: {
        alignSelf: "center",
        flex: 0.1,
    },
    byNameView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: Sizing.x30,
    },
    modalHeadingView: {

        paddingVertical: Sizing.x30,
        marginHorizontal: Sizing.x30,
        // height: Sizing.x60,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    icon: {
        width: Sizing.icons.x30,
        height: Sizing.icons.x30,
        resizeMode: 'contain'

    },
    button: {
        // backgroundColor: 'red',
        paddingVertical: Sizing.x15

    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        


    },
    innerContainer: {
     
        paddingVertical: Sizing.x30,
        backgroundColor: Colors.neutral.s100,
        borderTopRightRadius: Outlines.borderRadius.large,
        borderTopLeftRadius: Outlines.borderRadius.large,
    }
});

export default BottomSheetComponent;


