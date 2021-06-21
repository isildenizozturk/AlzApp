import React, { useEffect, useState } from 'react';
import { StatusBar, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import shuffle from 'lodash.shuffle'; 


const RandomNumber = ({ id, number, disable, onSelected }) => {

  const handlePresss = () => {
      if(!disable)
          onSelected(id);
  };

  return (
      <TouchableOpacity onPress={handlePresss}>
          <Text style={[styles.random, disable && styles.disable]}>{number}</Text>
      </TouchableOpacity>
  );    
};

let intervalId;
//let score = 0;

const Game = ({ randomNumbersCount, initialSeconds }) => { 

    const [selectedNumbers, setSelectedNumbers] = useState([]);

    const[randomNumbers, setRandomNumbers] = useState([]);

    const [target, setTarget ] = useState(15);

    const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

    const [gameStatus, setGameStatus ] = useState('OYNUYOR');
    
   const [score, setScore] = useState(0);


    useEffect(() => {

        const firstRandomNumbers = Array.from({ length: randomNumbersCount }) 
        .map(() => 1 + Math.floor(10*Math.random()));

        const firstTarget = firstRandomNumbers.slice(0, randomNumbersCount-2)
        .reduce((acc, cur)=>
        acc + cur 
        , 0); 

        const shuffleRandomNumbers = shuffle(firstRandomNumbers);

        setRandomNumbers(shuffleRandomNumbers);

        setTarget(firstTarget);

        intervalId = setInterval(() => {
            setRemainingSeconds((seconds) => seconds - 1); 
        }, 1000);

        return () => clearInterval(intervalId);

    }, [])

    useEffect(() => {
        setGameStatus(getGameStatus());
        if (remainingSeconds === 0 || gameStatus !== 'OYNUYOR') 
            clearInterval(intervalId);
    }, [remainingSeconds, selectedNumbers]);


    const isNumberSelected = numberIndex => selectedNumbers.some(number => number === numberIndex);
    
    const selectedNumer = number => setSelectedNumbers([...selectedNumbers, number]);
    

    const getGameStatus = () => {
        const sumSelected = selectedNumbers.reduce((acc, cur ) => acc + randomNumbers[cur], 0)
        let skor = 0;

        if (sumSelected > target || remainingSeconds == 0) {
            skor = skor - 1;
            setScore(skor);
            return 'KAYBETTİN'
        }else if (sumSelected === target) {
            skor = skor + 1;
            setScore(skor);
            return 'KAZANDIN';
        }else {
            return 'OYNUYOR';
        }
        
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.target, styles[gameStatus]]}>{target}</Text>
            <Text style= {styles.text}>{gameStatus}</Text>
            <Text style= {styles.text}>{remainingSeconds}</Text>
            <View style={styles.randomContainer}>
                {randomNumbers.map((randomNumbers, index) => 
                    <RandomNumber 
                                id={index}
                                key={index} 
                                number={randomNumbers} 
                                disable={isNumberSelected(index) || gameStatus !== 'OYNUYOR'}
                                onSelected={selectedNumer}                                
                    />
                )}
            </View> 
            <View>
                <Text style= {styles.footerText} > {
                        "Skor: " + score
                    }
                </Text>
            </View>           
        </View>
    );

};


export default SumGame = ({navigation}) => {
  const [gameId, setGameId] = useState(0);
  this

  return (
    <View style={styles.container1}>
      <Game key={gameId} randomNumbersCount={6} initialSeconds={15}></Game>
      <StatusBar style="dark" />
       
      <TouchableOpacity  style={styles.button} onPress={() => setGameId(() => gameId + 2)}>
                        <Text style={styles.buttonText}>İleri</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.button} onPress={() => setGameId(() => gameId +1)}>
                        <Text style={styles.buttonText}>Tekrar Oyna</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.button} onPress={() => navigation.navigate('VisualGame')}>
                        <Text style={styles.buttonText}>Bir sonraki oyuna geç</Text>
      </TouchableOpacity>
        
    </View>
        
  )    
};


const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    paddingVertical: 20,
    paddingHorizontal: 50,
  },
    container: {
      flex: 1,
  },
  target: {
      fontSize: 40,
      backgroundColor: '#aaa',
      textAlign: "center",
      borderRadius:10,
  },
  randomContainer: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
  },
  OYNUYOR: {
      backgroundColor: "#ffd9c4",
  },
  KAZANDIN: {
      backgroundColor: "#ace1af",
  },
  KAYBETTİN: {
      backgroundColor: "#ffb6b9",
  },

  random: {
    backgroundColor: '#cc8899',
    width: 120,
    minHeight: 40,
    marginBottom:20,
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 35,
    textAlign: "center",
    color: 'black',
    padding:12,
    borderRadius: 12,
  },
  disable: {
      opacity: 0.3,
  },
  footerText: {
    fontSize: 20,
    textAlign: 'center',
    paddingVertical:12,
    marginVertical:6,
    marginBottom:-8,

  },
  button: {
    backgroundColor: '#b6bcff',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom:6,

},
buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',

},
text:{
    fontSize: 20,
    textAlign: 'center',
    paddingVertical:2,
    marginVertical:4,
}
  }); 