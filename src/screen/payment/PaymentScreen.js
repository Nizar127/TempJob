import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Container } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './components/Button';
import stripe from 'tipsi-stripe';
stripe.setOptions({
    publishableKey:
        'pk_test_Vsl7TzdVtZmpbgY0nN0Smn8S00Ap8g1mAT',
})

export default class PaymentScreen extends PureComponent {
    static title = 'Card Form'

    state = {
        loading: false,
        token: null,
    }

    handleCardPayPress = async () => {
        try {
            this.setState({ loading: true, token: null })
            const token = await stripe.paymentRequestWithCardForm({
                // Only iOS support this options
                smsAutofillDisabled: true,
                requiredBillingAddressFields: 'full',
                prefilledInformation: {
                    billingAddress: {
                        name: 'Ahmad Fakhrul Nizar',
                        line1: '272, Lorong Tok Payung',
                        line2: 'Kuala Ibai',
                        city: 'Kuala Terengganu',
                        state: 'Terengganu',
                        country: 'MY',
                        postalCode: '20400',
                        email: 'ahmadfakhrul127@gmail.com',
                    },
                },
            })

            this.setState({ loading: false, token })
        } catch (error) {
            this.setState({ loading: false })
        }
    }

    render() {
        const { loading, token } = this.state

        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <View style={{ marginTop: 13, marginEnd: 350 }}>
                        <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                    </View>
                </Header>
                <View style={styles.container}>

                    <Text style={styles.header}>
                        Add Card Here
          </Text>
                    <Text style={styles.instruction}>
                        Click button to show Card Form dialog.
          </Text>
                    <Button
                        text="Enter you card and pay"
                        loading={loading}
                        onPress={this.handleCardPayPress}
                    />
                    <View
                        style={styles.token}
                    >
                        {token &&
                            <Text style={styles.instruction}>
                                Token: {token.tokenId}
                            </Text>
                        }
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instruction: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    token: {
        height: 20,
    },
})
