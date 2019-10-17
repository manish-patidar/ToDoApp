import React, {useState, Component} from 'react'
import {StyleSheet, View, Text, Dimensions, ScrollView, AsyncStorage, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native'
import {images} from 'Components/ImageComponent'
import LocalStorage from '../../Libs/LocalStorage'
const {width, height} = Dimensions.get('window')

export default class Login extends Component{
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
                    if(item.mobile_number == mobile && item.password_t == password){
                        found = true
                        this.setState({mobile: '', password: ''})
                        this.props.navigation.navigate('ToDoList')
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
        const {isMobileEmpty, isPwdEmpty} = this.state
        return(
            <View style={styles.container}>
            <ScrollView contentContainerStyle={{height: height-20}}>
            <ImageBackground source={images.background_image} style={styles.background}>
                <View style={styles.card_view}>
                    <Image source={images.logo} style={styles.logo}/>
                    <View style={isMobileEmpty ? styles.input_view2 : styles.input_view}>
                        <TextInput
                            style={styles.input_text}
                            placeholder={'Mobile number'}
                            keyboardType='numeric'
                            returnKeyType='next'
                            borderBottomColor='transparent'
                            maxLength={10}
                            onSubmitEditing={() => this.passwordRef.focus()}
                            placeholderTextColor={(isMobileEmpty) ? 'red' : 'gray'}
                            value={this.state.mobile}
                            onChangeText={text => { this.setState({ mobile: text, isMobileEmpty: false }) }}
                        />
                    </View>

                    <View style={isPwdEmpty ? styles.input_view2 : styles.input_view}>
                        <TextInput
                            style={styles.input_text}
                            ref={passwordRef => this.passwordRef = passwordRef}
                            placeholder={'Password'}
                            returnKeyType='done'
                            borderBottomColor='transparent'
                            secureTextEntry={true}
                            placeholderTextColor={(isPwdEmpty) ? 'red' : 'gray'}
                            value={this.state.password}
                            onChangeText={text => { this.setState({ password: text, isPwdEmpty: false }) }}
                        />
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={() => this.loginPress()}>
                        <Text style={styles.btn_text}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={styles.btn_signup_text}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
                    </ScrollView>
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
    background:{
        alignItems: 'center',
        justifyContent: 'center',
        width, 
        height, 
        resizeMode: 'cover'
    },
    logo:{
        width: 110,
        height: 110
    },
    card_view:{
        backgroundColor: '#fff',
        alignItems: 'center',
        width: width-40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
        borderRadius: 10,
        alignSelf: 'center',
        elevation: 5,
        padding: 20
    },
    input_text:{
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        height: 45,
        marginTop: 20,
        textAlign: 'center'
    },
    btn:{
        backgroundColor: 'green',
        width: '100%',
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 30
    },
    btn_text:{
        color: '#fff'
    },
    btn_signup_text:{
        color: '#000',
        textDecorationLine: 'underline'
    },
    input_view:{
        borderBottomColor: '#ccc' ,
        borderBottomWidth: 1,
        width: '100%',
    },
    input_view2:{
        borderBottomColor: 'red',
        borderBottomWidth: 1,
        width: '100%',
    }
})
