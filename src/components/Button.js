import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ onPress, label, style }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, style]}>
                <Text style={styles.label}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00a7aa',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF'
    }
});

export default Button;