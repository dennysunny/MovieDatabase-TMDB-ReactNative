import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView,Image} from 'react-native';
import Constants from '../Constants'
import * as firebase from 'firebase';


export default class HomeScreen extends React.Component{

    state = {
        email : "",
        displayName: "",
        favorite: []
    };

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({email, displayName})

        const uid = (firebase.auth().currentUser || {}).uid
        console.log("User id: ",uid)

        firebase.database().ref(`users/${uid}/favorite`).on('value', res => {
            const resMovies = res.val();
            const copyFavorites = [];
            console.log("Inside fav ret")

            for (let objKey in resMovies) {
                resMovies[objKey].key = objKey;
                copyFavorites.push(resMovies[objKey]);
                this.setState({ favorite: copyFavorites});
              }
        })
    }

    signoutUser = () => {
        firebase.auth().signOut();
    }

    render() {
        let fav = this.state.favorite
        return(
            <ScrollView style={Styles.backg} >   
                <Text style = {Styles.title} >Your</Text>
                <Text style={Styles.headerTitle} >Favorites</Text>
                {fav.map((i) => (
                <View key={i.id} style={Styles.feedItem}>
                  <Text></Text>
                  <View >
                    <TouchableOpacity>
                        <Image
                            style={Styles.image}
                            source={{
                            uri:
                                i.poster_path != null
                                ? Constants.URL.IMAGE_URL + i.poster_path
                                : Constants.URL.PLACEHOLDER_IMAGE,
                            }}
                        />
                    </TouchableOpacity>
                  </View>
                  { i.first_air_date ? (
                <View style={{ flexDirection: "column"}}>

                    <Text numberOfLines={3} style={Styles.card}>
                        {i.original_name}
                    </Text>
                    
                    <View style={Styles.rowView}>
                        <Text style={Styles.txtcolor}>{Constants.Strings.RELEASE_DATE}</Text>
                        <Text style={Styles.txtcolor}>{i.first_air_date}</Text>
                    </View>

                    <View style={Styles.rowView}>
                        <Text style={Styles.txtcolor}>{Constants.Strings.LANGUAGE}</Text>
                        <Text style={Styles.txtcolor}>{i.original_language}</Text>
                    </View>

                    <View style={Styles.rowView}>
                        <Text style={Styles.txtcolor}>{Constants.Strings.POPULARITY}</Text>
                        <Text style={Styles.txtcolor}> {i.vote_average} / 10</Text>
                    </View>

                </View> ):(
                        <View style={{ flexDirection: "column"}}>

                            <Text numberOfLines={3} style={Styles.card}>
                                {i.original_title}
                            </Text>
                            
                            <View style={Styles.rowView}>
                                <Text style={Styles.txtcolor} >{Constants.Strings.RELEASE_DATE}</Text>
                                <Text style={Styles.txtcolor} >{i.release_date}</Text>
                            </View>

                            <View style={Styles.rowView}>
                                <Text style={Styles.txtcolor} >{Constants.Strings.LANGUAGE}</Text>
                                <Text style={Styles.txtcolor} >{i.original_language}</Text>
                            </View>

                            <View style={Styles.rowView}>
                                <Text style={Styles.txtcolor} >{Constants.Strings.POPULARITY}</Text>
                                <Text style={Styles.txtcolor} > {i.popularity} / 10</Text>
                            </View>

                        </View>
                  )}
                  
                </View>
                
              ))}

            </ScrollView>
        )
    }
}

const Styles = StyleSheet.create({
    image: {
        width: 120,
        height: 180,
        marginLeft: 5,
        marginRight: 20,
        borderRadius: 15,
    },

    title: {
        fontSize: 44,
        paddingLeft: 14,
        paddingTop: -40,
        fontWeight: 'bold',
        color: '#fafafa',
    },

    rowView: {
        flexDirection: 'row',
        marginTop: 10,
    },

    txtcolor: {
        color: '#fafafa',
    },

    movieList: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
        elevation: 10,
    },

    backg: {
        backgroundColor: '#000000',
    },

    card: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fafafa',
    },

    headerTitle: {
        fontSize: 60,
        fontWeight: 'bold',
        padding: 8,
        paddingTop: -40,
        paddingLeft: 14,
        color: '#fafafa',
    },

    feed: {
        marginHorizontal: 16,
    },

    feedItem: {
        backgroundColor: '#0f0f0f',
        marginHorizontal: 16,
        borderRadius: 15,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8,
    },
});
  
      
  
  
    

