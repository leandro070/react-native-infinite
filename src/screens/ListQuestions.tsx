import React, { FunctionComponent, useState, useEffect } from "react";
import { FlatList } from "react-native";
import { IQuestion } from "../models/question";
import QuestionItem from "../components/QuestionItem";
import { Container, Spinner } from "native-base";
import { ToastAndroid } from 'react-native';
import API from "../utils/API";

interface IProps { }


const ListQuestions: FunctionComponent<IProps> = (props: IProps) => {

    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const itemsPerPage = 10

    useEffect(() => {
        fetchQuestions();
    }, [])

    const fetchQuestions = async () => {
        if (hasMore) {
            setLoading(true);

            await API.get<IQuestion[]>(`/questions?page=${page}&limit=10`).then((response) => {
                if (response && response.data.length > 0) {
                    setQuestions([...questions, ...response.data]);
                } else {
                    setHasMore(false);
                    _handleMessage("No more elements");
                }
            }).catch((err) => {
                _handleMessage(err.message);
            })

            setLoading(false);
        }
    }

    const _handleMessage = (message) => {
        ToastAndroid.show(
            message,
            ToastAndroid.SHORT,
        );
    }

    useEffect(() => {
        fetchQuestions();
    }, [page])

    const _handleLoadMore = () => {
        setPage(page + 1)
    };

    const footer = () => {
        return loading ? <Spinner color='blue' /> : null;
    }

    return (
        <Container style={{ margin: 16, elevation: 16, borderRadius: 4 }}>
            {questions.length > 0 &&
                <FlatList
                    data={questions}
                    renderItem={({ item }) => <QuestionItem item={item} />}
                    keyExtractor={item => item.numero.toString()}
                    onEndReached={_handleLoadMore}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={itemsPerPage}
                    ListFooterComponent={footer}
                />}
        </Container>
    );

}

export default ListQuestions;