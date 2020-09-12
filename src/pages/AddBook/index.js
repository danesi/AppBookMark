import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import {useNavigation, useRoute} from '@react-navigation/native';
import {TextInput, Button} from 'react-native-paper';
import api from "../../../services/api";

export default function Add() {


    const [name, setName] = useState('');
    const [pages, setPages] = useState('');

    const navigation = useNavigation();

    async function add() {
        const newBook = {
            name,
            pages
        }

        const book = await api.post('books', newBook)

        if (book) {
            navigation.navigate('Home');
        }
    }

    return (
        <View style={styles.main}>
            <TextInput
                mode='outlined'
                style={styles.inputs}
                label="Nome do livro"
                value={name}
                onChangeText={Bookname => setName(Bookname)}
            />
            <TextInput
                mode='outlined'
                style={styles.inputs}
                label="Total de paginas"
                value={String(pages)}
                onChangeText={Bookpages => setPages(Bookpages)}
            />
            <Button mode="contained" onPress={() => {
                add()
            }}>
                Cadastrar
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        margin: 30
    },
    inputs: {
        marginBottom: 20
    },
});
