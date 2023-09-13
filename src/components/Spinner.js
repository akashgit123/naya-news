import React, { Component } from 'react';
import loading from '../loading.gif';

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-3'>
        <img src={loading}  width="45px" alt='loading' />
      </div>
    )
  }
}

export default Spinner;
