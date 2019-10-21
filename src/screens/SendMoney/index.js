import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Header from '../../components/Header';

class SendMoney extends Component {
    onBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    render() {
        return (
            <LinearGradient
            colors={['#212935', '#004e84']}
            style={styles.background}>
                <SafeAreaView style={styles.background}>
                    <Header onBack={this.onBack} title="ENVIAR DINHEIRO" />
                </SafeAreaView>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    }
});

export default SendMoney;