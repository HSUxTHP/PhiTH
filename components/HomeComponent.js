import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Card, Image } from 'react-native-elements';

/*import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';*/
import { baseUrl } from '../shared/baseUrl';

class RenderItem extends Component {
  render() {
    const item = this.props.item;
    if (item != null) {
      return (
        <Card>
          <Image source={{ uri: baseUrl + item.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card.FeaturedTitle>{item.name}</Card.FeaturedTitle>
            <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
          </Image>
          <Text style={{ margin: 10 }}>{item.description}</Text>
        </Card>
      );
    }
    return (<View />);
  }
}

// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders
  }
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const dish = this.props.dishes.dishes.filter((dish) => dish.featured === true)[0];
    const promo = this.props.promotions.promotions.filter((promo) => promo.featured === true)[0];
    const leader = this.props.leaders.leaders.filter((leader) => leader.featured === true)[0];
    return (
      <ScrollView>
        <RenderItem item={dish} />
        <RenderItem item={promo} />
        <RenderItem item={leader} />
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(Home);