import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component {
  render() {
    return (
      <ScrollView>
        <Card>
          <Card.Title>Contact Information</Card.Title>
          <Card.Divider />
          <View style={{ margin: 5 }}>
            <Text style={{marginBottom: 10}}>121, Clear Water Bay Road</Text>
            <Text style={{marginBottom: 10}}>Clear Water Bay, Kowloon</Text>
            <Text style={{marginBottom: 10}}>HONG KONG</Text>
            <Text style={{marginBottom: 10}}>Tel: +852 1234 5678</Text>
            <Text style={{marginBottom: 10}}>Fax: +852 8765 4321</Text>
            <Text>Email:confusion@food.net</Text>
          </View>
        </Card>
      </ScrollView>
    );
  }
}

export default Contact;
