import { useState, useEffect } from 'react';

export default function useGetDomain(path) {
    const [domain, setDomain] = useState('');

    useEffect(() => {
        setDomain(`https://${window.location.hostname}${path}`);
    });

    return domain;
}