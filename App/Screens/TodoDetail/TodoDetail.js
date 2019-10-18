import React, {useState, Component} from 'react'
import {StyleSheet, View, Text, Dimensions, FlatList, AsyncStorage, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native'
const {width, height} = Dimensions.get('window')
import RNCalendarEvents from 'react-native-calendar-events';
import Moment from "moment"

export default class TodoDetail extends Component{
    static navigationOptions = {
        title: 'TODO List Detail',
    };
    constructor(props){
        super(props);
        const {state} = props.navigation
        console.log('stdsfsf',state)
        this.state = {
            data: state.params.data
        }
        focusListener= null
    }

    

    
    render(){
        const {data} = this.state
        return(
            <View style={styles.container}>
                <View style={styles.main_view}>
                    <Text style={styles.title}>Title:</Text>
                    <Text style={styles.title}>{data.title}</Text>
                </View>
                <View style={styles.main_view}>
                    
                    <Text style={styles.title}>Description:</Text>
                    <Text style={styles.title}>{data.description}</Text>
                </View>
                <View style={styles.main_view}>
                    <Text style={styles.title}>Date and time:</Text>
                    <Text style={styles.title}>{Moment(data.startDate).format("MM-DD-YYYY hh:mm A")}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width,
        height,
        flex: 1,
        backgroundColor: '#fff'
    },
    main_view:{
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title:{
        fontSize: 16,
        flexWrap: 'wrap',
        flex: 1
    }

    
})
