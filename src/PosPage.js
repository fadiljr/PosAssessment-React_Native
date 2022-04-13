import React from 'react';
import {Provider} from 'react-redux';
import PosComponent from './PosComponent';
import {store} from './redux';

const PosPage = () => {
  return (
    <Provider store={store}>
      <PosComponent />
    </Provider>
  );
};

export default PosPage;
