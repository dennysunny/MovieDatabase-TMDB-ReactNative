import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator,StatusBar} from 'react-native';
import * as firebase from 'firebase';

export default class LoadingScreen extends React.Component{

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        });
    }

    render() {
        return(
            <View style={{flex:1,justifyContent: "center",alignItems: "center", backgroundColor: "#000000"}}>
                <StatusBar barStyle="light-content"  backgroundColor = "#000000"/>
                <Text style={{color:"#ffffff"}} >Loading ..</Text>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center"
      },
});

