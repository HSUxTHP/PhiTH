import { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import Loading from './LoadingComponent';
import { ListItem, Avatar } from 'react-native-elements';
//import Dishdetail from './DishdetailComponent';
// import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes
  }
};

class Menu extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   //selectedDish: null,
    //   // dishes: DISHES
    // };
  }
  render() {
    if (this.props.dishes.isLoading) {
      return (<Loading />);
    } else if (this.props.dishes.errMess) {
      return (<Text>{this.props.errMess}</Text>);
    } else {
      return (
        <FlatList  data={this.props.dishes.dishes} 
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={(_, index) => index.toString()}
        />
      );
    }
  }
  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;
    return (
      <Animatable.View animation='fadeInRightBig' duration={2000}>
      <ListItem key={index} onPress={() => navigate('Dishdetail', { dishId: item.id })}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar source={{uri: baseUrl + item.image}} />
          <ListItem.Content style={{ marginLeft: 10 }}>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </ListItem.Content>
        </View>
      </ListItem>
      </Animatable.View>
    );
  }
  /*onDishSelect(item) {
    this.setState({ selectedDish: item });
  }*/
}
export default connect(mapStateToProps)(Menu);