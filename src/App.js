import 'babel/polyfill';
import React from 'react';
import ConsoleApp from './ConsoleApp';

var render = () => {
  React.render(
    <ConsoleApp />,
    document.getElementById('ConsoleApp')
  );
}
render();
