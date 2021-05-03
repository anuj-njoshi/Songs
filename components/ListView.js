import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import { withNavigation } from 'react-navigation';



class ListView extends Component {
    state = {
        data: [],
        count: []
    }
    arrayUnique = (arr, uniqueKey) => {
        const flagList = new Set()
        return arr.filter(function (item) {
            if (!flagList.has(item[uniqueKey])) {
                flagList.add(item[uniqueKey])
                return true
            }
        })
    }
    componentDidMount = () => {
        fetch('https://itunes.apple.com/search?term=Michael+jackson', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {


                const filterData = this.arrayUnique(responseJson.results, 'trackId');
                console.log('filterData' + filterData.length);
                this.setState({
                    data: filterData,
                    count: responseJson.resultCount
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }

    open = () => {

    }

    render() {
        const { data } = this.state;
        if (!data.length) {
            return (
                <View style={{
                    flex: 1, flexDirection: 'column',
                    justifyContent: "center"
                }}>
                    <ActivityIndicator animating={true}
                        color='#bc2b78'
                        size="large"
                        style={styles.activityIndicator} />
                    <Text style={{ color: '#000', textAlign: 'center' }}>Please Wait</Text>
                </View>
            )
        }
        const renderItem = ({ item }) => (
            <Item item={item} title={item.artistName} />
        );
        const Item = ({ item, title }) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('PlayList', { item })} 
            style={{ flex: 1, top: 10, flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1, padding: 5 }}>
                <Image source={{ uri: item.artworkUrl60 }} style={{ width: 100, height: 100 }} />
                <View style={{ flexDirection: 'column', padding: 5, left: 10 }}>
                    <Text style={{ textAlign: 'left', fontSize: 12 }}>{item.collectionName}</Text>
                    <Text style={{ textAlign: 'left', fontSize: 12 }}>{item.artistName}</Text>
                </View>
            </TouchableOpacity>
        );
        return (
            <View style={{ flex: 1, backgroundColor: 'skyblue' }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.trackId}
                />
            </View>
        )
    }

}
export default withNavigation(ListView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
    },
    activityIndicator: {

        justifyContent: 'center',
        alignItems: 'center',

    }
})    