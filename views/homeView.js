import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Button,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Constants from '../Constants';
import Images from '../assets/Images';
import BoardView from './boardView';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export default class HomeView extends Component {
    constructor(props){
        super(props);

        this.state = {
          dimensions: 0
        }
    }

    startGame = () => {
        const parsedDimensions = Number.parseInt(this.state.dimensions);
        if (Number.isNaN(parsedDimensions)) {
            Alert.alert("Tenes que ingresar dimensiones del tablero.");
            return null;
        } else if (parsedDimensions === 0) { 
            Alert.alert("Tenes que ingresar dimensiones del tablero.");
            return null;
        } else if (parsedDimensions > 12) {
            Alert.alert("Para una mejor experiencia, ingresa un número menor a 12");
            return null;
        } else if (parsedDimensions < 4) {
            Alert.alert("Para una mejor experiencia, ingresa un número mayor a 4");
            return null;
        } else {
            this.props.navigation.navigate('Board', { dimensions: parsedDimensions });
        }
    }

    validateDimensions(dimensions) {
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={Images.logo} style={{ width: Dimensions.get('screen').width / 2, height: 150, marginTop: 100, marginBottom: 50}} resizeMode="contain" />
                <View style={styles.blueRectangle}>
                    <Text style={styles.title}>Ingrese dimensiones del tablero</Text>
                    <View style={styles.closeSquare}>
                        <Text style={styles.closeText}>X</Text>
                    </View>
                </View>
                <View style={styles.greyRectangle}>
                    <TextInput  
                        style={{height: 40, width: Dimensions.get('screen').width / 3, backgroundColor: 'azure', fontSize: 20}}  
                        placeholder="Ejemplo: 10"
                        keyboardType="numeric"
                        onChangeText={(dimensions) => this.setState({dimensions})}
                    />  
                    <TouchableOpacity onPress={this.startGame}>
                        <View style={[styles.button]}>
                            <Text>Jugar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#0D7E7E'
    },
    button: {
        height: 40,
        width: 120,
        backgroundColor: '#bdbdbd',
        borderWidth: 3,
        borderTopColor: '#ffffff',
        borderLeftColor: '#ffffff',
        borderRightColor: '#000000',
        borderBottomColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000000',
        marginTop: 20
    },
    blueRectangle: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: Dimensions.get('screen').width - 30,
        height: 40,
        backgroundColor: "#050080",
        flexDirection: 'row'
    },
    greyRectangle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width - 30,
        height: 150,
        backgroundColor: "#C0C0C0"
    },
    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        marginLeft: 5,
        marginTop: 10
    },
    closeSquare: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        backgroundColor: "#C0C0C0",
        marginTop: 10,
        marginRight: 5
    },
    closeText: {
        color: '#000000',
        fontWeight: 'bold'
    }
});

