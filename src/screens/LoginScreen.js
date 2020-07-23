import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, StatusBar} from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component{

    static navigationOptions = {
        headerShown: false
    }

    state = {
        email : "",
        password : "",
        errorMessage : null
    };

    handleLogin = () => {
        const {email, password} = this.state

        firebase.auth().signInWithEmailAndPassword(email,password).catch(
            error => this.setState({errorMessage : error.message})
        )
    }

    render() {
        return(
            <View style={styles.in}>
                <StatusBar barStyle="light-content"></StatusBar>
                <ImageBackground source={require('../images/login.jpg')} style={{height: "100%"}} >
                <Text style={styles.greeting} >Hello. </Text>
                <Text style={styles.welcome} >Welcome Back..!</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style = {styles.form}>
                    <View>
                        <Text style={styles.inputTitle} >Email</Text>
                        <TextInput style={styles.input} autoCapitalize="none" 
                        onChangeText={email => this.setState({email})}
                        value={this.state.email} ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle} >Password</Text>
                        <TextInput style={styles.input} secureTextEntry autoCapitalize="none" 
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin} >
                    <Text style={{color: "#FFF", fontWeight:"600"}} >SIGN IN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf:"center", marginTop: 32}} 
                onPress={()=>this.props.navigation.navigate("Register") } >
                    <Text style={{color: "#fafafa", fontSize: 14}}>
                        New to MovieDatabase ? <Text style={{color : "#b6ff7a", fontWeight:"600", fontWeight:"bold"}}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    in : {
        flex:1,
        backgroundColor: "#000000"
    },
    greeting : {
        marginTop: 72,
        fontSize: 60,
        marginHorizontal: 25,
        fontWeight: "bold",
        color: '#a8ffb2',
        backgroundColor: 'transparent'
    },
    welcome : {
        fontSize: 50,
        marginHorizontal: 25,
        color: '#84fa92',
        fontWeight: "bold",
    },
    errorMessage : {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error : {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    },
    form : {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle : {
        color: "#28bcf7",
        fontSize: 11,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    input : {
        borderBottomColor: "#ffffff",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 16,
        fontWeight: "bold"
    },
    button : {
        marginHorizontal: 30,
        backgroundColor: "#0090e3",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
})