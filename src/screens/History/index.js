import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, ActivityIndicator } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../../components/Header';
import MoneyGraph from './MoneyGraph';
import Contact from '../../components/Contact';

import contacts from '../../data/contacts';

class History extends Component {
    state = {
        transactions: [],
        isLoading: false,
        isEmpty: false
    }

    onBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    buildUserTransactions = transactions => {
        let userTransactions = [];
        transactions.map(transaction => {
            const userIndex = userTransactions.findIndex(user => user.id === transaction.ClienteId);
            if (userIndex > -1) {
                userTransactions[userIndex].amount += transaction.valor;
            } else {
                const contact = contacts.find(user => user.id === transaction.ClienteId);
                userTransactions.push({
                    ...contact,
                    amount: transaction.valor
                });
            }
        });
        userTransactions = userTransactions.sort((a, b) => a.amount < b.amount ? 1 : -1);
        return userTransactions;
    }

    renderTransactions = ({ item }) => {
        const contact = contacts.find(user => user.id === item.ClienteId);
        return (
            <Contact info={{ ...contact, amount: item.valor }} />
        );
    }

    componentDidMount() {
        AsyncStorage.getItem('token')
        .then(token => {
            this.setState({ isLoading: true });

            const userToken = JSON.parse(token);
            const requestInfo = {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            };
    
            fetch(`https://42pdzdivm6.execute-api.us-east-2.amazonaws.com/public/GetTransfers?token=${userToken}`, requestInfo)
            .then(response => {
                this.setState({ isLoading: false });

                if (response.ok) {
                    return response.text();
                }
            })
            .then(response => {
                const transactions = JSON.parse(response);
                const isEmpty = transactions && !transactions.length;
                this.setState({ transactions, isEmpty });
            });
        })
    }

    renderLoading = () => {
        const { isLoading, isEmpty } = this.state;

        if (isLoading) {
            return (
                <View style={styles.loadingContent}>
                    <ActivityIndicator size="large" color="#00a7aa" />
                    <Text style={styles.loadingText}>Carregando informações...</Text>
                </View>
            );
        }

        if (isEmpty) {
            return (
                <View style={styles.loadingContent}>
                    <Text style={styles.loadingText}>Envie dinheiro para ver suas transações aqui :)</Text>
                </View>
            );
        }

        return (
            <View />
        );
    }

    render() {
        const { transactions } = this.state;
        const myTransactions = transactions.sort((a, b) => a.Data < b.Data ? 1 : -1);
        const userTransactions = this.buildUserTransactions(myTransactions);
        console.log(userTransactions);

        return (
            <LinearGradient
            colors={['#212935', '#004e84']}
            style={styles.background}>
                <SafeAreaView style={styles.background}>
                    <Header onBack={this.onBack} title="HISTÓRICO DE ENVIOS" />
                    <View style={{ flex: 0.5 }}>
                        <MoneyGraph userTransactions={userTransactions} />
                    </View>
                    <View
                    style={{ flex: 1 }}>
                        <FlatList
                        removeClippedSubviews
                        data={transactions}
                        keyExtractor={item => item.Id}
                        renderItem={this.renderTransactions}/>
                    </View>
                    {this.renderLoading()}
                </SafeAreaView>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    loadingContent: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 150,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        color: '#FFF',
        fontWeight: '300',
        marginTop: 16
    }
});

export default History;