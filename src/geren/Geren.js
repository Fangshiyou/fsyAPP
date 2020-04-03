import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux';
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    AsyncStorage,
    Button,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    BackHandler
} from 'react-native';
import Camera from 'react-native-camera';
const {width,scale} = Dimensions.get('window');
const s = width / 640;

const goods = [
    {
        title: '账户管理',
        img: require('../assets/shezhi.png')
    },
    {
        title: '收货地址',
        img: require('../assets/shezhi.png')
    },
    {
        title: '我的信息',
        img: require('../assets/shezhi.png')
    },
    {
        title: '我的订单',
        img: require('../assets/shezhi.png')
    },
    {
        title: '我的二维码',
        img: require('../assets/shezhi.png')
    },
    {
        title: '我的积分',
        img: require('../assets/shezhi.png')
    },
    {
        title: '我的收藏',
        img: require('../assets/shezhi.png')
    },
]
const actives =[
    {
        title: '居家维修保养',
        img: require('../assets/shezhi.png')
    },
    {
        title: '出行接送',
        img: require('../assets/shezhi.png')
    },
    {
        title: '我的受赠人',
        img: require('../assets/shezhi.png')
    },
    {
        title: '我的住宿优惠',
        img: require('../assets/shezhi.png')
    },
    {
        title: '我的活动',
        img: require('../assets/shezhi.png')
    },
    {
        title: '我的发布',
        img: require('../assets/shezhi.png')
    },
]
quit=()=>{
    AsyncStorage.removeItem('user',(error)=>{
        if (error) {
        }else {
            console.log("退出登录");
            Actions.replace("login");
        }
    })
}
export default class Geren extends Component {
    constructor(){
        super();
        this.state = {
            data,
            width: new Animated.Value(20),
            imageUrl:''
        }
    }
    render() {
        return (
            <View>
                <View
                    style={{width:640*s,height=400*s,backgroundColor:'red'}}    
                >
                    <View
                        style={{height:180*s,width:280*s,marginTop:110*s,marginLeft:180*s}}
                    >
                    <Image 
                        resizeMode="contain"
                        source={require(this.state.imageUrl)}
                        style={{height:180*s,width:280*s}}
                        onPress={this.takePhoto()}
                    />  
                    </View>
                </View>
                <View>
                    <View
                        style={{width:640*s,height:100*s}}
                    >
                        <Image 
                            resizeMode="contain"
                            source={require('../assets/shezhi.png')}
                            style={{height:100*s,width:180*s}}
                        />
                        <Text
                            style={{marginLeft:5}}
                        >我的个人中心</Text>
                    </View>
                <FlatList 
                    style={{backgroundColor: '#F4F4F4'}}
                    data={goods}
                    numColumns={3}
                    renderItem={({item})=>(
                        <View style={styles.good}>
                            <Image 
                                resizeMode="contain"
                                source={item.img}
                                style={{height:140*s,width:180*s}}
                            />
                            <Text
                                style={{marginTop:5}}
                            >{item.title}</Text>
                        </View>
                    )}
                />
                </View>

                <View
                    style={{marginTop:20*s}}
                >
                    <View
                        style={{width:640*s,height:100*s}}
                    >
                        <Image 
                            resizeMode="contain"
                            source={require('../assets/shezhi.png')}
                            style={{height:100*s,width:180*s}}
                        />
                        <Text
                            style={{marginLeft:5}}
                        >E族活动</Text>
                    </View>
                <FlatList 
                    style={{backgroundColor: '#F4F4F4'}}
                    data={actives}
                    numColumns={3}
                    renderItem={({item})=>(
                        <View style={styles.good} onPress={this.getTz(item)}>
                            <Image 
                                resizeMode="contain"
                                source={item.img}
                                style={{height:140*s,width:180*s}}
                            />
                            <Text
                                style={{marginTop:5}}
                            >{item.title}</Text>
                        </View>
                    )}
                />
                </View>
                <Text
                    style={{marginTop:40*s,textAlign:'center'}} 
                >
                    BINND DHILLON | <Text onPress={this.quit}>退出</Text>
                </Text>
            </View>
        )
    }
}
getTz=(item)=>{
    if(item.title == '我的发布'){
        Actions.release()
    }
}
takephoto = ()=>{
    ImageCropPicker.openCamera({
        width: 280*s,
        height: 180*s,
        cropping: true,
      }).then(image => {
        this.setState({imageUrl:{uri:image.path}})
      });
}
const styles = StyleSheet.create({
    good:{
        width: 180*s,
        height:180*s,
        backgroundColor: '#fff',
        marginTop: 20*s,
        marginLeft:20*s,
        alignItems: 'center'
    }
})