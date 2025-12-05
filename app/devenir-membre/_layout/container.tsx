import React from 'react';
import AppContainer from '@/components/common/containers/appContainer';
import Banner from './banner';
import BlockIntro from './blockIntro';

const Container = () => {
    return (
        <AppContainer>
            <Banner />
            <BlockIntro />
        </AppContainer>
    );
}

export default Container;
