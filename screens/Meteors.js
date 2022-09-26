import React, { Component } from 'react';
import { Text,
     View,
      Alert,
       StyleSheet,
       SafeAreaView,
       Platform,
       StatusBar,
       Flatlist,
       Image,
       ImageBackground,
       Dimensions

    } from 'react-native';
import axios from "axios";

export default class MeteorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
        };
    }

    componentDidMount() {
        this.getMeteors()
    }

    getMeteors = () => {
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=nAkq24DJ2dHxzqXyzfdreTvczCVOnwJuFLFq4bDZ")
            .then(response => {
                this.setState({ meteors: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

renderItem = ({item})=>{
    let meteor = item
    let bg_Img,speed,size;
    
    if(meteor.threat_score<=30){
        bg_Img = require("../assets/meteor_bg1.png")
        speed = require("../assets/meteor_speed3.gif")
        size = 100
    }
    else if (meteor.threat_score<=75){
        bg_Img = require("../assets/meteor_bg2.png")
        speed = require("../assets/meteor_speed3.gif")
        size = 150
    }else{
        bg_Img = require("../assets/meteor_bg3.png")
        speed = require("../assets/meteor_speed3.gif")
        size = 200
    }

    return(
        <View>
            <ImageBackground source = {bg_Img} style = {styles.backgroundImage}>
                <View style = {styles.gifContainer}>
                    <Image source = {speed} style = {{width:size, height:size, alignSelf:"center"}}></Image>
              <View>
                
              
              <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>Closest to Earth - {item.close_approach_data[0].close_approach_date_full}</Text>
              <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>Min diameter - {item.close_approach_data[0].close_approach_date_full}</Text>
              <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>Max diameter - {item.close_approach_data[0].close_approach_date_full}</Text>
              <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>Velocity- {item.close_approach_data[0].close_approach_date_full}</Text>
              <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>Missing the Earth - {item.close_approach_data[0].close_approach_date_full}</Text>
              </View>
                </View>
                
            </ImageBackground>
        </View>
    )
}
    
    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading...</Text>
                </View>
            )
        } else {
            let meteor_arr = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date]
            })
            let meteors = [].concat.apply([], meteor_arr);

            meteors.forEach(function (element) {
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
                element.threat_score = threatScore;
            });

            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Meteor Screen!</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    conatiner:{
        flex:1
    },
    backgroundImage:{
        flex:1,
        resizeMode:'cover',
        width:Dimensions.get('width'),
        height:Dimensions.get('height')
    },
    TitleBar:{
        flex:0.15,
        justifyContent:'center',
        alignItems:'center'
    },
    TitleText:{
        fontSize:30,
        FontWeight:"bold",
        color:'white'
    },
    meteorConatiner:{
        flex:0.85
      
    },
    listContainer:{
        justifyContent:'center',
        marginleft:10,
        marginRight:10,
        marginTop:5,
        borderRadius:10,
        padding:10
    },
    cardTitle:{
        fontSize:20,
        marginBottom:10,
        fontWeight:"bold",
        color:'white'
    },
    cardText:{
        color:"white"
    },
    ThreatDetector:{
        height:10,
        marginBottom:10
    },
    gifContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    }
})