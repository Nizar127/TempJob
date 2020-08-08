import React from 'react';
import { StyleSheet, Text, View, Slider, ScrollView, Image, Alert } from 'react-native';
import { Container, List, ListItem, Header, Left, Body, Thumbnail, Right, Button, Title, Content, Card, Separator, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Drawer from 'react-navigation-drawer';

export default class Payment extends React.Component {



  render() {

    return (

      <Container style={{ flex: 1 }}>

        <Header>
          <View style={{ marginTop: 25, marginEnd: 350 }}>
            <Icon style={{ color: 'white' }} name="md-menu" onPress={() => this.props.navigation.openDrawer()} />
          </View>

        </Header>
        <ScrollView style={{ flex: 1 }}>


          <Separator>
            <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>List of Payment</Text>
          </Separator>
          <Card style={{ marginBottom: 5 }}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../../img/dude.jpg')} style={{ padding: 10 }} />
              </Left>
              <Body>
                <Text>Mitchell</Text>
                <Text note>Senior Experience</Text>
                <Text note numberOfLines={1}>Personal</Text>
              </Body>
              <Right>
                <Text style={{ paddingTop: 5, paddingBottom: 5, paddingStart: 5, paddingEnd: 7, color: 'black' }}>$500</Text>
                <Button primary rounded onPress={() => this.props.navigation.navigate('PaymentDetails')}>
                  <Text style={{ padding: 5, color: 'white', fontWeight: 'bold' }}>Details</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <Card style={{ marginBottom: 5 }}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../../img/dude.jpg')} style={{ padding: 10 }} />
              </Left>
              <Body>
                <Text>Mitchell</Text>
                <Text note>Senior Experience</Text>
                <Text note numberOfLines={1}>Personal</Text>
              </Body>
              <Right>
                <Text style={{ paddingTop: 5, paddingBottom: 5, paddingStart: 5, paddingEnd: 7, color: 'black' }}>$500</Text>
                <Button primary rounded onPress={() => this.props.navigation.navigate('PaymentDetails')}>
                  <Text style={{ padding: 5, color: 'white', fontWeight: 'bold' }}>Details</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <Card style={{ marginBottom: 5 }}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../../img/dude.jpg')} style={{ padding: 10 }} />
              </Left>
              <Body>
                <Text>Mitchell</Text>
                <Text note>Senior Experience</Text>
                <Text note numberOfLines={1}>Personal</Text>
              </Body>
              <Right>
                <Text style={{ paddingTop: 5, paddingBottom: 5, paddingStart: 5, paddingEnd: 7, color: 'black' }}>$500</Text>
                <Button primary rounded onPress={() => this.props.navigation.navigate('PaymentDetails')}>
                  <Text style={{ padding: 5, color: 'white', fontWeight: 'bold' }}>Details</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <Card style={{ marginBottom: 5 }}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../../img/dude.jpg')} style={{ padding: 10 }} />
              </Left>
              <Body>
                <Text>Mitchell</Text>
                <Text note>Senior Experience</Text>
                <Text note numberOfLines={1}>Personal</Text>
              </Body>
              <Right>
                <Text style={{ paddingTop: 5, paddingBottom: 5, paddingStart: 5, paddingEnd: 7, color: 'black' }}>$500</Text>
                <Button primary rounded onPress={() => this.props.navigation.navigate('PaymentDetails')}>
                  <Text style={{ padding: 5, color: 'white', fontWeight: 'bold' }}>Details</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <Card style={{ marginBottom: 5 }}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../../img/dude.jpg')} style={{ padding: 10 }} />
              </Left>
              <Body>
                <Text>Mitchell</Text>
                <Text note>Senior Experience</Text>
                <Text note numberOfLines={1}>Personal</Text>
              </Body>
              <Right>
                <Text style={{ paddingTop: 5, paddingBottom: 5, paddingStart: 5, paddingEnd: 7, color: 'black' }}>$500</Text>
                <Button primary rounded onPress={() => this.props.navigation.navigate('PaymentDetails')}>
                  <Text style={{ padding: 5, color: 'white', fontWeight: 'bold' }}>Details</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>







        </ScrollView>

      </Container>


    );

  }
}