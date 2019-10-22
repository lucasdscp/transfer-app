import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import ContactImage from './ContactImage';

const Contact = ({ info, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.content}>
                    <ContactImage info={info} />
                    <View style={styles.infoContent}>
                        <Text style={styles.name}>{info.name}</Text>
                        <Text style={styles.number}>{info.phone}</Text>
                        {info.amount &&
                        <Text style={styles.amount}>{`R$ ${parseFloat(info.amount).toFixed(2)}`}</Text>}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        borderTopColor: 'rgba(0, 166, 184, 0.5)',
        borderTopWidth: 1,
        paddingTop: 16,
        paddingBottom: 16
    },
    content: {
        flexDirection: 'row'
    },
    infoContent: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 16
    },
    name: {
        color: '#00a6b8',
        fontSize: 20,
        fontWeight: '600'
    },
    number: {
        color: 'rgba(0, 166, 184, 0.7)',
        fontSize: 20,
        fontWeight: '300'
    },
    amount: {
        color: 'rgba(0, 166, 184, 0.7)',
        fontSize: 16,
        fontWeight: '300'
    }
});

export default Contact;