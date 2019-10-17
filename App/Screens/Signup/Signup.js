import React, {useState, Component} from 'react'
import {StyleSheet, View, Text, Dimensions, ScrollView, AsyncStorage, ImageBackground, Image, TextInput, TouchableOpacity} from 'react-native'
import {images} from 'Components/ImageComponent'
import LocalStorage from '../../Libs/LocalStorage'
const {width, height} = Dimensions.get('window')

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            full_name: '',
            email: '',
            mobile_number: '',
            password_t: '',
            isNameEmpty: false,
            isEmailEmpty: false,
            isMobileEmpty: false,
            isPwdEmpty: false,
        }
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    submitPress = () =>{
        const {full_name, email, mobile_number, password_t} = this.state
        if(!full_name){
            this.setState({ isNameEmpty: true})
        }else if(!email){
            this.setState({ isEmailEmpty: true})
        }else if(!this.validateEmail(email)){
            alert('Invalid email')
        }else if (!mobile_number) {
            this.setState({ isMobileEmpty: true})
        } else if (mobile_number.length < 10) {
            this.setState({ isMobileEmpty: true})
        }else if(!password_t){
            this.setState({ isPwdEmpty: true})
        }else{
            var data = {
                full_name, email, mobile_number, password_t
            }
            var user_data = []
            user_data.push(data)
            LocalStorage.getStore((store_data)=>{
                if(store_data){
                    var found = false
                    store_data.map((item)=>{
                        if(item.mobile_number == data.mobile_number){
                            found = true
                            alert('Mobile number already exist, please try again!')
                        }
                    })
                    if(!found){
                        user_data=[...user_data, ...store_data]
                        LocalStorage.setStore(user_data)
                        this.setState({full_name: '', email: '', mobile_number: '', password_t: ''})
                        this.props.navigation.goBack()
                    }
                }else{
                    LocalStorage.setStore(user_data)
                    this.setState({full_name: '', email: '', mobile_number: '', password_t: ''})
                    this.props.navigation.goBack()
                }
            })
        }
    }

    render(){
        const {isMobileEmpty, isPwdEmpty, isNameEmpty, isEmailEmpty} = this.state
        return(
            <View style={styles.container}>
            <ScrollView contentContainerStyle={{height: height-20}}>
            <ImageBackground source={images.background_image} style={styles.background}>
                <View style={styles.card_view}>
                    <Image source={images.logo} style={styles.logo}/>
                    <View style={isNameEmpty ? styles.input_view2 : styles.input_view}>
                        <TextInput
                            style={styles.input_text}
                            placeholder={'Full name'}
                            returnKeyType='next'
                            borderBottomColor='transparent'
                            onSubmitEditing={() => this.email.focus()}
                            placeholderTextColor={(isNameEmpty) ? 'red' : 'gray'}
                            value={this.state.full_name}
                            onChangeText={text => { this.setState({ full_name: text, isNameEmpty: false }) }}
                        />
                    </View>

                    <View style={isEmailEmpty ? styles.input_view2 : styles.input_view}>
                        <TextInput
                            ref={email => this.email = email}
                            style={styles.input_text}
                            placeholder={'Email'}
                            keyboardType= 'email-address'
                            returnKeyType='next'
                            borderBottomColor='transparent'
                            onSubmitEditing={() => this.mobile.focus()}
                            placeholderTextColor={(isEmailEmpty) ? 'red' : 'gray'}
                            value={this.state.email}
                            onChangeText={text => { this.setState({ email: text, isEmailEmpty: false }) }}
                        />
                    </View>

                    <View style={isMobileEmpty ? styles.input_view2 : styles.input_view}>
                        <TextInput
                            ref={mobile => this.mobile = mobile}
                            style={styles.input_text}
                            placeholder={'Mobile number'}
                            keyboardType='numeric'
                            returnKeyType='next'
                            borderBottomColor='transparent'
                            maxLength={10}
                            onSubmitEditing={() => this.passwordRef.focus()}
                            placeholderTextColor={(isMobileEmpty) ? 'red' : 'gray'}
                            value={this.state.mobile_number}
                            onChangeText={text => { this.setState({ mobile_number: text, isMobileEmpty: false }) }}
                        />
                    </View>

                    <View style={isPwdEmpty ? styles.input_view2 : styles.input_view}>
                        <TextInput
                            style={styles.input_text}
                            ref={passwordRef => this.passwordRef = passwordRef}
                            onChangeText={(text)=>console.log('kkk', text)}
                            placeholder={'Password'}
                            returnKeyType='done'
                            borderBottomColor='transparent'
                            secureTextEntry={true}
                            placeholderTextColor={(isPwdEmpty) ? 'red' : 'gray'}
                            value={this.state.password_t}
                            onChangeText={text => { this.setState({ password_t: text, isPwdEmpty: false }) }}
                        />
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={() => this.submitPress()}>
                        <Text style={styles.btn_text}>Submit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.btn_signup_text}>Login</Text>
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
