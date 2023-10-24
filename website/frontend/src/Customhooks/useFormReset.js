import React, { useState } from 'react';

export const useFormReset = (initialValue = "") => {
    const [state, setState] = useState(initialValue);

    const update = (data) =>{
        setState(data);
    }

    const reset = () =>{
        setState(initialValue);
    }

    return [state, update, reset];
};

