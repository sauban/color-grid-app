import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Grid from './Grid';

export default class App extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text
                        style={styles.headerText}
                        testID="MainHeaderText">
                        7 X 7 Color Grid
                    </Text>
                    <Text
                        style={styles.subText}
                        testID="SubHeaderText">
                        Tap on the colors below to change
                    </Text>
                </View>
                <Grid />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: { flex: 0.5, alignItems: 'center', justifyContent: 'center' },
    headerText: {
        fontSize: 30,
    },
    subText: {
        fontSize: 15
    }
});
