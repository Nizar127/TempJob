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
  auto,
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


export default class UserProfile extends Component {


  constructor(props) {
    super(props);


    showActionSheet = () => {
      this.ActionSheet.show()
    }

    handlePress = (buttonIndex) => {
      this.setState({ selected: buttonIndex })
    }
  }

  render() {
    return (
      <Container>
        <ScrollView>
          <View style={{ alignItems: 'center', justifyContent: 'center', height: 400, width: null }} >
            <CardItem>

              <Text style={{ justifyContent: 'center', marginTop: 20 }}>
                Profile
                    </Text>

            </CardItem>
            <CardItem style={{ marginTop: 5 }} >
              <Thumbnail large source={require('../../img/kambing.jpg')} style={{ alignSelf: 'center' }} />
            </CardItem>
            <CardItem>
              <Text>James Corden</Text>
            </CardItem>
            <CardItem>
              <Text note><Icon name="md-pin" size={30} /> Kuala Terengganu, Malaysia</Text>
            </CardItem>
            <CardItem style={{ justifyContent: 'center', margin: 30 }}>
              <Button rounded
                onPress={() => this.props.navigation.navigate('Calendar')}
                style={{
                  backgroundColor: '#f5f5f5',
                  color: 'black',
                  fontSize: 10,
                  shadowColor: 'black',
                  shadowOpacity: 0.3
                }}
              >
                <Text style={{ color: 'black' }}>
                  View Availability
                               </Text>

              </Button>
            </CardItem>
          </View>
          <ScrollView>
            <View style={{ marginTop: 20, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch' }}>


            </View>
          </ScrollView>




        </ScrollView>



      </Container>



    );
  }
}

