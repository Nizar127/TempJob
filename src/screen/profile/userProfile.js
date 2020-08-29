import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Container,
  Header,
  Content,
  View,
  Card,
  Right,
  Label,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  List,
  ListItem,
  Separator,
  Tabs,
  Tab,
  TabHeading,
  ActionSheet,
  Button
} from 'native-base';
//import  ActionSheet from 'react-native-actionsheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Contact from '../profile/Contact';
import Reward from '../profile/Reward';
import Resume from './Project';

export default class UserProfile extends Component {


  constructor(props) {
    super(props);


    // showActionSheet = () => {
    //   this.ActionSheet.show()
    // }

    // handlePress = (buttonIndex) => {
    //   this.setState({ selected: buttonIndex })
    // }
  }

  render() {
    return (
      <Container>
        <ScrollView>
          <Header style={{ backgroundColor: 'white' }}>
            <View style={{ marginTop: 13, marginEnd: 350 }}>
              <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
            </View>
          </Header>
          <View style={{ alignItems: 'center', justifyContent: 'center' }} >
            <CardItem style={{ marginTop: 5 }} >
              <Thumbnail large source={require('../../img/kambing.jpg')} style={{ alignSelf: 'center' }} />
            </CardItem>
            <CardItem>
              <Text style={{ elevation: 10, fontWeight: 'bold', fontFamily: "CerealMedium", fontSize: 20 }}>nizar ahmad fakhrul</Text>
            </CardItem>
            <CardItem>
              <Text note><Icon name="md-pin" style={{ color: 'red' }} size={30} /> Kuala Terengganu, Malaysia</Text>
            </CardItem>
            <Card style={{ flexDirection: 'column' }}>
              <View style={Style.infoBoxWrapper}>
                <View style={Style.infoBox}>
                  <Label style={Style.text}>Job Posted</Label>
                </View>
                <View style={Style.infoBox}>
                  <Label style={Style.text}>Applicants</Label>
                </View>
                <View style={Style.infoBox}>
                  <Label style={Style.text}>Company Type</Label>
                </View>
              </View>
              <View style={Style.infoBoxWrapper}>
                <View style={Style.infoBox}>
                  <Label style={Style.textInfo}>100</Label>
                </View>
                <View style={Style.infoBox}>
                  <Label style={Style.textInfo}>50</Label>
                </View>
                <View style={Style.infoBox}>
                  <Label style={Style.textInfo}>System Integrator</Label>
                </View>
              </View>
            </Card>

          </View>
          <ScrollView>
            <View style={{ backgroundColor: 'white', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch' }}>

              <Tabs tabBarUnderlineStyle={{ backgroundColor: '#000000' }} tabBarUnderlineStyle={{ borderBottomWidth: 2 }}>
                <Tab tabStyle={{ backgroundColor: '#2f2483' }} heading={<TabHeading style={{ justifyContent: 'space-between', color: 'white' }}><Text> Job Complete</Text></TabHeading>}>
                  <Reward />
                </Tab>
                <Tab tabStyle={{ backgroundColor: 'red' }} heading={<TabHeading><Text> OnGoing Job</Text></TabHeading>}>
                  <Resume />
                </Tab>
                <Tab tabStyle={{ backgroundColor: 'red' }} heading={<TabHeading><Text>Availabilty</Text></TabHeading>}>
                  <Contact />
                </Tab>
              </Tabs>
            </View>
          </ScrollView>




        </ScrollView>



      </Container>



    );
  }
}

const Style = StyleSheet.create({

  tab: {
    color: 'white',
    textShadowColor: 'black'
  },
  infoBoxWrapper: {

    borderTopColor: '#000000',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 70,
    marginBottom: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoBox: {
    width: '33%',
    alignItems: 'center',
    color: 'black',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 4
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'montserrat'
  },
  textInfo: {
    color: '#2B18FD',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'montserrat'

  }
})