import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {Avatar, Card, IconButton, Button} from "react-native-paper";
import api from "../../../services/api";
import {StyleSheet, View} from "react-native";

export default function Index({navigation, route}) {

    // const {response} = route.params;

    const [books, setBooks] = useState([]);
    // const navigation = useNavigation();

    async function loadBooks() {
        const response = await api.get('books');
        setBooks(response.data);
    }

    function navigateToDetail( book ) {
        navigation.navigate('Detail', {book})
    }

    function getPercentage(pages, pages_read) {
        var percentage = Math.round((pages_read * 100) / pages);
        return "Status da leitura: " + percentage + "%"
    }

    function add() {
        navigation.navigate('Add')
    }

    useEffect(() => {
        loadBooks()
    }, [])

    useEffect(() => {
        if (route.params?.post) {
            loadBooks()
        }
    }, [route.params?.post]);

    return (
        <View  style={styles.main}>
            {books.map((book) => (
                <Card.Title
                    key={book.id}
                    title={book.name}
                    subtitle={getPercentage(book.pages, book.pages_read)}
                    left={(props) => <Avatar.Icon {...props} icon="book"/>}
                    right={(props) => <IconButton {...props} icon="forward" onPress={() => {
                        navigateToDetail(book)
                    }}/>}
                />
            ))}
            <Button mode="contained" icon="plus" onPress={() => {
                add()
            }}>
                Adicionar
            </Button>
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
