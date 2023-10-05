import React from "react";
import firestore from "@react-native-firebase/firestore";
import {List} from "react-native-paper";


export default function Todo({id, title, complete}: any) {
    async function toggleComplete() {
        await firestore()
            .collection('t')
            .doc(id)
            .update({
                complete: !complete,
            })
    }

    return (
        <List.Item
            title={title}
            onPress={() => toggleComplete()}
            left={props => (
                <List.Icon {...props} icon={complete ? 'check' : 'cancel'}/>
            )}/>
    )
}
