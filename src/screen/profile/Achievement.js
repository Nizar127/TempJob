import React, { Component } from 'react';
import { StyleSheet, Alert, FlatList, View, Image, ActivityIndicator, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Label, Card, CardItem, Content, Footer, FooterTab, Button, Text, Item, Input, Left, Right, Header, Body } from 'native-base';
import firestore from '@react-native-firebase/firestore';



//let job = db.ref('/Job');

export default class PersonalSkill extends Component {
    constructor() {
        super();
        this.state = {
            textInput: [],
            inputData: [],
            time: '',
            worktime: '',
        }

    }


    //function to add TextInput dynamically
    addTextInput = (index) => {
        let textInput = this.state.textInput;
        textInput.push(
            <View key={index} style={{ flexDirection: 'row', margin: 5 }}>
                <TextInput style={styles.startRouteBtn} onChangeText={(text) => this.addValues(text, index)} />
                <Icon android name="md-remove" size={30} style={{ marginTop: 30 }} onPress={() => this.removeTextInput()} />
            </View>

        );
        this.setState({ textInput });
    }

    //function to remove TextInput dynamically
    removeTextInput = () => {
        let textInput = this.state.textInput;
        let inputData = this.state.inputData;
        textInput.pop();
        inputData.pop();
        this.setState({ textInput, inputData });
    }

    //function to add text from TextInputs into single array
    addValues = (text, index) => {
        let dataArray = this.state.inputData;
        let checkBool = false;
        if (dataArray.length !== 0) {
            dataArray.forEach(element => {
                if (element.index === index) {
                    element.text = text;
                    checkBool = true;
                }
            });
        }
        if (checkBool) {
            this.setState({
                inputData: dataArray
            });
        }
        else {
            dataArray.push({ 'text': text, 'index': index });
            this.setState({
                inputData: dataArray
            });
        }
    }

    //function to console the output
    getValues = () => {
        console.log('Data', this.state.inputData);
    }



    render() {

        return (
            <ScrollView>
                <Container>
                    <Header style={{ backgroundColor: 'white' }}>
                        <View style={{ marginTop: 13, marginEnd: 350 }}>
                            <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
                        </View>
                    </Header>
                    <Item fixedLabel last style={{ marginTop: 20, marginBottom: 10 }}>
                        <Label style={styles.MainText}>Add Achievement:</Label>
                    </Item>
                    <Item fixedLabel last style={styles.row}>
                        <Input bordered style={styles.startRouteBtn} placeholder="Please State Your Destination" />
                        <Icon android name="md-add" size={30} onPress={() => this.addTextInput(this.state.textInput.length)} />
                    </Item>
                    {this.state.textInput.map((value) => {
                        return value
                    })}

                    <Button success style={styles.AddNewBtn} onPress={() => this.getValues()}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Submit</Text>
                    </Button>


                </Container>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // startRouteBtn: {
    //   backgroundColor: 'white',
    //   height: 70,
    //   borderRadius: 35,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   marginHorizontal: 20
    // },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 100,
        backgroundColor: '#E91E63',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    MainText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'montserrat',
        elevation: 5,
        padding: 5,
        margin: 10,
        color: 'red'
    },
    AddNewBtn: {
        backgroundColor: 'green',
        height: 70,
        width: 200,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 30,
        marginLeft: 100
    },
    startRouteBtn: {
        backgroundColor: 'white',
        height: 50,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        shadowColor: 'black',
        margin: 20,
        elevation: 10
    },
    buttonView: {
        flexDirection: 'row'
    },
    textInput: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        margin: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        marginTop: 5
    },
    button: {
        backgroundColor: "#4EB151",
        paddingVertical: 11,
        paddingHorizontal: 17,
        borderRadius: 3,
        marginVertical: 50
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "300"
    }
})
