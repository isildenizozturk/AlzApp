import React, {Component} from 'react';
import {
    StatusBar,
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';


let step= null;

class Card extends Component {
    render() {
        return  (
            <TouchableOpacity onPress={ this.props.onPress} style={ {...this.props.style} }>
            <Text style={{fontSize: this.props.fontSize || 32 }}>{this.props.isShow ? this.props.title : this.props.cover} </Text>
            </TouchableOpacity>
        )
    }
}

class MatchingGame extends Component {
    state = {
        cardSymbols: [
            '🐶','🐘','🐓','🦩','🦚','🐙','🦖','🐉',
        ],
        cardSymbolsInRand: [],
        isOpen: [],
        firstPickedIndex: null,
        secondPickedIndex: null,
        steps: 0,
        score: 0,
        isEnded: false,
    }

    initGame = () => {
        let newCardsSymbols = [...this.state.cardSymbols, ...this.state.cardSymbols]
        let cardSymbolsInRand = this.shuffleArray(newCardsSymbols)


        let isOpen = []
        for (let i = 0; i < newCardsSymbols.length; i++) {
            isOpen.push(false)
        }

        this.setState({
            cardSymbolsInRand,
            isOpen,
        })
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

    cardPressHandler = (index) => {
        let isOpen = [...this.state.isOpen]

        if (isOpen[index]) {
            return;
        }


        isOpen[index] = true 
    
        if (this.state.firstPickedIndex == null && this.state.secondPickedIndex == null) {
            this.setState({
                isOpen,
                firstPickedIndex: index,
            })
    
        } else if (this.state.firstPickedIndex != null && this.state.secondPickedIndex == null) {
            this.setState({
                isOpen,
                secondPickedIndex: index,
            })
        }
        this.setState({
            steps: this.state.steps + 1,
        })
        
    }
    
    calculateGameResult = () => {
        if (this.state.firstPickedIndex != null && this.state.secondPickedIndex != null) {
           
            if (this.state.cardSymbolsInRand.length > 0) {
                let totalOpens = this.state.isOpen.filter((isOpen) => isOpen)
                if (totalOpens.length === this.state.cardSymbolsInRand.length) {
                    this.setState({
                        isEnded: true,
                    })
                    return
                }
            }
           
            let firstSymbol = this.state.cardSymbolsInRand[this.state.firstPickedIndex]
            let secondSymbol = this.state.cardSymbolsInRand[this.state.secondPickedIndex]

            if (firstSymbol != secondSymbol) {
                //Incorrect
                setTimeout(() => {
                    let isOpen = [...this.state.isOpen]
                    isOpen[this.state.firstPickedIndex] = false
                    isOpen[this.state.secondPickedIndex] = false

                    this.setState({
                        firstPickedIndex: null,
                        secondPickedIndex: null,
                        isOpen,
                    })

                }, 1000)
            } else {
                //Correct
                this.setState({
                    firstPickedIndex: null,
                    secondPickedIndex: null,

                })

            }
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
            firstPickedIndex: null,
            secondPickedIndex: null,
            steps: 0,
            isEnded: false,
        })

    }


    render() {
        
        return (
            <>
                <StatusBar />

                <SafeAreaView style={ styles.container}>
                    <View style={ styles.header }>
                        <Text style= {styles.heading}>Görselleri Eşleştir</Text>

                    </View>
                    <View style={ styles.main}>
                        <View style={styles.gameBoard}>
                            {this.state.cardSymbolsInRand.map((Symbol, index) =>
                                <Card key={index} onPress={ () => this.cardPressHandler(index)} style={styles.button} fontSize={50} title={Symbol} cover="❓" isShow={this.state.isOpen[index]}/>
                            )}
                        </View>

                    </View>
                    <View style={ styles.footer}> 
                    
                        <Text style= {styles.footerText}>{
                            step = this.state.steps,
                            this.state.isEnded 
                            
                                ? 'Tebrikler! 😄 '+ step + ' adımda tamamladınız.'
                                : step + ' kez denediniz.'
                        
                        }</Text>
                        {this.state.isEnded ?
                            <TouchableOpacity onPress={ this.resetGame } style={ styles.tryAgainButton } >
                                <Text style={styles.tryAgainButtonText }>Try Again</Text>
                            </TouchableOpacity>

                        : null}
                        <TouchableOpacity onPress={ () => this.props.navigation.navigate("SumGame")} style={ styles.tryAgainButton } >
                                <Text style={styles.tryAgainButtonText }>Bir sonraki oyun</Text>
                            </TouchableOpacity>

                    </View>

                </SafeAreaView>

            </>
        )
    }

}

export default MatchingGame;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#eee',
        

    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#b5838d',


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
        color:'#b5838d',
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
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        margin: (Dimensions.get('window').width - (70 * 4)) / (5 * 2),

    },
    buttonText: {
        fontSize: 30,
    },
    tryAgainButton: {
        backgroundColor: '#b6bcff',
        borderRadius: 16,
        alignItems: 'center',
        padding:12,
        marginBottom:30,
        marginTop:6,
        width:'65%',
        height:50,
        
    },
    tryAgainButtonText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        
    },
 

});