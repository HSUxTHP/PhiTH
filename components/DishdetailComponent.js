import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Image } from 'react-native-elements';

class RenderDish extends Component {
  render() {
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <Card>
          <Image source={require('./images/uthappizza.png')} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
          </Image>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
        </Card>
      );
    }
    return (<View />);
  }
}

class Dishdetail extends Component {
  render() {
    return (
      <RenderDish dish={this.props.dish} />
    );
  }
}
export default Dishdetail;