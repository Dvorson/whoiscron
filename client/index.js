import React from 'react';
import { render } from 'react-dom';

import AppBar from './components/AppBar.jsx';
import MainPage from './pages/Main.jsx';

const VanishingWrapper = (props) => props.children;

function App() {
  return (
    <VanishingWrapper>
        <AppBar />
        <MainPage />
    </VanishingWrapper>
  );
}

render(<App />, document.querySelector('#app'));