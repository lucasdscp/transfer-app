import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Header from '../../components/Header';
import MoneyGraph from './MoneyGraph';
import Contact from '../../components/Contact';

import contacts from '../../data/contacts';

class History extends Component {
    state = {
        transactions: []
    }

    onBack = () => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    buildUserTransactions = transactions => {
        let userTransactions = [];
        transactions.map(transaction => {
            const userIndex = userTransactions.findIndex(user => user.id === transaction.userid);
            if (userIndex > -1) {
                userTransactions[userIndex].amount += transaction.value;
            } else {
                const contact = contacts.find(user => user.id === transaction.userid);
                userTransactions.push({
                    ...contact,
                    amount: transaction.value
                });
            }
        });
        userTransactions = userTransactions.sort((a, b) => a.amount < b.amount ? 1 : -1);
        return userTransactions;
    }

    renderTransactions = ({ item }) => {
        const contact = contacts.find(user => user.id === item.userid);
        return (
            <Contact info={{ ...contact, amount: item.value }} />
        );
    }

    render() {
        const { transactions } = this.state;
        const myTransactions = transactions.sort((a, b) => a.id < b.id ? 1 : -1);
        const userTransactions = this.buildUserTransactions(myTransactions);

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
                        keyExtractor={item => item.id}
                        renderItem={this.renderTransactions}/>
                    </View>
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

export default History;