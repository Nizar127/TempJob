import React from 'react';
import { StyleSheet, Text, ScrollView, Image, Alert } from 'react-native';
import { Container, CheckBox, Header, Left, Body, Thumbnail, Right, Button, Icon, Title, List, ListItem, Content, Item } from 'native-base';


export default class JobType extends React.Component {



  render() {

    return (

      <Container>
        <Header style={{ backgroundColor: 'white' }}>
          <View style={{ marginTop: 13, marginEnd: 350 }} >
            <Icon style={{ color: 'black' }} size={30} name="md-arrow-back" onPress={() => this.props.navigation.goBack()} />
          </View>
        </Header>


        <Container>
          <Text>Job Preference</Text>
          <Content>
            <ListItem>
              <CheckBox checked={true} />
              <Body>
                <Text>Contract</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={false} />
              <Body>
                <Text>Remote Work</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={false} color="green" />
              <Body>
                <Text>Freelance</Text>
              </Body>
            </ListItem>
            <ListItem>
              <CheckBox checked={false} color="green" />
              <Body>
                <Text>Part-Time</Text>
              </Body>
            </ListItem>
          </Content>
        </Container>
      </Container>
    );
  }
}