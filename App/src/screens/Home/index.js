import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Container, Scroller, HeaderArea, HeaderTitle, ListArea, LoadingIcon } from './styles';

import WarningItem from '../../components/WarningItem';

import Api from '../../Api';

export default () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getWarnings = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getWarnings();
        if(res.warnings != null) {
            setList(res.warnings);
        } else {
            alert("Erro: "+ res.error);
        }
        setLoading(false);
    };
    useEffect(() => {
        getWarnings();
    }, []);
    return (
        <Container>
            <HeaderArea>
                <HeaderTitle>MQV News</HeaderTitle>
            </HeaderArea>
            <Scroller>
                {loading && 
                    <LoadingIcon size="large" color="#FFFFFF"/>
                }
                <ListArea>
                    {list.map((item, k) => (
                        <WarningItem key={k} data={item} />
                    ))}
                </ListArea>
                
            </Scroller>
        </Container>
    );
};