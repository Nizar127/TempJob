import React from 'react';
import { StyleSheet, Text, List, View, Slider, ScrollView, Image, Alert } from 'react-native';
import { Container, Card, CardItem, Header, Left, Body, Thumbnail, Right, Button, Icon, Title, Segment, Content, Item } from 'native-base';


export default class ViewProfile extends React.Component {



  render() {

    return (

      <Container>
        <Header style={{ backgroundColor: 'white' }}>
          <View style={{ marginTop: 13, marginEnd: 350 }} >
            <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
          </View>
        </Header>


        <Container>
          <Content>
            <Text style={{ paddingBottom: 30 }}>MOST COMMON FAQ</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>1. How Do Know That I've Been Hired?</Text>
            <Text>We will notify you via push notification. The information will be available in Manage Tab as well. User have 12 Hours to decide whether to accept or reject</Text>
          </Content>
        </Container>
      </Container>
    );
  }
}