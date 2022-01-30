import React from 'react';
import { Triangle } from 'react-loader-spinner'

const Loading = () => {
    return (
        <center style={{ height: '85vh', display: "grid", placeItems: "center" }}>
            <div style={{ display: "grid", placeItems: "center" }}>
                <Triangle color="#00e676" height={80} width={80} />
            </div>
        </center>
    );
};

export default Loading;
