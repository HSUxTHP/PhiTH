import React, { Component } from 'react';
import { Platform, StyleSheet, View, ScrollView, Text, Switch, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      smoking: false,
      date: new Date(),
      showDatePicker: false
    }
  }
  render() {
    return (
      <Animatable.View animation='zoomIn' duration={2000}>
        <ScrollView>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker style={styles.formItem} itemStyle={Platform.OS === 'ios' ? { color: '#000' } : null}
              selectedValue={this.state.guests}
              onValueChange={(value) => this.setState({ guests: value })}>
              <Picker.Item label='1' value='1' />
              <Picker.Item label='2' value='2' />
              <Picker.Item label='3' value='3' />
              <Picker.Item label='4' value='4' />
              <Picker.Item label='5' value='5' />
              <Picker.Item label='6' value='6' />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/No-Smoking?</Text>
            <Switch style={styles.formItem} value={this.state.smoking} onValueChange={(value) => this.setState({ smoking: value })} />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <Icon name='schedule' size={36} onPress={() => this.setState({ showDatePicker: true })} />
            <Text style={{ marginLeft: 10 }}>{format(this.state.date, 'dd/MM/yyyy - HH:mm')}</Text>
            <DateTimePickerModal mode='datetime' themeVariant='light' isDarkModeEnabled={false}
              isVisible={this.state.showDatePicker}
              onConfirm={(date) => this.setState({ date: date, showDatePicker: false })}
              onCancel={() => this.setState({ showDatePicker: false })} />
          </View>
          <View style={styles.formRow}>
            <Button title='Reserve' color='#7cc' onPress={() => this.handleReservation()} />
          </View>
        </ScrollView>
      </Animatable.View>
    );
  }
  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: new Date(),
      showDatePicker: false
    });
  }
  handleReservation() {
    Alert.alert(
      'Your Reservation OK?',
      'Number of Guests: ' + this.state.guests + '\n' +
      'Smoking?: ' + (this.state.smoking ? 'true' : 'false') + '\n' +
      'Date and Time: ' + format(this.state.date, 'dd/MM/yyyy - HH:mm'),
      [
        { text: 'Cancel', onPress: () => this.resetForm() },
        {
          text: 'OK', onPress: () => {
            this.presentLocalNotification(this.state.date);
            this.resetForm();
          }
        },
      ]
    );
  }
  async presentLocalNotification(date) {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({ shouldShowBanner: true, shouldPlaySound: true, shouldSetBadge: true })
      });
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Your Reservation',
          body: 'Reservation for ' + date + ' requested',
          sound: true,
          vibrate: true
        },
        trigger: null
      });
    }
  }
}
export default Reservation;

const styles = StyleSheet.create({
  formRow: { alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row', margin: 20 },
  formLabel: { fontSize: 18, flex: 2 },
  formItem: { flex: 1 }
});