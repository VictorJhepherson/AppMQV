import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Api from '../../Api';


import Swiper from 'react-native-swiper';
import { Container, Scroller, SwipeDot, SwipeDotActive , SwipeItem, SwipeImage, FakeSwiper, PageBody, WarningInfoArea, WarningAddressArea } from './styles';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [warningInfo, setWarningInfo] = useState({
        WARNING_ID: route.params.WARNING_ID,
        WARNING_TITLE: route.params.WARNING_TITLE,
        WARNING_DATE: route.params.WARNING_DATE
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getWarningInfo = async () => {
            setLoading(true);
            let json = await Api.getWarning(warningInfo.WARNING_ID);
            if(json.warnings != '') {
                setWarningInfo(json.warnings);
            } else {
                alert("Erro: " + json.error);
            }
            setLoading(true);
        }
        getWarningInfo();
    }, []);
     
    return (
        <Container>
            <Scroller>
                {warningInfo.WARNING_PHOTOS != undefined && warningInfo.WARNING_PHOTOS.length > 0 ?
                    <Swiper
                        style={{height: 240}}
                        dot={<SwipeDot />}
                        activeDot={<SwipeDotActive />}
                        paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                        autoplay={true}
                    >
                        {warningInfo.map((item, key) => (
                            <SwipeItem key={key}>
                                <SwipeImage source={{uri: item.WARNING_PHOTOS}} resizeMode="cover"/>
                            </SwipeItem>
                        ))}
                    </Swiper>
                    :
                    <FakeSwiper></FakeSwiper>
                }
                <PageBody>
                    <WarningInfoArea>

                    </WarningInfoArea>
                    <WarningAddressArea>

                    </WarningAddressArea>
                </PageBody>
            </Scroller>
        </Container>
    );
};