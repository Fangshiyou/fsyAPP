import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, AsyncStorage, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { myFetch } from '../utils/index'
import { Icon } from '@ant-design/react-native';

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            pwd: '',
            pwdhandle: '',
            phone: ''
        }
    }
    username = (text) => {
        this.setState({ username: text })
    }
    pwd = (text) => {
        this.setState({ pwd: text })
    }
    pwdhandle = (text) => {
        this.setState({ pwdhandle: text })
    }
    phonehandle = (text) => {
        this.setState({ phone: text })
    }
    zhuce = () => {
        if (this.state.username == "" || this.state.pwd == "" || this.state.phone == '') {
            ToastAndroid.show("用户名、密码、手机号不能为空.", ToastAndroid.SHORT);
        } else if (this.state.pwd != this.state.pwdhandle) {
            ToastAndroid.show("两次密码不一致.", ToastAndroid.SHORT);
        } else {
            myFetch.post('/zhuce', {
                username: this.state.username,
                pwd: this.state.pwd
            }).then(res => {
                if (res.data.token == 1) {
                    Alert.alert("该用户已注册");
                } else if (res.data.token == 2) {
                    Alert.alert("注册失败")
                } else {
                    AsyncStorage.setItem('user', JSON.stringify(res.data))
                        .then(() => {
                            Alert.alert("注册成功")
                            Actions.login();
                        })
                }
            });
        }

    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View
                    style={{ alignItems: 'center' }}>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            marginBottom: 30,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                        }}>
                        <Icon name="user" size={30} color="#900" />
                        <TextInput placeholder="用户名" style={{ fontSize: 25, width: '100%' }}
                            onChangeText={this.username}
                        />
                    </View>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            marginBottom: 30,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                        }}>
                        <Icon name="lock" size={30} color="#900" />
                        <TextInput
                            style={{ fontSize: 25, width: '100%' }}
                            onChangeText={this.pwd}
                            placeholder="密码"
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{
                        height: 42,
                        width: "80%",
                        borderColor: "#eeeeee",
                        borderWidth: 1,
                        borderRadius: 7,
                        backgroundColor: "#fff",
                        marginBottom: 10,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center"
                    }}>
                        <Icon style={{ fontSize: 25, color: "#f23030" }} name="lock" />
                        <TextInput
                            onChangeText={this.pwdhandle}
                            placeholder="确认密码"
                            secureTextEntry={true}
                            style={{
                                height: 40,
                                width: "87%",
                                backgroundColor: "#fff",
                            }} />
                    </View>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            marginBottom: 30,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                        }}>
                        <Icon name="phone" size={30} color="#900" />
                        <TextInput
                            style={{ fontSize: 25, width: '100%' }}
                            onChangeText={this.phonehandle}
                            placeholder="手机号"
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            width: '80%',
                            height: 70,
                            backgroundColor: '#272727',
                            borderRadius: 20,
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this.register}>
                        <Text style={{ fontSize: 25, color: "white" }}>注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => Actions.login()}><Text style={{ color: "#804040", fontSize: 18 }}>已有账号，点击此处直接登录</Text></TouchableOpacity>
                </View>
                {
                    this.state.isload
                        ? <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 25, marginLeft: "25%", position: "absolute", bottom: 70, width: "50%", height: 60, backgroundColor: "#984B4B" }}><Text style={{ color: "white", fontSize: 30, alignItems: "center" }}>正在注册</Text></View>
                        : null
                }
            </View>
        );
    }
}