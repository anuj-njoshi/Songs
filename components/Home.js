import React, { Component } from 'react';  
import {View, Text} from 'react-native';
import RNSplashScreen from 'react-native-splash-screen';
import ListView from './ListView';

class Home extends Component {
    componentDidMount = ()=>{
        setTimeout(function(){  
            RNSplashScreen.hide();
          }, 3000);  
      

    }
render(){
    return(
        <View style={{flex:1}}>
            
           <ListView/>
        </View>
    )
}


}

export default Home;