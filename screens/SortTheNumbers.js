import React, {Component} from 'react';
import {
    StatusBar,
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
    TextInputBase,
    Button,
} from 'react-native';
import { useState } from 'react/cjs/react.development';
import { Alert } from 'react-native';


let skor= null;

class Card extends Component {
    render() {
        return  (
            <TouchableOpacity onPress={ this.props.onPress} style={ {...this.props.style} }>
            <Text style={{fontSize: this.props.fontSize || 32 }}>{this.props.isShow ? this.props.title : this.props.cover} </Text>
            </TouchableOpacity>
        )
    }
}


class VisualGame extends Component {
        
    state = {
        cardSymbols: [
            '1','2','3','4','5',
        ],
        cardSymbolsInRand: [],
        isOpen: [],

        steps: 0,
        score: 0,
        isEnded: false,

        number1: '',
        number2: '',
        number3: '',
        number4: '',
        number5: '',

    }

    initGame = () => {
        let newCardsSymbols = [ ...this.state.cardSymbols]
        let cardSymbolsInRand = this.shuffleArray(newCardsSymbols)


        let isOpen = []
        for (let i = 0; i < newCardsSymbols.length; i++) {
            isOpen.push(true)
        }

        this.setState({
            cardSymbolsInRand,
            isOpen,
        })
        setTimeout(() => {
            let isOpen = [...this.state.isOpen]

            this.setState({

                isOpen:true
            })

        }, 3000)
    }
  
    componentDidMount() {
        this.initGame()

    } 

    shuffleArray = (arr) => {
        const newArr = arr.slice()
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr;
    }


    
    calculateGameResult = () => {
        let scores = this.state.score 
       
       if (this.state.number1 == this.state.cardSymbolsInRand[0] && this.state.number2 == this.state.cardSymbolsInRand[1] && this.state.number3 == this.state.cardSymbolsInRand[2] && this.state.number4 == this.state.cardSymbolsInRand[3] && this.state.number5 == this.state.cardSymbolsInRand[4]) {       
            this.setState({
                score: this.state.score + 1 
            })   
            
            this.nextGame();
       }
       
        else {
             this.setState({
                score: this.state.score - 1
           
            }) 
            this.nextGame();
        
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.secondPickedIndex != this.state.secondPickedIndex) {
            this.calculateGameResult()
        }
    }

    resetGame = () => {
        this.initGame()

        this.setState({
            score: 0,
            isEnded: false,
            number1: '',
            number2: '',
            number3: '',
            number4: '',
            number5: '',
        })

    }
    nextGame = () => {
        this.initGame()

        this.setState({
            
            //isEnded: false,
            number1: '',
            number2: '',
            number3: '',
            number4: '',
            number5: '',
        })

    }

    render() {
        return (
            <>
                <StatusBar />

                <SafeAreaView style={ styles.container }>
                    <View style={ styles.header }>
                        <Text style= {styles.heading}>Sayıları Sırala</Text>

                    </View>
                    <View style={ styles.main}>
                        <View style={styles.gameBoard}>
                            {this.state.cardSymbolsInRand.map((Symbol, index) =>
                                <Card key={index} style={styles.button} fontSize={50} title={Symbol} cover="❓" isShow={this.state.isOpen[index]}/>
                            )}
                        </View>
                        <View>
                            
                      <View style={{flexDirection:'row'}}>
        
                          <TextInput 
                           placeholder={"1.Sayı"}
                          style={styles.input}
                          onChangeText = {(text) =>  this.setState({number1: text})} value={this.state.number1}
                           />
                          <TextInput 
                          placeholder={"2.Sayı"}
                          style={styles.input}
                          onChangeText = {(text) =>  this.setState({number2: text})} value={this.state.number2}
                          />
                          <TextInput  
                          placeholder={"3.Sayı"}
                          style={styles.input}  
                          onChangeText = {(text) =>  this.setState({number3: text})} value={this.state.number3}
                          />
                          <TextInput 
                          placeholder={"4.Sayı"}
                          style={styles.input}  
                          onChangeText = {(text) =>  this.setState({number4: text})} value={this.state.number4}
                          />
                          <TextInput  
                          placeholder={"5.Sayı"}  
                          style={styles.input}  
                          onChangeText = {(text) =>  this.setState({number5: text})} value={this.state.number5}
                          />
                      </View>
                      <View>
                          <Button
                          style={styles.saveButton}
                          onPress= {this.calculateGameResult}
                          title= "Kaydet"/>
                      </View>
                        </View>
                        

                    </View>
                    
                    <View style={ styles.footer}> 
                        
                        <Text style= {styles.footerText} > {
                            skor = this.state.score,
                            "Skor: " + skor
                        }

                        </Text>

                            <TouchableOpacity onPress={ this.resetGame } style={ styles.tryAgainButton } >
                                <Text style={styles.tryAgainButtonText }>Tekrar Dene</Text>
                            </TouchableOpacity>
                            <Button
                          style={styles.saveButton}
                          onPress= {() => this.props.navigation.navigate('Hangman')}
                          title= "Bir sonraki oyuna geç"/>


                    </View>

                </SafeAreaView>

            </>
        )
    }

}

export default VisualGame;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',

    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    main: {
        flex: 3,
        backgroundColor: '#fff',
    },
    footer: {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',

    },
    footerText: {
        fontSize: 20,
        textAlign: 'center',
    },
    gameBoard: {
        flex: 1,
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    button:  {
        backgroundColor: '#ccc',
        borderRadius: 8,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: (Dimensions.get('window').width - (60 * 5)) / (5 * 2),

    },
    buttonText: {
        fontSize: 30,
    },
  
    tryAgainButton: {
        backgroundColor: '#eee',
        padding: 8,
        borderRadius: 8,
        marginTop: 10,
    },
    tryAgainButtonText: {
        fontSize: 18,

    },

    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        marginLeft: 15,
        marginBottom:125
        
    },
    saveButton: {
        width: 50,
        height: 20,
        marginBottom: 15

    },

});