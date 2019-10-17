import React, {useState, Component} from 'react'
import {StyleSheet, View, Text, Dimensions, ScrollView, AsyncStorage, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native'
import {images} from 'Components/ImageComponent'
import LocalStorage from '../../Libs/LocalStorage'
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
const {width, height} = Dimensions.get('window')

export default class createToDo extends Component{
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
            selected_date: Moment(new Date()).format('DD-MM-YYYY'),
            todo_date: ''
        }
        focusListener= null
    }

    componentDidMount(){
        this.focusListener = this.props.navigation.addListener('willFocus',() => {
            LocalStorage.getStore((item)=>{
                this.setState({mobile: '', password: ''})
                if(item){
                    this.setState({user_data: item})
                }
            })
        })
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    
    handleDatePicked = (date) => {
        console.log("A date has been picked: ", Moment(date).format('DD-MM-YYYY'));
        this.setState({selected_date: date, todo_date: Moment(date, 'DD-MM-YYYY')})
        this.hideDateTimePicker();
    };

    loginPress = () =>{
        const {mobile, password, user_data} = this.state
        if (!mobile) {
            this.setState({ isMobileEmpty: true})
        } else if (mobile.length < 10) {
            this.setState({ isMobileEmpty: true})
        }else if(!password){
            this.setState({ isPwdEmpty: true})
        }else{
            if(user_data && user_data.length>0){
                var found = false
                user_data.map((item)=>{
                    if(item.mobile_number == mobile){
                        found = true
                        this.setState({mobile: '', password: ''})
                    }
                })
                if(!found){
                    alert('Invalid username or password')
                }
            }else{
                alert('Invalid username or password')
            }
        }
    }

    render(){
        const {todo_date} = this.state
        return(
            <View style={styles.container}>
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
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})
