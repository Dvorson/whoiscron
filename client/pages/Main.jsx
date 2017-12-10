import React from 'react';
import ResultsList from '../components/ResultsList.jsx'
import NewDomainInput from '../components/NewDomainInput.jsx'

const VanishingWrapper = (props) => props.children;

export default (props) => (
    <VanishingWrapper>
        <NewDomainInput />
        <ResultsList />
    </VanishingWrapper>
);