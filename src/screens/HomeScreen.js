import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Button
  } from 'react-native';
import Constants from '../Constants'
import { TMDB_KEY } from "../config";
import axios from 'axios'


export default class HomeScreen extends React.Component{

      constructor() {
        super();

        this.state = {
          sname : "popular",
          hname : "popular",
          mdata: [],
        }
    }

    componentDidMount () {
      this.getPopular()
    }

    componentDidUpdate() {
        this.getPopular()
    }

    getPopular = () => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${this.state.sname}?api_key=${TMDB_KEY}&language=en-US&page=1`
          )
          .then(response => {
            const apiResponse = response.data;
            this.setState({
              mdata: apiResponse.results
            });
             //console.log(apiResponse.results);
          })
          .catch(error => {
            console.log(error);
          });
      };

    render() {
        return(
            <>
            <ScrollView style={Styles.backg} >       
            <StatusBar barStyle="light-content"  backgroundColor = "#000000"/>
            <Text style = {Styles.headerTitle} >{this.state.hname}</Text>
            <Text style={Styles.title} >Movies</Text>

            <View style = {Styles.viewbtn}>

              <Button style = {Styles.btn} title="Popular" color = "#212121"
              onPress = { () => {this.setState({sname : "popular", hname : "popular"})  }} >
              </Button>

              <Button style = {Styles.btn} title="Running Now" color = "#212121"
              onPress = { () => {this.setState({sname : "now_playing", hname : "now playing"})  }} >
              </Button>

              <Button style = {Styles.btn} title="Upcoming" color = "#212121" 
              onPress = { () => {this.setState({sname : "upcoming", hname : "upcoming"})  }}>
              </Button>

              <Button style = {Styles.btn} title="Top Rated" color = "#212121" 
              onPress = { () => {this.setState({sname : "top_rated", hname : "top rated"})  }}>
              </Button>

            </View>

              {this.state.mdata.map((i) => (
                <View key={i.id} style={Styles.feedItem}>
                  <Text></Text>
                  <View >
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MovieDetails', {id : i.id})} >
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
                          <Text style={Styles.txtcolor} >{i.vote_average} / 10</Text>
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
    borderRadius: 9,
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
    color: '#fafafa',
    textTransform : "capitalize"
  },

  feed: {
    marginHorizontal: 16,
  },

  feedItem: {
    backgroundColor: '#0f0f0f',
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  },

  btn : {
    backgroundColor : "#212121",
    color: '#fafafa',
    padding : 12,
    borderBottomColor: '#737373',
  },

  viewbtn : {
    flexDirection : "row",
    justifyContent : "space-evenly",
    display : "flex",
    padding : 8,
  },

});

    

