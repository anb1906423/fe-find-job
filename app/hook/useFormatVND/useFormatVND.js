import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function useFormatVND(number = 0) {
    console.log(number);

    const [giaTri, datGiaTri] = useState(number);

    useEffect(() => {
        const result = number.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

        datGiaTri(result);
    }, [number]);

    return giaTri;
}

export default useFormatVND;
