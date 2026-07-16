import { useState, useEffect } from 'react';
import { AppState } from 'react-native';
export function useAppIsInBackground() {
    const [state, setState] = useState('active');
    useEffect(() => {
        const onStateChange = (nextState) => {
            setState(nextState);
        };
        AppState.addEventListener('change', onStateChange);
        return () => {
            AppState.removeEventListener('change', onStateChange);
        };
    }, []);
    return state === 'background';
}
