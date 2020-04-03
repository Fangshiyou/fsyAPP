import React, { Component } from 'react'
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

const {width,scale} = Dimensions.get('window');
const s = width / 640;

const goods = [
    {
        title: '居家维修保养',
        img: require('../assets/weixiu.png')
    },
    {
        title: '住宿优惠',
        img: require('../assets/weixiu.png')
    },
    {
        title: '出行接送',
        img: require('../assets/weixiu.png')
    },
    {
        title: 'E族活动',
        img: require('../assets/weixiu.png')
    },
]
export default class Fuwu extends Component {
    constructor(){
        super();
        this.state = {
            count:0
        }
    }
    render() {
        return (
            <View>
            <View
                style={{alignItems: 'center',width: 640*s,height:480*s}}
            >
                <Image 
                    resizeMode="contain"
                    source={require('./images/xkzx.png')}
                    style={{height:480*s,width:640*s}}
                />
            </View>
            <View>
                <FlatList 
                    style={{backgroundColor: '#F4F4F4'}}
                    data={goods}
                    numColumns={1}
                    renderItem={({item})=>(
                        <View style={styles.good}>
                            <Image 
                                resizeMode="contain"
                                source={item.img}
                                style={{height:160*s,width:160*s,marginLeft:0}}
                            />
                            <Text
                                style={{marginLeft:20*s,fontSize:18}}
                            >{item.title}</Text>
                        </View>
                    )}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={{width:600*s,height:120*s,backgroundColor:'red',marginLeft:20*s,marginTop:20*s}}
                >
                        <Text style={{color:'white'}}>发布需求</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{alignItems: 'center'}}    
            >
                <Text
                    style={{color:'black',fontSize:15}}
                >
                    @E族之家 版权所有
                </Text>        
            </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    good:{
        width: 640*s,
        height:160*s,
        backgroundColor: '#fff',
        marginTop: 20*s,
        alignItems: 'center'
    }
})