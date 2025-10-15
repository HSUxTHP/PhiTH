import React, { Component } from 'react';
import { ScrollView, Text, View, FlatList  } from 'react-native';
import { Card,ListItem, Avatar } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';

class About extends Component {
    constructor(props) {
    super(props);
    this.state = {
      leaders: LEADERS
    };
  }
  render() {
    const renderLeaderItem = ({ item }) => (
      <View key={item.id}>
        <ListItem bottomDivider>
          <Avatar source={require('./images/alberto.png')} rounded />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </View>
    );
    return (
      <ScrollView>
        <Card>
          <Card.Title>Our History</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10 }}>
            Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
          </Text>
          <Text style={{ margin: 10 }}>
            The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
          </Text>
        </Card>

        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <View>
            <FlatList
              data={this.state.leaders}
              renderItem={renderLeaderItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        </Card>
      </ScrollView>
    );
  }
}

export default About;
