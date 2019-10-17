import React, {useState, Component} from 'react'
import {StyleSheet, View, Text, Dimensions, ScrollView, AsyncStorage, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native'
import {images} from 'Components/ImageComponent'
import LocalStorage from '../../Libs/LocalStorage'
const {width, height} = Dimensions.get('window')

export default class ToDoList extends Component{
    constructor(props){
        super(props);
        this.state = {
            isMobileEmpty: false,
            mobile: '',
            isPwdEmpty: false,
            password: '',
            user_data: []
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

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.plus_btn} onPress={() => this.props.navigation.navigate('CreateToDo')}>
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
