import React from 'react';
import { render } from 'react-dom';
import Grid from './grid';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render(
  <Grid />,
  document.getElementById('app')
);
