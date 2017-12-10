const whoiscron = require('../../lib');

module.exports = {
    getDomains: () => whoiscron.getDomainsList(),
    getWhois: (domain) => whoiscron.getWhois(domain),
    addDomain: (domain) => whoiscron.addDomain(domain)
}