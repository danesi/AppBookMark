import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TextInput, Button} from 'react-native-paper';
import api from "../../../services/api";

export default function Detail({navigation, route}) {
    const book = route.params.book;
    const [name, setName] = useState(book.name);
    const [pages, setPages] = useState(book.pages);
    const [pages_read, setPagesRead] = useState(book.pages_read);


    async function update() {
        const bookUpdated = {
            name: name,
            pages: pages,
            pages_read: pages_read,
        }

        console.log(bookUpdated);

        if (bookUpdated.pages_read <= pages) {
            const response = await api.put(`books/${book.id}`, bookUpdated);
            if (response) {
                navigation.navigate('Home', { post: response });
            }
        }
    }

    async function deletar() {
        const response = await api.delete(`books/${book.id}`);
        if (response) {
            navigation.navigate('Home', { post: response });
        }
    }

    return (
        <View style={styles.main}>
            <View style={styles.viewBtn}>
                <Button
                    onPress={() => {
                        deletar()
                    }}
                    style={styles.btnDeletar}
                >
                    Deletar
                </Button>
            </View>
            <TextInput
                mode='outlined'
                style={styles.inputs}
                label="Nome"
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

            <TextInput
                mode='outlined'
                style={styles.inputs}
                label="Paginas lidas"
                value={String(pages_read)}
                onChangeText={Bookpages_read => setPagesRead(Bookpages_read)}
            />

            <Button mode="contained" onPress={() => {
                update()
            }}>
                Salvar
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
    btnDeletar: {
        width: 100,
    },
    viewBtn: {
        flexDirection: 'row-reverse'
    }
});

