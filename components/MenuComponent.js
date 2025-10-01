import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Dishdetail from './DishdetailComponent';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.dishes}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={(_, index) => index.toString()}
        />
        <Dishdetail dish={this.state.selectedDish} />
      </View>
    );
  }
  renderMenuItem(item, index) {
    return (
      <ListItem key={index} onPress={() => this.onDishSelect(item)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar source={require('./images/uthappizza.png')} />
          <ListItem.Content style={{ marginLeft: 10 }}>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </ListItem.Content>
        </View>
      </ListItem>
    );
  }
  onDishSelect(item) {
    this.setState({ selectedDish: item });
  }
}
export default Menu;