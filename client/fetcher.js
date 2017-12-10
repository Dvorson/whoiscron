import axios from 'axios';
import Promise from 'bluebird';

export function getDomains() {
    return axios.get('/api/domains')
        .then((res) => res.data);
}

export function getWhois(domainName) {
    if (!domainName) return Promise.reject('No domain name specified');
    return axios.post('/api/whois', { domain: domainName })
        .then((res) => res.data);
}

export function getDomainsWithWhois() {
    return getDomains()
        .then((domains) => 
            Promise.map(domains, (domain) => 
                getWhois(domain)
                    .then((whois) => 
                        Object.assign({ name: domain }, whois)
                    )
            )
        );
}

export function addDomain(name) {
    if (!name) return Promise.reject('addDomain: No data');
    return axios.post('/api/domains', { domain: name });
}

export function deleteDomainById(id) {
    if (!id) return Promise.reject('deleteDomain: No id');
    return axios.delete(`/api/domains/${id}`);
}