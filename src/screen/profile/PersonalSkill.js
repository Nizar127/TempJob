import React from 'react';
import { StyleSheet, Text, List, View, Slider, ScrollView, Image, Alert } from 'react-native';
import { Container, Card, CardItem, Header, Left, Body, Thumbnail, Right, Button, Icon, Title, Input, Content, Item } from 'native-base';


export default class PersonalSkill extends React.Component {

  constructor() {
    super();

    this.state = {
      skills: []
    }

  }

  renderView() {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  }

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

            <Item rounded>
              <Input placeholder='Rounded Textbox' />
              <Button rounded onPress={this.renderView}><Text>Flaunt Your Skill</Text></Button>
            </Item>
          </Content>
        </Container>

        <Container>
          <Content>
            <Text>This is the outline of the listiem</Text>
          </Content>
        </Container>
      </Container>
    );
  }
}