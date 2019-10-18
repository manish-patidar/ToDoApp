import React, {Component} from 'react'
import {StyleSheet, View, Text, Dimensions, FlatList, AsyncStorage, TouchableOpacity} from 'react-native'
const {width, height} = Dimensions.get('window')
import RNCalendarEvents from 'react-native-calendar-events';
import Moment from "moment"


export default class ToDoList extends Component{
    static navigationOptions = {
        title: 'TODO List',
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

    componentDidMount(){
        this.focusListener = this.props.navigation.addListener('willFocus',() => {
            this.getDetails()
        })
    }

    getDetails = async() =>{
        var authorize =  await  RNCalendarEvents.authorizeEventStore();
            console.log("authorize",authorize)
            calendar = { 
                title:"TODO",
                color:"orange",
                // entityType:"event",
                name: 'TODO',
                accessLevel: 'test level',
                ownerAccount: 'testing',
                source:{
                    name: 'test',
                    type: 'test',
                    isLocalAccount: true
                }
                
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
            <TouchableOpacity style={styles.main_view} onPress={() => this.props.navigation.navigate('TodoDetail', {data: item} )}>
                <Text style={styles.titles}>{item.title}</Text>
                <Text style={styles.titles}>{item.notes}</Text>
                <Text style={styles.titles_date}>{Moment(item.startDate).format("MM-DD-YYYY hh:mm A")}</Text>
            </TouchableOpacity>
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
        backgroundColor: '#fff'
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
    },
    titles_date:{
        fontSize: 14,
    },
    titles:{
        fontSize: 14,
        flexWrap: 'wrap',
        flex: 1,
        fontWeight: 'bold',
        marginRight: 10
    },
    main_view:{
        padding:9,
        borderColor:'#ccc',
        borderRadius:10,
        borderWidth:1, 
        marginTop: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    }
    
})
