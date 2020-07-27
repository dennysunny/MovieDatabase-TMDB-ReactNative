import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import { SearchBar } from 'react-native-elements'

export default class ProfileScreen extends React.Component{

    state = {
        email : "",
        displayName: "",
    };

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({email, displayName})
        console.log(email ,displayName)
    }

    signOutUser = () => {
        console.log("sign out user")
        firebase.auth().signOut();
    };


    render() {
        return(
            <View style = {styles.container}>

            <ImageBackground source= {require('../images/bg1.jpg')} style={{height: 170,width: "100%"}}>
                <View >
                    <Text style={styles.headerTitle}>Hello,</Text> 
                    <Text style={styles.userTitle} >{this.state.displayName}</Text>
                </View>
            </ImageBackground>

            <View>
                <Text style={styles.headerTitle}>Hello,</Text> 
                <SearchBar style= {styles.search} ref="searchBar" placeholder="Search">

                </SearchBar>
            </View>

                <View>
                <TouchableOpacity style={styles.button} onPress={this.signOutUser} >
                    <Text style={{color: "#ffffff",fontWeight: "bold"}} >SIGNOUT</Text>
                </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor: "#000000"
    },
    header: {
        paddingTop: 24,
        paddingBottom: 16,
        backgroundColor: "#0f0f0f",
        borderBottomWidth: 2,
        borderBottomColor: "#212121",
        shadowColor: "#a8a8a8",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 40,
        fontWeight: "bold",
        padding: 10,
        paddingLeft:8,
        color: "#fafafa"
    },
    userTitle: {
        fontSize: 60,
        fontWeight: "bold",
        textTransform:"uppercase",
        padding: 8,
        color: "#fafafa"
    },
    button : {
        backgroundColor : "#ff0000",
        borderRadius: 4,
        height: 52,
        marginHorizontal: 32,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 32,
        color: "#ffffff",
        fontWeight: "bold"
    },
    search : {
        color : "#fafafa",
        fontSize : 16,
    }
    });
    

