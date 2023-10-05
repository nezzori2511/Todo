import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import firestore from "@react-native-firebase/firestore"
import {Appbar, Button, TextInput} from "react-native-paper";
import React from "react";
import Todo from "./todo/todo";

export default function App() {
    const ref = firestore().collection('t')
    const [todo, setTodo] = React.useState('')
    const [todos, setTodos] = React.useState([])
    const [loading, setLoading] = React.useState([])

    async function addTodo() {
        await ref.add({
            title: todo,
            complete: false,
        })
        setTodo('')
    }

    React.useEffect(() => {
        return ref.onSnapshot(querySnapshot => {
            const list: any = []
            querySnapshot.forEach(doc => {
                const {title, complete} = doc.data()
                list.push({
                    id: doc.id,
                    title,
                    complete,
                })
            })
            setTodos(list)
            if (loading) {
                // @ts-ignore
                setLoading(false);
            }
        })
    })
    if (loading) {
        return null
    }


    return (
        <View style={{flex: 1}}>
            <Appbar>
                <Appbar.Content title={'TODOs List'}/>
            </Appbar>
            <FlatList
                style={{flex: 1}}
                data={todos}
                keyExtractor={item => item['id']}
                renderItem={({item}) => <Todo {...(item as object)}/>}
            />
            <TextInput label={'New todo'} value={todo} onChangeText={(text) => setTodo(text)}></TextInput>
            <Button onPress={addTodo}>Add TODO</Button>
        </View>
    )
}

