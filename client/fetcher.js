import axios from 'axios';

export function getDomains() {
    return axios.get('/api/domains')
        .then((domains) => {
            console.log(domains);
            return domains.data;
        });
}

export function getWhois(domainName) {
    if (!domainName) return Promise.reject('No domain name specified');
    return axios(`/api/whois/${domainName}`);
}

export function addDomain(data) {
    if (!data) return Promise.reject('addDomain: No data');
    return axios.post('/api/domains', data);
}

export function deleteDomainById(id) {
    if (!id) return Promise.reject('deleteDomain: No id');
    return axios.delete(`/api/domains/${id}`);
}