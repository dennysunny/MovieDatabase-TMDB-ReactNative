import React from 'react'
import {View, Text, StatusBar,ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native'
import axios from 'axios'
import Constants from '../Constants'
import { TMDB_KEY } from "../config";

export default class TvScreen extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            tid : "",
            tvDetails : "",
            genres : [],
            companies : [],
            created_by :[] ,
            languages : [],
            last_episode_to_air : "",
            seasons : [],
            tvRecommendations: [],
            tvSimilar: [],
            tvReviews : [],
        }
    }

    componentDidMount () {
        const id = this.props.navigation.state.params.tid
        this.setState({ tid : id})
        this.tvDetails(id)
        this.getTvReccomendation(id)
        this.getTvSimilar(id)
        //this.getTvReviews(id)
    }

    tvDetails = (id) => {
        axios.get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_KEY}&language=en-US&page=1`
          )
          .then(response => {
            const apiResponse = response.data;
            this.setState({
              tvDetails: apiResponse,
              genres: apiResponse.genres,
              companies:apiResponse.production_companies,
              created_by:apiResponse.created_by,
              languages:apiResponse.languages,
              last_episode_to_air:apiResponse.last_episode_to_air,
              seasons:apiResponse.seasons,
            });
            //console.log("created_by",apiResponse.last_episode_to_air)
          })
          .catch(error => {
            console.log(error);
          });
        };

    getTvReccomendation = (id) =>{
        axios
            .get(
                `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${TMDB_KEY}&language=en-US&page=1`
              )
            .then(response => {
                const apiResponse = response.data;
                this.setState({
                  tvRecommendations: apiResponse.results
                });
                // console.log(apiResponse.results);
              })
              .catch(error => {
                console.log(error);
              });
          }

    getTvSimilar = (id) =>{
        axios
            .get(
                `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${TMDB_KEY}&language=en-US&page=1`
              )
              .then(response => {
                const apiResponse = response.data;
                this.setState({
                  tvSimilar: apiResponse.results
                });
                // console.log(apiResponse.results);
              })
              .catch(error => {
                console.log(error);
              });
          }

    // getTvReviews  = (id) =>{
    //     axios
    //         .get(
    //             `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${TMDB_KEY}&language=en-US&page=1`
    //           )
    //           .then(response => {
    //             const apiResponse = response.data;
    //             this.setState({
    //               tvReviews: apiResponse.results
    //             });
    //              console.log("inside tv reviews",apiResponse.results);
    //           })
    //           .catch(error => {
    //             console.log(error);
    //           });
    //       }
    


    render() {
        return(
            <ScrollView style={{backgroundColor: '#000000'}} > 
                <TouchableOpacity  onPress={()=>this.props.navigation.navigate('TV') }>
                    <Text style= {{color: "#fafafa"}}>Go Back</Text>
                </TouchableOpacity>

                 <StatusBar barStyle="light-content" backgroundColor="#000000" />

                <View style={styles.container} >
                    <Image style={styles.image} source={{uri : Constants.URL.BACK_DROP + this.state.tvDetails.backdrop_path}} />
                    <Text style = {styles.headerTitle} >{this.state.tvDetails.name}</Text>
                    <Text style={styles.headinfo} > {this.state.genres.map(genre => genre.name).join(", ")} </Text>

                    <View style={styles.card} >

                        <View>
                            <Image
                                style={styles.pimage}
                                source={{uri: Constants.URL.IMAGE_URL + this.state.tvDetails.poster_path}} >
                            </Image>
                        </View>

                        <View style={{ flexDirection: "column"}} >
                            <View style={styles.card_row} >
                                <Text style={styles.tbox} >Created by :</Text>
                                <Text style={styles.tboxinfo} > {this.state.created_by.map(createdby => createdby.name).join(", ")} </Text>
                            </View>

                            <View style={styles.card_row} >
                                <Text style={styles.tbox} >Last Air Date :</Text>
                                <Text style={styles.tboxinfo} > {this.state.tvDetails.last_air_date ?`${this.state.tvDetails.last_air_date.split("-")
                                .reverse().join("-")}`
                                : "Release Date Unknown"} 
                                </Text>

                            </View>

                            <View style={styles.card_row} >
                                <Text style={styles.tbox} >Status :</Text>
                                <Text style={styles.tboxinfo} > {this.state.tvDetails.status ? `${this.state.tvDetails.status}` : `Not Available` } </Text>
                            </View>

                            <View style={styles.card_row} >
                                <Text style={styles.tbox} >Total Season(s) :</Text>
                                <Text style={styles.tboxinfo}>{this.state.tvDetails.number_of_seasons}</Text>
                            </View>

                            <View style={styles.card_row} >
                                <Text style={styles.tbox} >Next Episode On :</Text>
                                <Text style={styles.tboxinfo} > {this.state.tvDetails.next_episode_to_air? `${this.state.tvDetails.next_episode_to_air}` : 'Not Available' }  </Text>
                            </View>
                        </View>

                    </View>

                    <Text style = {styles.headerTitle} >Last Episode</Text>

                    <View style={styles.cardrev} numberOfLines={3}>

                         <View>
                            <Image
                                style={styles.limage}
                                source={{uri: Constants.URL.IMAGE_URL + this.state.last_episode_to_air.still_path}} >
                            </Image>
                        </View>

                        <View style={{ flexDirection: "column"}} >

                            <View style={styles.card_row} >
                                <Text style={styles.tboxrev} >Name :</Text>
                                <Text style={styles.tboxinfo} > {this.state.last_episode_to_air.name} </Text>
                            </View>

                            <View style={styles.card_row} >
                                <Text style={styles.tboxrev} >Episode Number :</Text>
                                <Text style={styles.tboxinfo} > {this.state.last_episode_to_air.episode_number} </Text>
                            </View>

                            <View style={styles.card_row} >
                                <Text style={styles.tboxrev} >Season Number :</Text>
                                <Text style={styles.tboxinfo} > {this.state.last_episode_to_air.season_number} </Text>
                            </View>

                            <View style={styles.card_row} >
                                <Text style={styles.tboxrev} >Air Date :</Text>
                                <Text style={styles.tboxinfo} > {this.state.last_episode_to_air.air_date} </Text>
                            </View>

                            <View style={styles.card_row} >
                                <Text style={styles.tboxrev} >Rating :</Text>
                                <Text style={styles.tboxinfo} > {this.state.last_episode_to_air.vote_average} </Text>
                            </View>

                        </View>
                        
                    </View>     

                    <Text style = {styles.headerTitle} > {this.state.tvDetails.number_of_seasons} Seasons </Text>       

                    <ScrollView horizontal={true} style = {{padding:8}} >
                        <View style={styles.card} >   

                            {this.state.seasons.map((season) => (
                              <Image key={season.id} style={styles.seasonimage}
                              source={{uri: season.poster_path != null
                              ? Constants.URL.IMAGE_URL + season.poster_path
                              : Constants.URL.PLACEHOLDER_IMAGE}} >
                              </Image>  
                            ))}

                        </View> 

                    </ScrollView>   

                    <Text style = {styles.headerTitle} >Recommended Shows </Text>  

                    <ScrollView horizontal={true} style = {{padding:8}} >
                        <View style={styles.card} >   

                            {this.state.tvRecommendations.map((tvrec) => (
                            <TouchableOpacity key={tvrec.id} onPress = { () => this.props.navigation.navigate('TvDetails', 2734) } >
                              <Image  style={styles.seasonimage}
                              source={{uri: tvrec.poster_path != null
                              ? Constants.URL.IMAGE_URL + tvrec.poster_path
                              : Constants.URL.PLACEHOLDER_IMAGE}} >
                              </Image> 
                            </TouchableOpacity> 
                            ))}

                        </View> 

                    </ScrollView> 

                    <Text style = {styles.headerTitle} >Similar to {this.state.tvDetails.name} </Text>  

                    <ScrollView horizontal={true} style = {{padding:8}} >
                        <View style={styles.card} >   

                            {this.state.tvSimilar.map((tvrec) => (
                              <Image key={tvrec.id} style={styles.seasonimage}
                              source={{uri: tvrec.poster_path != null
                              ? Constants.URL.IMAGE_URL + tvrec.poster_path
                              : Constants.URL.PLACEHOLDER_IMAGE}} >
                              </Image>  
                            ))}

                        </View> 

                    </ScrollView> 
{/* 
                    <Text style = {styles.headerTitle} >Top Reviews</Text>  

                    <ScrollView horizontal={true} style = {{padding:8}} >
                        <View style={styles.card} >   

                            {this.state.tvReviews.map((rvw) => (
                                <View >
                                <Text style = {{fontWeight:"bold", color : "#fafafa"}} > {rvw.author} </Text>
                                <Text style = {{color: "#fafafa"}}> {rvw.content.slice(0,1000)} </Text>
                                </View>
                            ))}

                        </View> 

                    </ScrollView> 
       */}

                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        display:"flex"
    },

    image: {
        width: Dimensions.get('window').width,
        height : 200
    },

    pimage: {
        width: 140,
        height: 200,
        padding : 10,
        borderRadius: 9,
      },

    limage : {
        width : 240,
        height: 160,
        padding : 10,
        borderRadius : 9
    },

    seasonimage : {
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
        justifyContent : "space-between",
        backgroundColor: '#0f0f0f',
        borderRadius: 18,
        padding : 12,
        flexShrink : 1,
    },

    card_row : {
        display : "flex",
        flexDirection : "row",
        padding : 8
    },

    tbox : {
       color: "#fafafa",
       fontSize: 14,
    },

    tboxinfo : {
        color: "#fafafa",
        paddingLeft : 4,
        fontWeight :"bold",
        fontSize: 14,
     },

     cardrev : {
        flexDirection : "row-reverse",
        justifyContent : "flex-end",
        alignItems : "center",
        backgroundColor: '#0f0f0f',
        borderRadius: 18,
        padding : 12,
    },

    tboxrev : {
        color: "#fafafa",
        fontSize: 14,
        flexShrink : 1,
     },

 

})

