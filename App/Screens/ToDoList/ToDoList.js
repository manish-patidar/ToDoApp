import React, {useState, Component} from 'react'
import {StyleSheet, View, Text, Dimensions, FlatList, AsyncStorage, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native'
import {images} from 'Components/ImageComponent'
import LocalStorage from '../../Libs/LocalStorage'
const {width, height} = Dimensions.get('window')
import RNCalendarEvents from 'react-native-calendar-events';
import Moment from "moment"
export default class ToDoList extends Component{
    static navigationOptions = {
        title: 'TO DO List',
    };
    constructor(props){
        super(props);
        this.state = {
            isMobileEmpty: false,
            mobile: '',
            isPwdEmpty: false,
            password: '',
            user_data: [],
            eventList:[]
        }
        focusListener= null
    }

    componentWillMount = async()=>{
        var authorize =  await  RNCalendarEvents.authorizeEventStore();
        console.log("authorize",authorize)
        calendar = { 
            title:"TODO",
            color:"orange",
            entityType:"event",
            // name:"TODO",
            // ownerAccount:"test",
            // source:{name:"test",type:"test"}
        }
        AsyncStorage.getItem("calendarID").then((value) => {
            if(value == null){
                RNCalendarEvents.saveCalendar(calendar).then((value) => {
                    AsyncStorage.setItem("calendarID",value)
                    this.setState({calendarID:value})
                    this.findEvent(value)
                })
            }else{
                this.setState({calendarID:value})
                this.findEvent(value)
            }
        })
    }

    findEvent(calendarid){
        console.log(calendarid)
        var startDate =  Moment.utc(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
        console.log("startDate",startDate)
        var endDate =  Moment(Moment.utc(new Date()).add("year",1)).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        console.log("endDate",endDate)
        RNCalendarEvents.fetchAllEvents(startDate, endDate, [calendarid]).then((value) => {
            this.setState({eventList:value})
            console.log("eventListeventList",value)
        })
    }

    returnData(){
        this.findEvent(this.state.calendarID)
    }
    renderItem = ({ item, index }) => {
        return (
            <View style={{padding:9,backgroundColor:'rgba(0,0,0,0.2)',borderColor:'black',borderRadius:10,borderWidth:2}}>
                <Text style={{fontSize:22,color:'black'}}><Text style={{fontSize:22,color:'black',fontWeight:"700"}}>Title: </Text>{item.title}</Text>
                <Text style={{fontSize:18,color:'black'}}><Text style={{fontSize:22,color:'black',fontWeight:"700"}}>Description:</Text> {item.notes}</Text>
                <Text style={{fontSize:18,color:'black'}}><Text style={{fontSize:22,color:'black',fontWeight:"700"}}>Date and time:</Text> {Moment(item.startDate).format("MM-DD-YYYY hh:mm A")}</Text>
            </View>
        )
    };
    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    style={{ backgroundColor: '#f0f1f1',flex:1 ,padding:10}}
                    contentContainerStyle={{ backgroundColor: 'transparent' }}
                    data={this.state.eventList}
                    renderItem={this.renderItem}
                    extraData={this.state}
                    keyExtractor={item => item.id}
                />
                <TouchableOpacity style={styles.plus_btn} onPress={() => this.props.navigation.navigate('CreateToDo',{returnData:this.returnData.bind(this)})}>
                    <Text style={styles.plus_icon}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width,
        height,
        flex: 1,
    },
    plus_btn:{
        width: 50,
        height: 50,
        borderRadius: 50/2,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        bottom: 20
    },
    plus_icon:{
        color: '#fff',
        fontSize: 30
    }
    
})
