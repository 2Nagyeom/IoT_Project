import React, { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';

import AutoHeightImage from 'react-native-auto-height-image';


const ledOffImg = require('./img/led_Off.png');
const ledOnImg = require('./img/led_On.png');


const App = () => {
  // 상태값 지정
  const [ledonoff, setLedonoff] = useState(false)
  // 데이터베이스 연결하기 위한 함수
  const databasefunction = (state) => {
    database()
      .ref('/LED_STATUS/')
      .set(state)
  }
  // 함수 실행할 때 실행하는 값
  useEffect(() => {
    database()
      .ref('/LED_STATUS/')
      .on('value', (res) => {
        console.log(res.val())
        if (res.val() == 'ON') {
          setLedonoff(true)
        } else {
          setLedonoff(false)

        }
      })
  }, [])

  // LED ON 함수
  const ledOn_function = () => {
    databasefunction('ON')
  }

  // LED OFF 함수
  const ledOff_function = () => {
    databasefunction('OFF')
  }

  return (
    <SafeAreaView>

      <View style={{
        marginTop: 20,
        borderWidth: 5,
        borderColor: 'salmon',
        borderRadius: 10,
        margin: 10,
        padding: 10
      }}>
        <Text style={{ textAlign: 'center', fontSize: 50 }}>파이썬 프로젝트</Text>
        <Text style={{ textAlign: 'center', fontSize: 50 }}>기말과제</Text>
        <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 20 }}>202075390 이은비</Text>
      </View>

      <View style={{ flexDirection: 'row', width: '100%', padding: 10 }}>
        <TouchableWithoutFeedback onPress={() => { ledOn_function() }}>
          <View style={{
            flex: 1,
            height: 60,
            backgroundColor: 'salmon',
            borderRadius: 10,
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10
          }}>
            <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'white' }}>LED ON</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => { ledOff_function() }}>
          <View style={{
            flex: 1,
            height: 60,
            backgroundColor: 'salmon',
            borderRadius: 10,
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'white' }}>LED OFF</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        {ledonoff ?
          <AutoHeightImage
            width={300}
            source={ledOnImg}
          />
          :
          <AutoHeightImage
            width={300}
            source={ledOffImg}
          />
        }
      </View>

    </SafeAreaView>
  );
};


export default App;


