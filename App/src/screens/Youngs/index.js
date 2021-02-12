import React, { useState, useEffect } from 'react';
import { 
    Container,
    Scroller,
    
    HeaderArea,
    HeaderTitle,
    
    SearchArea,
    SearchInput,
    SearchButton,

    LoadingIcon,
    ListArea
} from './styles';

import SearchIcon from '../../assets/search.svg';

import Api from '../../Api';
import UserItem from '../../components/UserItem';

export default () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [name, setName] = useState('');

    const handleSearchClick = async () => {
        setLoading(true);
        setList([]);
        if(name != ''){
            let res = await Api.getUsersByName(name);
            if(res.data != null) 
                setList(res.data);
            else 
                alert("Erro: "+ res.error);
        } else {
            alert('Digite um nome!');
        }
        setLoading(false);
    };

    const getUsers = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getUsers();
        if(res.data != null) 
            setList(res.data);
        else 
            alert("Erro: "+ res.error);
        setLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o Jovem Abençoado</HeaderTitle>
                    <SearchIcon width="26" heigth="26" fill="#FFFFFF" />
                </HeaderArea>
                <SearchArea>
                    <SearchInput 
                        placeholder="Procure pelo nome"
                        placeholderTextColor="#000000"
                        value={name}
                        onChangeText={t=>setName(t)}
                    />
                    <SearchButton onPress={handleSearchClick}>
                        <SearchIcon width="32" heigth="32" fill="#000000" />
                    </SearchButton>
                </SearchArea>
                {loading && 
                    <LoadingIcon size="large" color="#FFFFFF"/>
                }
                <ListArea>
                    {list.map((item, k) => (
                        <UserItem key={k} data={item} />
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    );
}