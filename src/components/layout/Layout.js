import Header from './Header';
import Footer from './Footer';
import React, {Component} from 'react';
import axios from 'axios';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  import Index from '../Index';
import About from '../About';
import Contact from '../Contact';
import Blog from '../Blog';
import Recipe from '../Recipe';
import Post from '../Post';
import Addpost from '../Addpost';
import Resetpassword from '../Resetpassword';

class Layout extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          modalIsOpen:false,
        }
       
    }
    componentDidMount() {
       
     
        
    }

   
   

    render() {
        return (
            <div>
            
                <Header />
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route exact path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/blog" component={Blog} />
                    <Route path="/recipe" component={Recipe} />
                    <Route path="/review" component={Post} />
                    <Route path="/addreview" component={Addpost} />
                    <Route path="/resetpassword/:resetlink" component={Resetpassword} />
                </Switch>   
                <Footer />
            </div>
            
        )
    }
}
export default Layout;
