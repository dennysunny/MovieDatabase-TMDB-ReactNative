import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Button,
  } from 'react-native';
import Constants from '../Constants'
import { TMDB_KEY } from "../config";
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'

export default class TvHome extends React.Component{

      constructor() {
        super();

        this.state = {
            tv: [],
        }
    }

    componentDidMount() {
        this.getTv()
    }

    getTv = () => {
        axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_KEY}&language=en-US&page=1`
        )
        .then(response => {
          const apiResponse = response.data;
          this.setState({
            tv: apiResponse.results
          });
        })
        .catch(error => {
          console.log(error);
        });
      };

    render() {
        let pop = this.state.tv
        return(
            <>
            
            <ScrollView style={Styles.backg}>
            <Text style = {Styles.headerTitle} >Popular</Text>
            <Text style={Styles.title} >Shows</Text>
              {pop.map((i) => (
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
                          <Text style={Styles.txtcolor}> {i.vote_average} / 10 </Text>
                      </View>
                  </View>
                  
                </View>
                
              ))}
            </ScrollView>
          </>
        )
    }
}

const Styles = StyleSheet.create({
    image: { 
      width: 120, 
      height: 180,
      marginLeft: 5, 
      marginRight: 20, 
      borderRadius:15 },
  
    title : {
          fontSize : 44, 
          paddingLeft:14, 
          paddingTop:-40, 
          fontWeight:"bold",
          color:"#fafafa"
      },
  
    rowView: {  
      flexDirection: "row",
      marginTop: 10,
      
      },
  
      txtcolor: {
          color:"#fafafa"
      },
  
    movieList: { 
          marginLeft: 10,
          marginRight: 10, 
          backgroundColor: "white", 
          elevation: 10 },
  
    backg : {
        backgroundColor : "#000000"
      },
  
    card: {
      fontSize: 24, 
      fontWeight : 'bold',
      color: "#fafafa"
    },
  
    headerTitle: {
      fontSize: 60,
      fontWeight: "bold",
      padding: 8,
      color:"#fafafa"
      },
  
      feed: {
          marginHorizontal: 16
      },
  
      feedItem: {
          backgroundColor: "#0f0f0f",
          marginHorizontal: 16,
          borderRadius: 15,
          padding: 8,
          flexDirection: "row",
          marginVertical: 8,
      },
      })
  