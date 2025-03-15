import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native'; // to use the navigation hook
import {RootStackParamList} from '../types'; // Import the types
import {Text} from 'react-native-paper';
type Navigation = NavigationProp<RootStackParamList>;

const Footer = () => {
  const navigation = useNavigation<Navigation>(); // Using the navigation hook to get navigation
  const [pressed, setPressed] = useState('');
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={pressed === 'Salah' ? styles.activeButton : styles.button}
        onPress={() => {
          navigation.navigate('Salah');
          setPressed('Salah');
        }}>
        <Text style={styles.buttonText}>اوقاتِ نماز</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={pressed === 'Masail' ? styles.activeButton : styles.button}
        onPress={() => {
          navigation.navigate('CameraScreen');
          setPressed('Masail');
        }}>
        <Text style={styles.buttonText}>مسائل</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={pressed === 'MorningDua' ? styles.activeButton : styles.button}
        onPress={() => {
          navigation.navigate('MorningDua');
          setPressed('MorningDua');
        }}>
        <Text style={styles.buttonText}>صبح کے اذکار </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={pressed === 'EveningDua' ? styles.activeButton : styles.button}
        onPress={() => {
          navigation.navigate('EveningDua');
          setPressed('EveningDua');
        }}>
        <Text style={styles.buttonText}>شام کے اذکار</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#C1C1E6',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderRadius: 20,
    width: '100%',
    flexWrap: 'wrap',
    padding: 5,
  },
  button: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    margin: 5,
    width: '30%',
  },
  buttonText: {
    fontSize: 20, // Adjust the font size here
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  activeButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#A569BD',
    margin: 5,
    width: '30%',
  },
});

export default Footer;
