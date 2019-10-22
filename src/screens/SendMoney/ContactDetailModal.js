import React, { Component } from 'react';
import { 
    Modal, 
    View, 
    Image, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import ContactImage from '../../components/ContactImage';
import Button from '../../components/Button';

import { TextInputMask } from 'react-native-masked-text'

class ContactDetailModal extends Component {
    state = {
        moneyToSend: ''
    }

    sendMoney = () => {
        const { moneyToSend } = this.state;
        const { info } = this.props;

        AsyncStorage.getItem('token')
        .then(token => {
            if (moneyToSend) {
                const valor = moneyToSend
                .replace('R$', '')
                .replace(',', '.');
    
                const requestInfo = {
                    method: 'POST',
                    body: JSON.stringify({
                        ClienteId: info.id,
                        token: JSON.parse(token),
                        valor: parseFloat(valor).toFixed(2)
                    }),
                    headers: {
                        'Accept': '*/*',
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                };
    
                fetch('https://42pdzdivm6.execute-api.us-east-2.amazonaws.com/public/SendMoney', requestInfo)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    }
                })
                .then(response => {
                    console.log(response);
                });
            }
        });
    }

    onChangeText = text => {
        this.setState({
            moneyToSend: text
        });
    }

    beforeClose = () => {
        this.onChangeText('');
        this.props.onClose();
    }

    render() {
        const { isVisible, info } = this.props;

        return (
            <Modal
            animationType="fade"
            transparent
            visible={isVisible}
            >
                <View style={styles.background}>
                    <View style={styles.modal}>
                        <View style={styles.closeContent}>
                            <TouchableOpacity onPress={this.beforeClose}>
                                <Image 
                                source={require('../../img/cross.png')} 
                                style={styles.closeButton} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.contactInfo}>
                            <ContactImage info={info}/>
                            <Text style={styles.name}>{info.name}</Text>
                            <Text style={styles.label}>{info.phone}</Text>
                        </View>
                        <View style={styles.sendContent}>
                            <Text style={styles.label}>Valor a enviar:</Text>
                            <TextInputMask
                            type={'money'}
                            value={this.state.moneyToSend}
                            onChangeText={this.onChangeText}
                            style={styles.input}
                            placeholder="R$ 0,00"
                            />
                            <Button 
                            label="ENVIAR" 
                            onPress={this.sendMoney} 
                            style={styles.button}/>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        width: 332,
        minHeight: 300,
        borderRadius: 16,
        backgroundColor: '#20576b',
        position: 'absolute'
    },
    closeButton: {
        width: 16,
        height: 16,
    },
    contactInfo: {
        flex: 1,
        alignItems: 'center',
        marginTop: 16
    },
    closeContent: {
        position: 'absolute',
        zIndex: 1,
        left: 22,
        top: 22,
        zIndex: 2
    },
    name: {
        marginTop: 8,
        color: '#FFF',
        fontSize: 20,
        fontWeight: '600'
    },
    label: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '300'
    },
    sendContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginTop: 16
    },
    button: {
        width: 300
    },
    input: {
        backgroundColor: '#FFF',
        left: 0,
        width: 300,
        height: 50,
        borderRadius: 16,
        marginTop: 16,
        marginBottom: 16,
        color: '#00a7aa',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '600'
    }
});

export default ContactDetailModal;