import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  Button,
  Dimensions
} from 'react-native';
import Constants from '../Constants';
import Images from '../assets/Images';
import Cell from '../components/Cell';

export default class BoardView extends Component {
    constructor(props){
        super(props);

        this.state = {
            dimensions: Number(props.route.params.dimensions)
        }

        this.boardWidth = Constants.CELL_SIZE * this.state.dimensions;
        this.grid = Array.apply(null, Array(this.state.dimensions)).map((el, idx) => {
            return Array.apply(null, Array(this.state.dimensions)).map((el, idx) => {
                return null;
            });
        });
    }

    onDie = () => {
        Alert.alert("Perdiste!! Volvé a intentar!");
        for(let i=0; i<this.state.dimensions; i++){
            for(let j=0; j<this.state.dimensions; j++){
                this.grid[i][j].revealWithoutCallback();
            }
        }
    }

    revealNeighbors = (x, y) => {
        for(let i=-1;i<=1;i++){
            for(let j=-1;j<=1;j++){
                if ((i != 0 || j != 0) && x + i >= 0 && x + i <= this.state.dimensions - 1 && y + j >= 0 && y + j <= this.state.dimensions - 1){
                    this.grid[x + i][y + j].onReveal(false);
                }
            }
        }
    }

    onReveal = (x, y) => {
        let neighbors = 0;
        for(let i=-1;i<=1;i++){
            for(let j=-1;j<=1;j++){
                if (x + i >= 0 && x + i <= this.state.dimensions - 1 && y + j >= 0 && y + j <= this.state.dimensions - 1){
                    if (this.grid[x + i][y + j].state.isMine){
                        neighbors++;
                    }
                }
            }
        }

        if (neighbors){
            this.grid[x][y].setState({
                neighbors: neighbors
            })
        } else {
            this.revealNeighbors(x, y);
        }
    }

    renderBoard = () => {
        return Array.apply(null, Array(this.state.dimensions)).map((el, rowIdx) => {
            let cellList = Array.apply(null, Array(this.state.dimensions)).map((el, colIdx) => {
                return <Cell
                    onReveal={this.onReveal}
                    onDie={this.onDie}
                    key={colIdx}
                    width={Constants.CELL_SIZE}
                    height={Constants.CELL_SIZE}
                    x={colIdx}
                    y={rowIdx}
                    ref={(ref) => { this.grid[colIdx][rowIdx] = ref }}
                />
            });

            return (
                <View key={rowIdx} style={{ width: this.boardWidth, height: Constants.CELL_SIZE, flexDirection: 'row'}}>
                    {cellList}
                </View>
            )
        });


    }

    resetGame = () => {
        for(let i=0; i<this.state.dimensions; i++){
            for(let j=0; j<this.state.dimensions; j++){
                this.grid[i][j].reset();
            }
        }
    }

    showHelp = () => {
        Alert.alert("Toca una celda para abrirla. Mantené para marcar una bandera.");
    }

    showRules = () => {
        Alert.alert("Cuando abrís una celda, te muestra un número que indica cuántas minas tiene alrededor. Tocando una celda sin número, te muestra todas las vacías que tiene cerca. El objetivo es encontrar todas las celdas, sin tocar una mina. Si sospechas de una celda que puede ser una mina, podes colocar una bandera.");
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.blueRectangle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={Images.logo} style={{ width: 30, height: 30, marginLeft: 5}} resizeMode="contain" />
                    <Text style={styles.title}>Buscaminas</Text>
                    </View>
                    <View style={styles.closeSquare}>
                        <Text style={styles.closeText}>X</Text>
                    </View>
                </View>
                <View style={styles.helpRectangle}>
                    <TouchableOpacity onPress={this.resetGame}>
                        <View style={[styles.helpText]}>
                            <Text>Jugar de nuevo</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showHelp}>
                        <View style={[styles.helpText]}>
                            <Text>Ayuda</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showRules}>
                        <View style={[styles.helpText]}>
                            <Text>Reglas</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.greyRectangle}>
                    <View style={{ width: this.boardWidth, height: this.boardWidth, backgroundColor: '#888888', flexDirection: 'column'}}>
                        {this.renderBoard()}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        alignItems: 'center',
        width: Dimensions.get('screen').width - 30,
        height: 40,
        backgroundColor: "#050080",
        flexDirection: 'row'
    },
    greyRectangle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width - 30,
        height: this.boardWidth,
        backgroundColor: "#C0C0C0",
        padding: 20
    },
    helpRectangle: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimensions.get('screen').width - 30,
        height: 40,
        backgroundColor: "#C0C0C0",
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        marginLeft: 5
    },
    closeSquare: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        backgroundColor: "#C0C0C0",
        marginRight: 5
    },
    closeText: {
        color: '#000000',
        fontWeight: 'bold'
    },
    helpText: {
        color: '#000000',
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 10
    }
});
