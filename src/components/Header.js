import React from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Text,
    Image
} from 'react-native';

const Header = ({ title, onBack }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBack}>
                <View style={styles.buttonContainer}>
                    <Image 
                    source={require('../img/chevron.png')} 
                    style={styles.button}/>
                </View>
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        left: 0,
        right: 0,
        height: 50,
        flexDirection: 'row',
        marginBottom: 16
    },
    title: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '600',
        fontSize: 18
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingRight: 66
    },
    button: {
        width: 22,
        height: 22
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        marginLeft: 16
    }
});

export default Header;