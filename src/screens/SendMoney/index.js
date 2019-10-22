import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Header from '../../components/Header';
import Contact from '../../components/Contact';
import ContactDetailModal from './ContactDetailModal';
import contacts from '../../data/contacts';

class SendMoney extends Component {
    state = {
        modalVisible: false,
        sendingContact: {}
    };

    onBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    openDetails = (sendingContact) => {
        this.setState({
            modalVisible: true,
            sendingContact
        });
    }

    renderContacts = ({ item }) => {
        return (
            <Contact 
            info={item} 
            onPress={this.openDetails.bind(this, item)}/>
        );
    }

    onModalClose = () => {
        this.setState({
            modalVisible: false,
            sendingContact: {}
        });
    }

    onSuccess = () => {
        this.setState({
            modalVisible: false,
            sendingContact: {}
        });

        this.onBack();
    }

    render() {
        return (
            <LinearGradient
            colors={['#212935', '#004e84']}
            style={styles.background}>
                <ContactDetailModal
                isVisible={this.state.modalVisible}
                info={this.state.sendingContact}
                onClose={this.onModalClose}
                onSuccess={this.onSuccess} />
                <SafeAreaView style={styles.background}>
                    <Header onBack={this.onBack} title="ENVIAR DINHEIRO"/>
                    <FlatList
                    removeClippedSubviews
                    data={contacts}
                    keyExtractor={item => item.id}
                    renderItem={this.renderContacts} />
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