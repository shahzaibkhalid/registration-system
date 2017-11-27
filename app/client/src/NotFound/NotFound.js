import React, {Component} from 'react';
import { Link } from 'react-router-dom';
class NotFound extends Component {
  render() {
    return(
      <div>
        <h2>Page not found!</h2>
        <h3><Link to='/'>Go back Home</Link></h3>
      </div>
    )
  }
}

export default NotFound;