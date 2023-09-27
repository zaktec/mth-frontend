import React from 'react';
import { Circles } from 'react-loader-spinner';

const Loading = () => {
    return (
        <Circles
            width='30'
            height='30'
            visible={true}
            color='#ffffff'
            wrapperStyle={{ justifyContent: 'center', color: '#ffffff' }}
        />
    );
}

export default Loading;
