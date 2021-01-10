import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import NotifService from './NotifService';

class NotificationTest extends Component{

    constructor(props) {
        super(props);
        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );
    }

    _localNotification = () => {
        this.notif.localNotif();
    }

    onRegister(token) {
        this.setState({registerToken: token.token, fcmRegistered: true});
    }

    onNotif(notif) {
        Alert.alert(notif.title, notif.message);
    }
    render() {
        return <View style={{flex: 1}}>
            <TouchableOpacity onPress={this._localNotification}>
                <Text style={{color: '#0f0', fontSize: 30}}>本地推送</Text>
            </TouchableOpacity>

        </View>;
    }
}
export default NotificationTest;
