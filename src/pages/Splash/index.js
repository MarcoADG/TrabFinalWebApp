import React from 'react'
import LottieView from "lottie-react-native"
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native';
export default function Splash() {
  const navigation = useNavigation();
  
    return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <LottieView source={require('../../../assets/splash.gif')} autoPlay loop={false} speed={1.0} onAnimationFinish={() => navigation.navigate('Gerenciamento') } />
    </View>
  )
}
