
import { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import Layout from './components/layout/Layout';
import Index from './components/Index';
import About from './components/About';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Recipe from './components/Recipe';

import './static/css/bootstrap.min.css';
import './static/css/owl.carousel.min.css';
import './static/css/style.css';
import './static/css/responsive.css';
window.$siteurl = 'http://localhost:3900';

class App extends Component {
  componentDidMount() {
        
    console.log('------')
    console.log(this.props.children)
    console.log('------')

  }


  render()
  {
    return (
      <Router>
        <Layout/>        
      </Router>
    );

  } 

}

export default App;
