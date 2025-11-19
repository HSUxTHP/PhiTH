import React, { Component } from 'react';
import { View, Text, FlatList, Modal } from 'react-native';
import { Card, Image, Icon, Input, Button, Rating } from 'react-native-elements';
/*import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';*/
import { baseUrl } from '../shared/baseUrl';
import { ScrollView } from 'react-native-virtualized-view';

class RenderDish extends Component {
  render() {
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <Card>
          <Image source={{ uri: baseUrl + dish.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
          </Image>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Icon raised reverse type='font-awesome' color='#f50'
              name={this.props.favorite ? 'heart' : 'heart-o'}
              onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
            <Icon
              raised
              reverse
              type='font-awesome'
              name='pencil'
              color='#512DA8'
              onPress={() => this.props.onPressComment()} />
          </View>
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
    comments: state.comments,
    favorites: state.favorites
  }
};
import { postFavorite, postComment } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment))
});

class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <FlatList data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={(item) => item.id.toString()} />
      </Card>
    );
  }
  renderCommentItem(item, index) {
    const rating = Number(item.rating) || 1;
    const maxStars = 5;
    const filledStars = '★'.repeat(Math.min(rating, maxStars));
    const emptyStars = '☆'.repeat(Math.max(0, maxStars - rating));
    const dateObj = item.date ? new Date(item.date) : null;
    const formattedDate = dateObj && !isNaN(dateObj.getTime())
      ? dateObj.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
      : (item.date || '');

    return (
      <View key={index} style={{ margin: 10 }}>
      <Text style={{ fontSize: 14 }}>{item.comment}</Text>
      <Text>
        <Text style={{ fontSize: 12, color: '#FFD700' }}>{filledStars}</Text>
        <Text style={{ fontSize: 12, color: '#FFD700' }}>{emptyStars}</Text>
      </Text>
      <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + formattedDate} </Text>
      </View>
    );
  };
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      author: '',
      comment: ''
    };
  }

  reset = () => {
    this.setState({ rating: 5, author: '', comment: '' });
  }

  handleSubmit = () => {
    const { rating, author, comment } = this.state;
    if (this.props.onSubmit) this.props.onSubmit(rating, author, comment);
    this.reset();
  }

  render() {
    return (
      <View style={{ padding: 10 }}>
        <Rating
          showRating
          startingValue={this.state.rating}
          imageSize={30}
          ratingCount={5}
          fractions={0}
          minValue={1}
          onFinishRating={(value) => this.setState({ rating: value })}
        />
        <Input
          placeholder='Author'
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          value={this.state.author}
          onChangeText={(text) => this.setState({ author: text })}
        />
        <Input
          placeholder='Comment'
          leftIcon={{ type: 'font-awesome', name: 'comment' }}
          value={this.state.comment}
          onChangeText={(text) => this.setState({ comment: text })}
          multiline
        />
        <Button
          title='Submit'
          onPress={this.handleSubmit}
          containerStyle={{ marginVertical: 10 }}
        />
        <Button
          title='Cancel'
          type='outline'
          onPress={this.props.onCancel}
        />
      </View>
    );
  }
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  render() {
    const dishId = parseInt(this.props.route.params.dishId);
    const dish = this.props.dishes.dishes[dishId];
    const comments = this.props.comments.comments.filter((cmt) => cmt.dishId === dishId);
    const favorite = this.props.favorites.some((el) => el === dishId);
    return (
      <ScrollView>
        <RenderDish dish={dish} favorite={favorite} onPressFavorite={() => this.markFavorite(dishId)} onPressComment={() => this.toggleModal()} />

        <Modal visible={this.state.showModal} onRequestClose={() => this.toggleModal()}>
          <CommentForm
            onSubmit={(rating, author, comment) => {
              this.props.postComment(dishId, rating, author, comment);
              this.toggleModal();
            }}
            onCancel={() => this.toggleModal()}
          />
        </Modal>

        <RenderComments comments={comments} />
      </ScrollView>
    );
  }
  markFavorite(dishId) {
    //this.setState({ favorites: this.state.favorites.concat(dishId) });
    this.props.postFavorite(dishId);
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);