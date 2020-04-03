import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux';
import {
    View,
    Text,
    AsyncStorage,
    Button,
    ScrollView,
    StatusBar,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';

const { width, scale } = Dimensions.get('window');
const s = width / 640;
export default class LocalPage extends Component {
    constructor() {
        super();
        this.state = {
            tits: [],
            page: 1,
        }
    }
    getUp = () => {
        if (this.page == 1) {
            ToastAndroid.show('这已经是第一页了', ToastAndroid.SHORT)
        } else {
            this.setState({
                page: this.state.page - 1
            })
        }
    }
    getDown = () => {
        this.setState({
            page: this.state.page + 1
        })
    }
    getTitle = () => {
        fetch('https://cnodejs.org/api/v1/topics?page＝' + this.state.page + '&limit＝15')
            .then(res => res.json())
            .then(res => {
                this.setState({ tits: res.data });
            })
    }
    render() {
        return (
            <View>
                <StatusBar backgroundColor='red' translucent={true} />
                <ScrollView>
                    {
                        this.state.tits.map((item) => (
                            <View style={styles.box}>
                                <Text style={{ fontSize: 17, width: 340 * s }}>{item.title ? (item.title.length > 5 ? item.title.substr(0, 15) + "..." : item.title) : ""}</Text>
                                <Text style={{ fontSize: 17, width: 160 * s, marginLeft: 70 * s }}>{item.create_at}</Text>
                                <Text style={{ fontSize: 17, width: 150 * s, marginLeft: 10 * s }}>已回复</Text>
                            </View>
                        ))
                    }
                    <TouchableOpacity
                        style={{ width: 150 * s, height: 80, backgroundColor: 'red' }}
                        title="上一页"
                        onPress={this.getUp} />
                    <Text style={{ width: 150 * s, height: 80, marginLeft: 50 * s }}>第{this.state.page}页</Text>
                    <TouchableOpacity
                        style={{ width: 150 * s, height: 80, backgroundColor: 'red', marginLeft: 50 * s }}
                        title="下一页"
                        onPress={this.getDown} />
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    box: {
        width: 640 * s,
        height: 80 * s,
        marginTop: 20 * s,
        alignItems: 'center'
    },
})
