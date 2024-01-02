import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import LottieView from "lottie-react-native";
import { Sizing } from 'styles';


interface isAnimProps {
    isAnim?: boolean,
}

const Loading: React.FC<isAnimProps> = (props: isAnimProps) => {


    if (props?.isAnim) {
        return (

            <View style={{ flex:1,alignSelf:"center", justifyContent:'center' }}>
                <LottieView
                    source={require("@assets/animations/loading-animation.json")}
                    style={{
                        width: Sizing.layout.x140,
                        height: Sizing.layout.x140,
                    }}
                    autoPlay
                    loop />
            </View>

        )
    }

    else {
        return (

            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" />
            </View>

        )
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

export default Loading;