import React, {JSX} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SalahTimings from './components/SalahTimings';
import Footer from './components/Footer'; // Import the Footer component
import MorningDua from './components/MorningDua';
import EveningDua from './components/EveningDua';
//import Masail from './components/Masail';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  return (
    <>
      {hideSplashScreen ? (
        <NavigationContainer>
          <View style={styles.container}>
            {/* Stack Navigator for Screens */}
            <Stack.Navigator
              initialRouteName="Salah"
              screenOptions={{headerShown: false}}>
              <Stack.Screen
                name="Salah"
                component={SalahTimings}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MorningDua"
                component={MorningDua}
                options={{headerShown: true, title: 'صبح کے اذکار '}}
              />
              <Stack.Screen
                name="EveningDua"
                component={EveningDua}
                options={{headerShown: true, title: 'شام کے اذکار '}}
              />
              {/* <Stack.Screen
                name="Masail"
                component={Masail}
                options={{headerShown: true, title: 'مسائل'}}
              /> */}
            </Stack.Navigator>
            <Footer />
          </View>
        </NavigationContainer>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the full screen
    position: 'relative', // Ensure the footer is positioned relative to this container
  },
});

export default App;
