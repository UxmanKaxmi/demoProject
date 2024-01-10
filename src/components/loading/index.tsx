import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import LottieView from "lottie-react-native";
import { Sizing } from 'styles';


interface loadingProps {
    isAnimation?: boolean,
}

const Loading: React.FC<loadingProps> = (props: loadingProps) => {


    if (props?.isAnimation) {
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
        padding: Sizing.x10,
    },
});

export default memo(Loading);