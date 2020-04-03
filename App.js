import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, BackHandler, ToastAndroid } from 'react-native';
import { Router, Overlay, Scene, Tabs, Drawer, Lightbox, Modal, Actions } from 'react-native-router-flux';
import { Grid, Icon } from '@ant-design/react-native';
import Fuwu from './src/home/Fuwu'
import Geren from './src/geren/Geren'
import List from './src/goods/List'
import Release from './src/geren/Release'
import Login from './src/common/Login'
import SwiperPage from './src/common/SwiperPage';
import Register from './src/common/Register';
console.disableYellowBox = true;
const App = () => {
  let [isLogin, setLogin] = useState(false);
  let [isInstall, setInstall] = useState(true);
  let now = 0;
  let init = () => {
    AsyncStorage.getItem('isInstall')
      .then(res => {
        console.log('isinstall', res)
        if (res) {
          setInstall(false);
        }
      })
    AsyncStorage.getItem('user')
      .then(res => {
        let user = JSON.parse(res)
        console.log(user)
        if (!user) {
          SplashScreen.hide();
        }
        if (user && user.token) {
          setLogin(true);
          SplashScreen.hide();
        }
      })
  }
  useEffect(() => {
    init();
  }, [])
  let afterInstall = () => {
    console.log('after install')
    setInstall(false)
  }
  if (isInstall) {
    return <View style={{ flex: 1 }}>
      <SwiperPage afterInstall={afterInstall} />
    </View>
  }
  return (
    <Router
      backAndroidHandler={() => {
        if (Actions.currentScene != 'home') {
          Actions.pop();
          return true;
        } else {
          if (new Date().getTime() - now < 2000) {
            BackHandler.exitApp();
          } else {
            ToastAndroid.show('确定要退出吗', 100);
            now = new Date().getTime();
            return true;
          }
        }

      }}
    >
      <Overlay>
        <Modal key="modal" hideNavBar>
          <Lightbox key="lightbox">
            <Drawer
              key="drawer"
              contentComponent={() => <Text>drawer</Text>}
              drawerIcon={() => <Icon name="menu" />}
              drawerWidth={400}
            >
              <Scene key="root">
                <Tabs
                  key='tabbar'
                  hideNavBar
                  activeTintColor="red"
                  inactiveTintColor="blue"
                >
                  {/* 首页 */}
                  <Scene key='home'
                    title='首页'
                    icon={
                      ({ focused }) => <Icon
                        color={focused ? 'red' : 'blue'}
                        name="home"
                      />
                    }
                  >
                    <Scene key='home' hideNavBar={true} component={Fuwu} />
                  </Scene>
                  {/* 分类 */}
                  <Scene key='fenlei'
                    title='分类'
                    icon={
                      ({ focused }) => <Icon
                        color={focused ? 'red' : 'blue'}
                        name="file"
                      />
                    }
                  >
                    <Scene key="felei" component={List} />
                  </Scene>
                  {/* 个人中心 */}
                  <Scene key='geren'
                    title='个人中心'
                    icon={
                      ({ focused }) => <Icon
                        color={focused ? 'red' : 'blue'}
                        name="file"
                      />
                    }
                  >
                    <Scene key="geren" component={Geren} />
                  </Scene>
                </Tabs>
                <Scene
                  key="release"
                  title="我的发布"
                  component={Release}
                  titleStyle={{ fiex: 1, textAlign: 'center' }}
                  renderRightButton={<View>...</View>}
                />
              </Scene>
            </Drawer>
          </Lightbox>
          <Scene initial={!isLogin} key="login" component={Login} />
          <Scene key="register" component={Register} />
        </Modal>
      </Overlay>
    </Router>
  )
};

export default App;
