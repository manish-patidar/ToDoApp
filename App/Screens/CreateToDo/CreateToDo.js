import React, {useState, Component} from 'react'
import {StyleSheet, View, Text, Dimensions, ScrollView, AsyncStorage, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native'
import {images} from 'Components/ImageComponent'
import LocalStorage from '../../Libs/LocalStorage'
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
const {width, height} = Dimensions.get('window')

export default class createToDo extends Component{
    static navigationOptions = {
        title: 'Add TO DO',
    };
    constructor(props){
        super(props);
        this.state = {
            isMobileEmpty: false,
            mobile: '',
            isPwdEmpty: false,
            password: '',
            user_data: [],
            selectedDate: '',
            isDateTimePickerVisible: false,
            isStartDateTimePickerVisible: false,
            isEndDateTimePickerVisible: false,
            selected_date: Moment(new Date()).format('DD-MM-YYYY'),
            todo_date: '',
            todo_start_time: '',
            todo_end_time: '',
            title:'',
            description:''

        }
        focusListener= null
    }

    

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    showStartDateTimePicker = () => {
        this.setState({ isStartDateTimePickerVisible: true });
    };
    showEndDateTimePicker = () => {
            this.setState({ isEndDateTimePickerVisible: true });
    };
    
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    hideStartDateTimePicker = () => {
        this.setState({ isStartDateTimePickerVisible: false });
    };
    hideEndDateTimePicker = (mode) => {
        this.setState({ isEndDateTimePickerVisible: false });
    };


    
    handleDatePicked = (date) => {
        console.log("A date has been picked: ", Moment(date).format('DD-MM-YYYY'));
        this.setState({selected_date: Moment(date).format('YYYY-MM-DD'), todo_date: Moment(date, 'DD-MM-YYYY')})
        this.hideDateTimePicker();
    };
    handleStartDatePicked = (date) => {
        console.log("A date has been picked: ", Moment(date).format('hh:mm A'));
        this.setState({selected_start_time: Moment(date).format('HH:mm:ss'), todo_start_time: Moment(date, 'hh:mm A')})
        this.hideStartDateTimePicker();
    };
    handleEndDatePicked = (date) => {
        console.log("A date has been picked: ", Moment(date).format('HH:mm:ss'));
        this.setState({selected_end_time: Moment(date).format('HH:mm:ss'), todo_end_time: Moment(date, 'hh:mm A')})
        this.hideEndDateTimePicker();
    };

    AddPress = () =>{
      
        const {todo_date,todo_start_time,todo_end_time,title,description} = this.state;
        if (title.length < 1) {
            alert("Please enter title")
        } else if (description.length < 1) {
            alert("Please enter description")
        }else if (todo_date.length < 1) {
            alert("Please select todo date")
        }else if (todo_start_time.length < 1) {
            alert("Please select todo start time")
        }else if (todo_end_time.length < 1) {
            alert("Please select todo end time")
        }else if (Moment(todo_start_time,"hh:mm A").format('x') > Moment(todo_end_time,"hh:mm A").format('x')) {
            alert("Please select todo end time is greter then todo  start time")
        }else{
            var startDate =  Moment.utc(this.state.selected_date +" "+ this.state.selected_start_time,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
            console.log("startDatestartDatestartDatestartDate",startDate)
            var endDate = Moment.utc(this.state.selected_date +" "+ this.state.selected_end_time,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
            RNCalendarEvents.saveEvent(title, {
                calendarId: this.state.calendarID,
                startDate: startDate,
                endDate: endDate,
                notes: description
              }).then((value) => {
                this.props.navigation.goBack()
                this.props.navigation.state.params.returnData();
              });
        }
    }

    handleChange=(text,value)=>{
        this.setState({[text]:value})
    }
    
    componentWillMount(){
        calendar = { 
            title:"TODO",
            color:"orange",
            entityType:"event",
        }
        AsyncStorage.getItem("calendarID").then((value) => {
            if(value == null){
                RNCalendarEvents.saveCalendar(calendar).then((value) => {
                    AsyncStorage.setItem("calendarID",value)
                    this.setState({calendarID:value})
                })
            }else{
                this.setState({calendarID:value})
            }
        })
    }

    render(){
        const {todo_date,todo_start_time,todo_end_time,title,description} = this.state
        return(
            <View style={styles.container}>
                <TextInput 
                    style={[styles.date_filter,{padding:5}]} 
                    placeholder="Enter title"
                    value={title}
                    onChangeText={(text)=>{this.handleChange("title",text)}}
                    />
                <TextInput 
                    style={[styles.date_filter,{padding:5}]} 
                    placeholder="Enter description"
                    value={description}
                    onChangeText={(text)=>{this.handleChange("description",text)}}
                    ></TextInput>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                    <View style={styles.date_filter}>
                        <Text>{todo_date ? Moment(new Date(todo_date)).format('DD-MM-YYYY') : 'Enter todo date'}</Text>
                    </View>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        minimumDate={new Date()}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.showStartDateTimePicker}>
                    <View style={styles.date_filter}>
                        <Text>{todo_start_time ? Moment(new Date(todo_start_time)).format('hh:mm A') : 'Enter todo start time'}</Text>
                    </View>
                    <DateTimePicker
                        isVisible={this.state.isStartDateTimePickerVisible}
                        onConfirm={this.handleStartDatePicked}
                        onCancel={this.hideStartDateTimePicker}
                        is24Hour ={false}
                        mode={"time"}
                        minimumDate={new Date()}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.showEndDateTimePicker}>
                    <View style={styles.date_filter}>
                        <Text>{todo_end_time ? Moment(new Date(todo_end_time)).format('hh:mm A') : 'Enter todo end time'}</Text>
                    </View>
                    <DateTimePicker
                        isVisible={this.state.isEndDateTimePickerVisible}
                        onConfirm={this.handleEndDatePicked}
                        onCancel={this.hideEndDateTimePicker}
                        is24Hour ={false}
                        mode={"time"}
                        minimumDate={new Date()}
                    />
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>this.AddPress()}>
                    <View style={[styles.date_filter,{backgroundColor:"green"}]}>
                        <Text style={{textAlign:'center',color:"white",fontSize:20,fontWeight:'800'}}>Add</Text>
                    </View>
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
        padding: 20
    },
    date_filter:{
        width: '100%',
        height: 50,
        marginVertical:5,
        padding:5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        justifyContent: 'center',
        // alignItems: 'center'
    }
    
})
