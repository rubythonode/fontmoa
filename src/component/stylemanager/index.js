
import React, { Component } from 'react';
import './default.css';

import {TabItem} from '../../jui'

class StyleManager extends Component {

  render() {

    return (
        <TabItem active={this.props.active}>
          
        </TabItem>
    );
  }
}

export default StyleManager;