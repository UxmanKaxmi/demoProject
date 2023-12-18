import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'



const Loading = () => (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator   size="large" />
    </View>
);

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