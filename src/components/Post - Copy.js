import { Component } from 'react';
import axios from 'axios';
import Addpost from './Addpost';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

class Post extends Component {

  constructor(props){
    super(props);

    this.state = {
     
      allPost:[],
      showComponent: false,
    }
    //this.handleRegister = this.handleRegister.bind(this);
    this._onButtonClick = this._onButtonClick.bind(this);

 }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadAllpost();
  }

  _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }
  loadAllpost()
  {
    axios
    .get(`${window.$siteurl}/allpost`)
    .then(res => {
      console.log(res.data);
      console.log(res.data.allpost);
      
      if(res.data.status==1)
      {
        this.setState({
          allPost:res.data.allpost
          });
      }
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }

  mypost()
  {
    var blog_img1=`${window.$siteurl}/blog_images/`;
    if(this.state.allPost.length>0)
    {
      return(
        <div className="blog">
          <div className="container">
           {this.state.showComponent ?<Addpost /> : null}
           
              {this.state.allPost.map((postsingle, index) => (
                <div style={{ width:'80%',height:'40%',border:'0.5px solid #E0E0E0',marginBottom:'10px'}}>
                  
                  <p className="lead mb-4" style={{paddingLeft:'10px'}}>{postsingle['description']}</p>
                  <span style={{paddingLeft:'10px'}}><b>Posted on</b> : <i>{postsingle['createdon']}</i></span> 
                  <br/>
                </div>
                
               ))}
           
          </div>
        </div>
      )
    }
    else{
      return null;
    }
  }
  render()
  {
    return (
      <div>
        <div class="yellow_bg">
          <div class="container">
            <div class="row">
                <div class="col-md-12">
                  <div class="title">
                      <h2>My Review</h2>
                    
                  </div>
                </div>
            </div>
          </div>
        </div>
    {this.mypost()}
    </div>
    );

  } 

}

export default Post;
