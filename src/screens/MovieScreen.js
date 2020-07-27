import React from 'react'
import {View, Text, Image, StyleSheet, Dimensions, ScrollView, StatusBar, TouchableOpacity} from 'react-native'
import { TMDB_KEY } from "../config";
import Constants from '../Constants'
import axios from 'axios'


export default class MovieScreen extends React.Component{

    constructor() {
        super();

        this.state = {
            mid: "",
            details: "",
            genres: [],
            companies: [],
            countries: [],
            cast : [],
            recommendations : [],
            similar : [],
        }
    }

    componentDidMount() {
        const id = this.props.navigation.state.params.id;
        console.log("ID", id)
        this.setState({ mid: id })
        console.log("ID from state",this.state.mid)
        this.getDetails(id);
        this.getCast(id)
        this.getReccomendation(id)
        this.getSimilar(id)
    }

    getDetails = (idd) => {
        console.log("IDD", idd)
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${idd}?api_key=${TMDB_KEY}`
          )
          .then(response => {
            const apiResponse = response.data;
            console.log(this.state.mid);
            this.setState(
              {
                details: apiResponse,
                genres: apiResponse.genres,
                companies: apiResponse.production_companies,
                countries: apiResponse.production_countries
              },
              //console.log("Response",apiResponse)
            );
          })
          .catch(error => {
            console.log("Error",error);
          });
    }

    getCast = (id) => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_KEY}&language=en-US`
        )
        .then(response => {
          const apiResponse = response.data;
          this.setState({
            cast: apiResponse.cast
          });
          // console.log(apiResponse.cast);
        })
        .catch(error => {
          console.log(error);
        });
    };

    getSimilar = (id) => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${TMDB_KEY}&language=en-US&page=1`
        )
        .then(response => {
          const apiResponse = response.data;
          this.setState({
            similar: apiResponse.results
          });
          // console.log(apiResponse.results);
        })
        .catch(error => {
          console.log(error);
        });
    };
  
    getReccomendation = (id) =>{
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${TMDB_KEY}&language=en-US&page=1`
        )
        .then(response => {
          const apiResponse = response.data;
          this.setState({
            recommendations: apiResponse.results
          });
          // console.log(apiResponse.results);
        })
        .catch(error => {
          console.log(error);
        });
    }

    render(){

        return (
          <ScrollView style={{backgroundColor: '#000000'}}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Home') }>
                <Text style= {{color: "#fafafa"}}>Go Back</Text>
            </TouchableOpacity>

            <View style={styles.container} >
              <Image style={styles.image} source={{uri : Constants.URL.BACK_DROP + this.state.details.backdrop_path}} />

                    <Text style = {styles.headerTitle} >{this.state.details.title}</Text>
                    <Text style={styles.headinfo} > {this.state.genres.map(genre => genre.name).join(", ")} </Text>

                    <View style={styles.card} > 

                        <View>
                            <Image
                                style={styles.pimage}
                                source={{uri: Constants.URL.IMAGE_URL + this.state.details.poster_path}} >
                            </Image>
                        </View>

                        <View style={{ flexDirection: "column"}} > 

                            <View style={styles.card_row} >
                                <Text style={styles.tbox} >Tagline :</Text>
                                <Text style={styles.tboxinfo} >{this.state.details.tagline}</Text>
                            </View>

                            <View style={styles.card_row} >
                                <Text style={styles.tbox} >Rating :</Text>
                                <Text style={styles.tboxinfo} > {this.state.details.vote_average} </Text>
                            </View>

                            <View style={styles.card_row} >
                                <Text style={styles.tbox} >Status :</Text>
                                <Text style={styles.tboxinfo} > {this.state.details.status} 
                                </Text>
                            </View>

                            <View style={styles.card_row} >
                                <Text style={styles.tbox} >Total Runtime :</Text>
                                <Text style={styles.tboxinfo} > {this.state.details.runtime} minutes </Text>
                            </View>

                            <View style={styles.card_row} >
                                <Text style={styles.tbox} >Revenue :</Text>
                                <Text style={styles.tboxinfo} > {this.state.details.revenue  ? `${this.state.details.revenue.toLocaleString()}$` : "Not Estimated"} </Text>
                            </View>

                        </View>

                    </View>

                    <Text style = {styles.headerTitle} >Overview</Text>

                    <View style={styles.card} >
                      <Text style={styles.tboxovw} >{this.state.details.overview}  </Text>
                    </View>

                    <Text style = {styles.headerTitle} >Top Billed Cast</Text>

                    <ScrollView horizontal={true} style = {{padding:8}} >

                        <View style={styles.card} >   

                            {this.state.cast.slice(0, 12).map((cast) => (
                              <View key={cast.id}>
                              <Image style={styles.castimage}
                              source={{uri: cast.profile_path != null
                              ? Constants.URL.IMAGE_URL + cast.profile_path
                              : Constants.URL.PLACEHOLDER_IMAGE}} >
                              </Image>  
                                <Text style={styles.cast}> {cast.name} </Text>
                                <Text style={styles.cast}> as {cast.character} </Text>
                              </View>
                            ))}

                        </View> 

                    </ScrollView>  

                    <Text style = {styles.headerTitle} >Recommendations</Text> 

                    <ScrollView horizontal={true} style = {{padding:8}} >

                        <View style={styles.card} >   

                            {this.state.recommendations.slice(0, 12).map((movie) => (
                              <TouchableOpacity key={movie.id} onPress = { () => this.props.navigation.navigate('MovieDetails', 516486) } >
                              <Image style={styles.castimage}
                              source={{uri: movie.poster_path != null
                              ? Constants.URL.IMAGE_URL + movie.poster_path
                              : Constants.URL.PLACEHOLDER_IMAGE}} >
                              </Image>  
                                <Text style={styles.cast}> {movie.vote_average*10}% </Text>
                              </TouchableOpacity>
                            ))}

                        </View> 

                    </ScrollView>  

                    <Text style = {styles.headerTitle} >Similar to {this.state.details.title} </Text> 

                    <ScrollView horizontal={true} style = {{padding:8}} >

                        <View style={styles.card} >   

                        {this.state.similar.slice(0, 12).map((movie) => (
                              <View key={movie.id}>
                              <Image style={styles.castimage}
                              source={{uri: movie.poster_path != null
                              ? Constants.URL.IMAGE_URL + movie.poster_path
                              : Constants.URL.PLACEHOLDER_IMAGE}} >
                              </Image>  
                                <Text style={styles.cast}> {movie.vote_average*10}% </Text>
                              </View>
                            ))}

                        </View> 

                    </ScrollView>  

            </View>


          </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({

    container : {
        display:"flex",
    },

    image: {
        width: Dimensions.get('window').width,
        height : 200
    },

    pimage: {
        width: 140,
        height: 200,
        padding : 10,
        paddingLeft : 10,
        borderRadius: 9,
      },

    limage : {
        width : 240,
        height: 160,
        padding : 10,
        borderRadius : 9
    },

    seasonimage : {
        width: 195,
        height: 292,
        padding : 10,
        borderRadius: 9,
        marginHorizontal: 16,
        flexDirection : "row",
        justifyContent:"space-between"
    },

    castimage : {
      width: 135,
      height: 195,
      padding : 10,
      borderRadius: 9,
      marginHorizontal: 16,
      flexDirection : "row",
      justifyContent:"space-between"
  },

    headerTitle: {
        fontSize: 40,
        fontWeight: "bold",
        padding: 10,
        color: "#fafafa"
    },

    headinfo : {
        fontSize : 14,
        fontWeight: "bold",
        fontStyle:"italic",
        paddingTop:-20,
        paddingLeft: 10,
        color: "#fafafa"
    },

    card : {
        flexDirection : "row",
        justifyContent : "flex-start",
        backgroundColor: '#0f0f0f',
        borderRadius: 18,
        padding : 12,
    },

    card_row : {
        display : "flex",
        flexDirection : "row",
        padding : 8,
        flexWrap : "wrap"
    },

    tbox : {
       color: "#fafafa",
       fontSize: 14,
    },

    tboxovw : {
      color: "#fafafa",
      textAlign:"justify",
      fontSize: 14,
      padding : 6
   },

    tboxinfo : {
        color: "#fafafa",
        paddingLeft : 4,
        fontWeight :"bold",
        fontSize: 14,
     },

    cardrev : {
        display:"flex",
        flexDirection : "row-reverse",
        justifyContent : "space-between",
        backgroundColor: '#0f0f0f',
        borderRadius: 18,
        padding : 12
    },

    tboxrev : {
        color: "#fafafa",
        fontSize: 14,
     },

    cast : {
        fontSize : 14,
        fontWeight : "bold",
        textAlign : "center",
        color: "#fafafa"
     },
 

})



