import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableHighlight, Pressable, Image, TouchableWithoutFeedback } from "react-native";




import { Buttons, Colors, Outlines, Sizing, Typography } from "styles";
import Icon from 'react-native-vector-icons/AntDesign';
import { useAppDispatch, useAppSelector } from "hooks/index";
import { RootState } from "store/store";
import { setFilter } from "features/character/actions/selected-filter-slice";
import genderIcon from "@imgs/gender-icon.png"
import speciesIcon from "@imgs/species-icon.png"
import { useNavigation } from '@react-navigation/native';


const closeIcon = <Icon name="close" size={Sizing.icons.x30} color={Colors.neutral.black} />;
const selectedIcon = <Icon name="check" size={Sizing.icons.x30} color={Colors.neutral.black} />;
const BySpecies = <Icon name="stepforward" size={Sizing.icons.x30} color={Colors.neutral.black} />;
const ByGender = <Icon name="stepforward" size={Sizing.icons.x30} color={Colors.neutral.black} />;
const ByName = <Icon name="user" size={Sizing.icons.x30} color={Colors.neutral.black} />;


const BottomSheetComponent = () => {
    const navigation = useNavigation();

    const dispatch = useAppDispatch()
    const selectedFilter = useAppSelector((state: RootState) => state.selectedFilter.value)
    const [isPressed, setIsPressed] = useState(0)


    const handleCloseModalPress = useCallback(() => {
        navigation.goBack()
    }, []);





    // render
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>

                <View style={[, styles.modalHeadingView]}>
                    <Text style={Typography.header.x50}>
                        Filters
                    </Text>

                    <Pressable onPress={() => handleCloseModalPress()} style={{ marginEnd: Sizing.x20 }}>
                        {closeIcon}
                    </Pressable>

                </View>

                <Pressable id="name" style={[styles.button, { backgroundColor: isPressed == 1 ? Colors.neutral.s200 : 'transparent' }]}
                    onPressIn={() => setIsPressed(1)}
                    onPressOut={() => setIsPressed(0)}
                    onPress={() => dispatch(setFilter(1))}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginHorizontal: Sizing.x30, }}>
                        <View style={{ alignSelf: "center", flex: 0.1 }}>
                            {ByName}
                        </View>

                        <View style={{ alignSelf: "center", marginStart: Sizing.x30, flex: 0.6 }}>
                            <Text style={[{ flexDirection: 'row' }, Typography.subheader.x40]}>
                                By Name
                            </Text>
                        </View>

                        {selectedFilter == 1 ? <View style={{ flex: 0.2, alignItems: "flex-end", alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
                            {selectedIcon}
                        </View> : null}
                    </View>
                </Pressable>

                <Pressable id="gender" style={[styles.button, { backgroundColor: isPressed == 2 ? Colors.neutral.s200 : 'transparent' }]}
                    onPressIn={() => setIsPressed(2)}
                    onPressOut={() => setIsPressed(0)}
                    onPress={() => dispatch(setFilter(2))}

                >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginHorizontal: Sizing.x30 }}>
                        <View style={{ alignSelf: "center", flex: 0.1 }}>
                            <Image style={[styles.icon]} source={genderIcon} />
                        </View>

                        <View style={{ alignSelf: "center", marginStart: Sizing.x30, flex: 0.6 }}>
                            <Text style={[{ flexDirection: 'row' }, Typography.subheader.x40]}>
                                By Gender
                            </Text>
                        </View>

                        {selectedFilter == 2 ? <View style={{ flex: 0.2, alignItems: "flex-end", alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
                            {selectedIcon}
                        </View> : null}
                    </View>
                </Pressable>


                <Pressable id="species" style={[styles.button, { backgroundColor: isPressed == 3 ? Colors.neutral.s200 : 'transparent' }]}
                    onPressIn={() => setIsPressed(3)}
                    onPressOut={() => setIsPressed(0)}
                    onPress={() => dispatch(setFilter(3))}

                >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginHorizontal: Sizing.x30 }}>
                        <View style={{ alignSelf: "center", flex: 0.1 }}>
                            <Image style={[styles.icon]} source={speciesIcon} />
                        </View>

                        <View style={{ alignSelf: "center", marginStart: Sizing.x30, flex: 0.6 }}>
                            <Text style={[{ flexDirection: 'row' }, Typography.subheader.x40]}>
                                By Species
                            </Text>
                        </View>

                        {selectedFilter == 3 ? <View style={{ flex: 0.2, alignItems: "flex-end", alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
                            {selectedIcon}
                        </View> : null}
                    </View>
                </Pressable>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
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


