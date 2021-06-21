import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../assets/Colors';

const QuesAnsPair = (props) => {
    const [selected, setSelected] = useState({});
    const [score, setScore] = useState({});

    useEffect(() => {
            var arr = Object.values(score)
            let temp = 0;
            for (let i = 0; i < arr.length; i++) {
                temp = temp + arr[i]
            }
            final_score = temp
            props.getScore(final_score);
            props.get_selected(selected)
    }, [score, props.index])

    var final_score;
    const handleNext = async (selectedAns, achieved_score) => {
        setSelected({ ...selected, [props.index]: selectedAns });
        setScore({ ...score, [props.index]: achieved_score });
        props.is_next();
    }
    
    return (
        <>
            <View style={styles.questionContainer}>
                <Text style={styles.questionIndex}></Text>
                <Text style={styles.questionText}>
                    {props.question}
                </Text>
            </View>
            <View style={styles.selectedAnswerContainer}>
                <Text style={styles.selectedAnswer}>Seçilen Şık: {selected[props.index] === undefined ? <Text>_________</Text> : selected[props.index]} </Text>
            </View>
            <View style={styles.answersContainer}>
                {
                    props.answers.map((ans, i) => {
                        return (

                            <TouchableOpacity key={i} style={styles.answer} onPress={handleNext.bind(this, ans['label'], ans['value'])}>
                                <View>
                                    <Text style={styles.answerText}>{ans['label']}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    questionContainer: {
        margin: 20,
        backgroundColor: Colors.accent,
        padding: 15,
        borderRadius: 7,
        borderColor: Colors.primary,
        borderWidth: 2,
        minHeight: '12%'
    },
    questionIndex: {
        textAlign: 'center',
        fontSize: 0,
        marginBottom: 0,
        fontWeight: 'bold',
        color: Colors.primary
    },
    questionText: {
        fontSize: 16,
        textAlign: 'center',

    },
    answersContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    answer: {
        backgroundColor: '#bdbbd7',
        padding: 10,
        width: '95%',
        marginVertical: 6,
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.primary
    },
    answerText: {
        fontSize: 13,
    },
    selectedAnswer: {
        
        fontSize: 16,
        color: '#a34143',
    },
    selectedAnswerContainer: {
        marginLeft:6,
        width: '95%',
        marginVertical: 8,
        alignItems: 'center',
    }
})

export default QuesAnsPair;