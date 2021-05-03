import React from 'react';
import { View, Image, Text, Button, Linking } from 'react-native';
import { withNavigation } from 'react-navigation';
import moment from 'moment';


class PlayList extends React.Component {
    handlePress = (item) => {
        Linking.canOpenURL(item.trackViewUrl).then(supported => {
            if (supported) {
                Linking.openURL(item.trackViewUrl);
            } else {
                console.log("Don't know how to open URI: " + item.trackViewUrl);
            }
        });
    }
    render() {

        const { item } = this.props.navigation && this.props.navigation.state && this.props.navigation.state.params;
        console.log("item" + JSON.stringify(item));
        const minute = Math.floor((item.trackTimeMillis % (1000 * 60 * 60)) / (1000 * 60));

        return (
            <View
                style={{ flex: 1, padding: 10, flexDirection: 'column', alignItems: 'center' }}>
                <Image source={{ uri: item.artworkUrl100 }} style={{
                    width: 201,
                    height: 251,
                    resizeMode: 'contain'
                }} />
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ textAlign: 'center', fontStyle: 'italic', fontSize: 14 }}>{item.trackName}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>{item.artistName}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>{item.primaryGenreName}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>Duration {minute} min</Text>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>{moment(item.releaseDate).format('MMMM YYYY')}</Text>
                    <Button title={'Preview'} onPress={() => this.handlePress(item)} />
                </View>
            </View>

        );
    }
}


export default withNavigation(PlayList);