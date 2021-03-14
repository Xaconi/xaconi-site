import { useState, useEffect } from 'react';

export default function useGetDomain(path) {
    const [domain, setDomain] = useState('');

    useEffect(() => {
        setDomain(`${window.location.hostname}${path}`);
    });

    return domain;
}