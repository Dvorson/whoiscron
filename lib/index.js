'use strict'
const whois = require('node-xwhois');
const fs = require('fs');
const path = require('path');

const domainsFile = path.resolve(__dirname, './domainsList.json'); 

function detectNewlineType(str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}
	const newlines = (str.match(/(?:\r?\n)/g) || []);
	if (newlines.length === 0) {
		return null;
	}
	const crlf = newlines.filter(function (el) {
		return el === '\r\n';
	}).length;
	const lf = newlines.length - crlf;
	return crlf > lf ? '\r\n' : '\n';
};

function parseWhois(data) {
	if (!data) return;
	const newlineType = detectNewlineType(data);
	const lines = data.split(newlineType);
	return lines.reduce((acc, line) => {
		if (line.includes(':')) {
			const argArray = line.trim().split(':');
			const argName = argArray.shift();
			const argVal = argArray.join(':');
			return [...acc, { [argName]: argVal }]
		}
		return acc;
	}, []);
}

function getDomainsList() {
	return new Promise((resolve, reject) => {
		fs.readFile(domainsFile, (err, data) => {
			if (err) return reject(err);
			return resolve(JSON.parse(data));
		})
	});
}

function addDomainToList(domain) {
	return new Promise((resolve, reject) => {
		getDomainsList.then((json) => {
			const list = JSON.parse(json);
			const newList = [ ...list, domain ];
			fs.writeFile(domainsFile, JSON.stringify(newList), (err) => {
				if (err) return reject(err);
				return resolve();
			});
		})
	});
}

function getWhoisForAll() {
	return getDomainsList().then((domains) => {
		domains.forEach((host) => whois.whois(host)
			.then(info => console.log(`${host} whois:\n`, parseWhois(info)))
			.catch(err => console.log(err))
		);
	});
}

module.exports = {
	getDomainsList,
	addDomainToList
}
