import React, { Component } from 'react';
import { 
    View, 
    StyleSheet, 
    StatusBar, 
    Image, 
    Text,
    SafeAreaView,
    Platform
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import AnimatedCircularProgress from 'react-native-conical-gradient-progress';
import AsyncStorage from '@react-native-community/async-storage';

import Button from '../../components/Button';

class Home extends Component {
    state = {
        userName: 'Lucas Viana',
        email: 'lucasdscp@gmail.com'
    }

    goTo = (routeName, params) => {
        const { navigation } = this.props;
        navigation.push(routeName, params);
    }

    componentDidMount() {
        AsyncStorage.getItem('token')
        .then(token => {
            if (!token) {
                const { userName, email } = this.state;
                const requestInfo = {
                    method: 'GET'
                };
        
                fetch(`https://42pdzdivm6.execute-api.us-east-2.amazonaws.com/public/GenerateToken?nome=${userName}&email=${email}`, requestInfo)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    }
                })
                .then(token => {
                    AsyncStorage.setItem('token', token);
                });
            }
        })
    }

    render() {
        const { userName, email } = this.state;

        return (
            <LinearGradient
            colors={['#212935', '#004e84']}
            style={styles.background}>
                <SafeAreaView style={styles.background}>
                    <StatusBar barStyle="light-content" />
                    <View style={styles.userContainer}>
                        <View style={styles.photoContainer}>
                            <AnimatedCircularProgress
                            size={200}
                            width={8}
                            fill={100}
                            segments={60}
                            beginColor="#1d314f"
                            endColor="#00fdc3"
                            backgroundColor="rgba(255, 255, 255, 0.0)" />
                            <Image source={require('../../img/user.jpg')} style={styles.photo} />
                        </View>
                        <Text style={styles.username}>{userName}</Text>
                        <Text style={styles.email}>{email}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <Button 
                        label={'ENVIAR DINHEIRO'} 
                        style={[styles.sendButton, styles.buttons]}
                        onPress={this.goTo.bind(this, 'SendMoney')} />
                        <Button 
                        label={'HISTÓRICO DE ENVIOS'} 
                        style={styles.buttons}
                        onPress={this.goTo.bind(this, 'History')} />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    userContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },
    photo: {
        width: 190,
        height: 190,
        borderRadius: 95,
        backgroundColor: '#004e84',
        position: 'absolute'
    },
    username: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: '600',
        marginBottom: 2
    },
    email: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '300'
    },
    buttonsContainer: {
        marginBottom: Platform.OS == 'ios' ? 16 : 32,
        alignItems: 'center'
    },
    sendButton: {
        marginBottom: 16
    },
    buttons: {
        width: 250
    }
});

export default Home;