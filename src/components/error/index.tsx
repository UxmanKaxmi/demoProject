import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import React, { memo } from 'react'
import LottieView from "lottie-react-native";
import { Colors, Sizing, Typography } from 'styles';
import { useAppSelector } from 'hooks';
import { RootState } from 'store/store';


interface errorProps {
}

const Loading: React.FC<errorProps> = (props: errorProps) => {

    return (

        <View style={[styles.container]}>
            <LottieView
                source={require("@assets/animations/error-animation.json")}
                style={{
                    width: Sizing.layout.x140,
                    height: Sizing.layout.x140,
                }}
                autoPlay
                loop />
            <Text style={styles.errorText}>{"No data here..."}</Text>
        </View>

    )



}


const styles = StyleSheet.create({
    errorText: {
        ...Typography.subheader.x50,
        paddingTop: Sizing.x40,
        color: Colors.warning.s400

    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },

});

export default memo(Loading);