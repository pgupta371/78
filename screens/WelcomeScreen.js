import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class WelcomeScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            emailId: '',
            password: '',
            isModalVisible: false,
            firstName: '',
            lastName: '',
            contact: '',
            address: '',
            confirmPassword: '',
        }
    }

    userSignUp =(email, password, confirmPassword)=>{
        if(password !== confirmPassword){
            alert('Password does not match')
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
                db.collection('Users').add({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    contact: this.state.contact,
                    address: this.state.address,
                    emailId: this.state.emailId,
                })
                return alert('User has sucessfully been added');
                [{text:'ok', onPress:()=> this.setState({isModalVisible: false})}]
            })
            .catch((error)=>{
                var errorCode = error.code
                var errorMessage = error.message
                return alert(errorMessage);
            })
        }
    }

    userLoginIn =(email, password)=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
            alert('User has sucessfully logged in');
        })
        .catch((error)=>{
            var errorCode = error.code
            var errorMessage = error.message
            return alert(errorMessage);
        })
    }

    showModal =()=>{
        return(
            <Modal
                animationType
                transparent = {true}
                visible = {this.state.isModalVisible}
            >
                <View style = {styles.modalContainer}>
                    <ScrollView style = {{width: '100%'}}>
                        <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
                            <Text style = {styles.modalTitle}>
                                Sign Up
                            </Text>
                            <TextInput
                                style = {styles.loginBox}
                                placeholder = 'First Name'
                                maxLength = {15}
                                onChangeText = {(text)=>{
                                    this.setState({firstName: text})
                                }}
                            />
                            <TextInput
                                style = {styles.loginBox}
                                placeholder = 'Last Name'
                                maxLength = {15}
                                onChangeText = {(text)=>{
                                    this.setState({lastName: text})
                                }}
                            />
                            <TextInput
                                style = {styles.loginBox}
                                placeholder = 'Phone Number'
                                maxLength = {10}
                                keyboardType = {'numeric'}
                                onChangeText = {(text)=>{
                                    this.setState({contact: text})
                                }}
                            />
                            <TextInput
                                style = {styles.loginBox}
                                placeholder = 'Address'
                                multiline = {true}
                                onChangeText = {(text)=>{
                                    this.setState({address: text})
                                }}
                            />
                             <TextInput
                                style = {styles.loginBox}
                                placeholder = 'abc@example.com'
                                keyboardType = 'email-address'
                                onChangeText = {(text)=>{
                                    this.setState({emailId: text})
                                }}
                            />
                            <TextInput
                                style = {styles.loginBox}
                                placeholder = 'Enter Password'
                                secureTextEntry = 'true'
                                onChangeText = {(text)=>{
                                    this.setState({password: text})
                                }}
                            />
                            <TextInput
                                style = {styles.loginBox}
                                placeholder = 'Confirm Password'
                                secureTextEntry = 'true'
                                onChangeText = {(text)=>{
                                    this.setState({confirmPassword: text})
                                }}
                            />

                            <TouchableOpacity
                                style = {[styles.button, {marginBottom: 10, marginTop: 10}]}
                                onPress = {()=>{
                                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                                }}
                            >
                                <Text style = {styles.buttonText}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style = {[styles.button, {marginBottom: 10, marginTop: 10}]}
                                onPress = {()=>{this.setState({isModalVisible: false})}}
                            >
                                <Text style = {styles.buttonText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
 
    render(){
        return (
           <View style = {styles.container}>
               <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                    {this.showModal()}
               </View>
               <View>
                   <Text style = {styles.title}>
                        Barter System
                   </Text>
               </View>
               <View>
               <TextInput
                    style = {styles.loginBox}
                    placeholder = 'abc@example.com'
                    keyboardType = 'email-address'
                    onChangeText = {(text)=>{
                        this.setState({emailId: text})
                    }}
                   />
                <TextInput
                    style = {styles.loginBox}
                    placeholder = 'Enter Password'
                    secureTextEntry = 'true'
                    onChangeText = {(text)=>{
                        this.setState({password: text})
                    }}
                />

                <TouchableOpacity
                    style = {[styles.button, {marginBottom: 10, marginTop: 10}]}
                    onPress = {()=>{
                        this.userLoginIn(this.state.emailId, this.state.password)
                    }}
                >
                    <Text style = {styles.buttonText}>
                        Sign In
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {[styles.button, {marginBottom: 10, marginTop: 10}]}
                    onPress = {()=>{
                        this.setState({isModalVisible: true})
                    }}
                >
                    <Text style = {styles.buttonText}>
                        Sign Up
                    </Text>
                </TouchableOpacity>

               </View>
           </View> 
        );
    }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#C6F5FF' },
  title: {
    fontSize: 50,
    fontWeight: '3000000',
    paddingBottom: 30,
    color: '#00D1FF',
    alignSelf: 'center',
    marginTop: 50,
  },
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: '#00D1FF',
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    alignSelf: 'center',
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#00D1FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    alignSelf: 'center',
  },
  buttonText: { color: '#ffff', fontWeight: '3000', fontSize: 20 },
   modalContainer:{ 
        flex:1, 
        borderRadius:20, 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:"#ffff", 
        marginRight:30, 
        marginLeft : 30, 
        marginTop:80, 
        marginBottom:80, 
    },
    modalTitle :{ 
        justifyContent:'center', 
        alignSelf:'center', 
        fontSize:30, 
        color:'#00D1FF', 
        margin:50 
    },
});