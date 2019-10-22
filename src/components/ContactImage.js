import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ContactImage = ({ info }) => {
    let initials = '';

    if (info && info.name) {
        initials = info.name.match(/([A-Z])/g);
        initials = `${initials[0]}${initials[initials.length-1]}`;
    }

    return (
        <View style={styles.imageContent}>
            <Text style={styles.imageText}>
                {initials}
            </Text>
            {info && info.image &&
            <Image 
            source={{ uri: info.image }}
            style={styles.image} />}
        </View>
    );
}

const styles = StyleSheet.create({
    imageContent: {
        width: 80,
        height: 80,
        borderColor: '#00a6b8',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageText: {
        color: '#00a6b8',
        fontSize: 24,
        fontWeight: 'bold'
    },
    image: {
        position: 'absolute',
        width: 75,
        height: 75,
        borderRadius: 37.5
    }
});

export default ContactImage;