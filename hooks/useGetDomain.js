import { useState, useEffect } from 'react';

export default function useGetDomain() {
    const [domain, setDomain] = useState('');

    useEffect(() => {
        setDomain(window.location.hostname);
    });

    return domain;
}