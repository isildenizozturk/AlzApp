import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, View, Button, Alert, Image, TouchableOpacity } from 'react-native';

import { Puzzles } from '../assets/HangmanAnswer';

import step0 from "../assets/0.jpg";
import step1 from "../assets/1.jpg";
import step2 from "../assets/2.jpg";
import step3 from "../assets/3.jpg";
import step4 from "../assets/4.jpg";
import step5 from "../assets/5.jpg";
import step6 from "../assets/6.jpg";


class GameScreen extends React.Component {
  static defaultProps = {
    images: [step0, step1, step2, step3, step4, step5, step6]
  }


  constructor(props){
    super(props);
    this.state = {
      "answer":"",
      "hint":"",
      "correct":0,
      "wrong":0,
      "usedLetters":[],
      "lettersLeft":[],
      "input":"",
      "score":0
    }
    this.init = this.init.bind(this);
    this.puzzles = new Puzzles();
  } 
  componentDidMount(){
    this.init();
  }
  static navigationOptions = {
    title: 'Back',
  };
  init(){
    let puzzle = this.puzzles.getRandom();
    let answer = puzzle.answer.replace(/[^a-zA-Z]/gmi, " ").trim();
    let hint = puzzle.hint;
    let lettersLeft = Array(answer.length);
    for(let index=0;index<answer.length;index++){
      lettersLeft[index] = answer[index]==" "?"*":" ";
    }
    this.setState({
      answer:answer,
      hint:hint,
      correct:0,
      wrong:0,
      usedLetters:[],
      lettersLeft:lettersLeft,
      input:"",
      score: 0
    });
  }
  validate(usedLetters,letter){
    usedLetters.push(letter);
    let correct = this.state.correct,
      wrong = this.state.wrong,
      answer = this.state.answer,
      lettersLeft = this.state.lettersLeft,
      score = this.state.score;
    if(answer.toUpperCase().indexOf(letter)==-1){
      wrong++;
      if(score>0){
        score --;
      }
    } else{
      answer.toUpperCase().split("").map((value,index)=>{
        if(value==letter){
          lettersLeft[index] = letter;
          correct ++;
          score++;
        }
      });
    }
    if(lettersLeft.join("").replace(/\*/g," ").toUpperCase() == answer.toUpperCase()){
      Alert.alert(
        'Kazandın',
        'Tebrikler cevabı doğru bildin 🧠🎉',
        [
          {text: 'Tamam', onPress: () => this.init()},
        ],
        { cancelable: false }
      )
    }
    if(wrong>4){
      Alert.alert(
        'Kaybettin🥺👉👈',
        'Cevap: '+answer +" "+this.state.hint,
        [
          {text: 'Tamam', onPress: () => this.init()},
        ],
        { cancelable: false }
      )
    }
    this.setState({
      usedLetters:usedLetters,
      correct:correct,
      wrong:wrong,
      lettersLeft:lettersLeft,
      score:score
    });
  }
  resetButton = () => {
    this.init();
  }

  render(){
    const keysRows = [
      ["Q","W","E","R","T","Y","U","I","O","P",],
      ["A","S","D","F","G","H","J","K","L"],
      [" ","Z","X","C","V","B","N","M"," "]]
    return(
      <View style={styles.container}>
        <Text style={styles.scoreText}>Puan: {this.state.score}</Text>
        <View>
          <Image 
          style={{justifyContent: 'center', alignContent: 'center', height: 150, width: 120}}
          source={this.props.images[this.state.wrong]} />
        </View>
        <View style={styles.dashes}>
        {this.state.lettersLeft.map((letter,index)=>{
          if(letter=="*"){
            return (<View style={styles.dashItemContainer} key={index}><Text style={styles.dashBlankItem}>  </Text></View>)
          }else{
            return(<View style={styles.dashItemContainer} key={index}><Text style={styles.dashItem}>{letter}</Text></View>)
          }
        })}
      </View>
        <View style={styles.hintContainer}><Text style={styles.hintText}>İpucu : {this.state.hint}</Text></View>
        <View style={styles.keyboard}>
        {keysRows.map((keys,rowIndex)=>{
          return(
            <View key={rowIndex} style={styles.keyboardRow}>
              {keys.map((letter,index)=>{
                if(letter==" "){
                  return <Text key={index}> </Text>
                }else if(this.state.usedLetters.indexOf(letter)!=-1){
                  return <View style={styles.keyItem} key={index}><Text key={index} style={styles.usedKey}>{letter}</Text></View>
                }else{
                  return <TouchableOpacity
                   onPress={this.onKeyPress.bind(this,letter)} style={styles.keyItem} key={index}><Text style={styles.letter}>{letter}</Text></TouchableOpacity>
                }
              })}
            </View>
          )
        })}
        </View>
         <Button onPress={this.resetButton}
          style = {styles.rstButton}
          title="Tekrar Oyna"
          />
           <Button onPress={() => Alert.alert('Tamamlandı!','Günlük oyunlarınızı tamamladınız. Menü butonundan diğer menülere geçiş yapabilirsiniz.')}
          style = {styles.rstButton}
          title="Bitir"
          />
      </View>
    )
  }

  onKeyPress(letter){
    let usedLetters = this.state.usedLetters;
    if(usedLetters.indexOf(letter)==-1){
      this.validate(usedLetters,letter);
    }else{
      return;
    }
  }

}


export default class Hangman extends React.Component {
  
    render() {
      return <GameScreen />;
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeContainer: {
    flex: 1,
    flexDirection:"column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },

  keyboard: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection:"column",
  },
  keyboardRow: {
    flex: 1,
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyItem:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:12,
  },
  usedKey:{
    color:"grey",
    fontSize:20,
    width:20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  letter:{
    color:"black",
    fontSize:20,
    width:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startGameBtn: {
    color: '#841584',
    fontSize:25,
    margin:10
  },
  dashInputStyle:{
    height: 20, 
  },
  dashes:{
    flex: 1,
    flexDirection:"row",
    alignItems: 'center',
    alignSelf:"auto",
    justifyContent: 'center',
    flexWrap:"wrap", 
    marginTop: 13
  },
  dashItemContainer:{
    flex:0,
    padding:4,
    margin:2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  dashItem:{
    width:15,
    color: '#841584',
    fontSize:20,
    borderBottomWidth:1,
    borderBottomColor:"black",
    marginTop: 8
  },
  dashBlankItem:{
    width:20,
    fontSize:20,
  },
  hintContainer:{
    flexWrap: 'wrap',
    alignItems: "flex-start",
    padding:4,
    backgroundColor:"lightgrey",
    marginTop: -3
  },
  hintText:{
    fontSize:18,
    fontWeight:"400",
  },
  scoreText:{
    fontSize:25,
    textAlign:"right",
    fontWeight:"500",
    justifyContent:"center",
    
  },
  rstButton: {
    flexDirection:'row',
    width: 30,
    height: 10,
    marginBottom: 5
  }
});