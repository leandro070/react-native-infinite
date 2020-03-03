import React, { FunctionComponent, useState } from "react";
import { IQuestion } from "../models/question";
import { Text, View } from "react-native";
import { Card, CardItem, Button, ListItem, Left, Right } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
interface IProps {
    item: IQuestion
}

const QuestionItem: FunctionComponent<IProps> = (params: IProps) => {
    const { pregunta, respuesta } = params.item;

    const [viewResponse, setViewResponse] = useState(false)

    const responseWidget = () => {
        if (!viewResponse) return null;
        return <View style={{ backgroundColor: '#f2f2f2', padding: 16 }}>
            <Text style={{ marginTop: 4 }}>{respuesta}</Text>
        </View>
    }

    return (
        <View>
            <View style={{padding: 16, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{ flex: 1}}>
                    <Text style={{ fontWeight: 'bold' }}>{pregunta}</Text>
                </View>
                <View style={{ padding: 8 }}>
                    <Button rounded small transparent onPress={() => setViewResponse(!viewResponse)}>
                        <MaterialIcons name={viewResponse ? 'arrow-drop-up' : 'arrow-drop-down'} size={28} color="#717171"/>
                    </Button>
                </View>
            </View>
            {responseWidget()}
        </View>

    )
}

export default QuestionItem;