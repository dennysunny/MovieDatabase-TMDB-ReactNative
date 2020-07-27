import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity,ImageBackground,StatusBar} from 'react-native';
import * as firebase from 'firebase';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'

export default class RegisterScreen extends React.Component{

    static navigationOptions = {
        headerShown: false
    }

    state = {
        name : "",
        email : "",
        password : "",
        errorMessage : null
    };

    handleSignup = () => {
        const {email, password} = this.state

        firebase
        .auth().createUserWithEmailAndPassword(email,password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                displayName: this.state.name
            })
        }).catch(error => this.setState({errorMessage : error.message}))
    }

    render() {
        return (
          <View style={styles.in}>
              <StatusBar barStyle="light-content" backgroundColor = "#000000"></StatusBar>
            <ImageBackground
              source={require('../images/regs.jpg')}
              style={{height: '100%'}}>
              <Text style={styles.greeting}>Signup </Text>
              <Text style={styles.welcome}>to get started.!</Text>
              <KeyboardAwareScrollView  enableOnAndroid={true}>
              <View style={styles.errorMessage}>
                {this.state.errorMessage && (
                  <Text style={styles.error}>{this.state.errorMessage}</Text>
                )}
              </View>
              
                <View style={styles.form}>
                  <View>
                    <Text style={styles.inputTitle}>Full Name</Text>
                    <TextInput
                      style={styles.input}
                      autoCapitalize="none"
                      onChangeText={(name) => this.setState({name})}
                      value={this.state.name}></TextInput>
                  </View>

                  <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}>Email</Text>
                    <TextInput
                      style={styles.input}
                      autoCapitalize="none"
                      onChangeText={(email) => this.setState({email})}
                      value={this.state.email}></TextInput>
                  </View>
    
                  <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                      style={styles.input}
                      secureTextEntry
                      autoCapitalize="none"
                      onChangeText={(password) => this.setState({password})}
                      value={this.state.password}></TextInput>
                  </View>

                </View>
                
                
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleSignup}>
                  <Text style={{color: '#FFF', fontWeight: '600'}}>SIGNUP</Text>
                </TouchableOpacity>
                </KeyboardAwareScrollView>
                <TouchableOpacity
                  style={{alignSelf: 'center', marginTop: 32}}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={{color: '#ffffff', fontSize: 14}}>
                    Already in MovieDatabase ?{' '}
                    <Text
                      style={{
                        color: '#00a2ff',
                        fontWeight: '600',
                        fontWeight: 'bold',
                      }}>
                      LogIn
                    </Text>
                  </Text>
                </TouchableOpacity>
                
              </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    in : {
        flex:1,
        backgroundColor: "#000000"
    },
    greeting : {
        marginTop: 72,
        fontSize: 66,
        marginHorizontal: 25,
        fontWeight: "bold",
        color: "#6b968c"
    },
    welcome : {
        fontSize: 50,
        fontWeight: "bold",
        marginHorizontal: 25,
        color: "#6b968c"
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
        color: "#b6ff7a",
        fontSize: 11,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    input : {
        borderBottomColor: "#d6fac5",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        color: "#d6fac5",
        fontSize: 16,
        fontWeight: "bold"
    },
    button : {
        marginHorizontal: 30,
        backgroundColor: "#00c732",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
})