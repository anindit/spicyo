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
import Editpost from './Editpost';

class Post extends Component {

  constructor(props){
    super(props);

    this.state = {
     
      allPost:[],
      showComponent: [],
    }
    //this.handleRegister = this.handleRegister.bind(this);
    //this.onButtonClick = this.onButtonClick.bind(this);

 }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadAllpost();
    console.log(this.state.showComponent)
  }

  onButtonClick(curid) {
    console.log(curid)
    this.setState({
      showComponent: []
    },()=>{
      this.setState({ showComponent: [...this.state.showComponent, curid] },()=>{
        console.log(this.state.showComponent)
      })
    })
    
    
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

  handleLanguage = (langValue) => {
  
      this.loadAllpost();
}

onButtonDelClick(delid)
{
  const request = {postid:delid};
  axios
  .post(`${window.$siteurl}/delete_post`, request)
  .then(res => {
        //  console.log(res)      
      if(res.data.status==1)
      {
        this.loadAllpost();
      }
      else{
          
      }

      setTimeout(
          () => this.setState({ sendmsg: '' }), 
          3000
      );
  })
  .catch(error => this.setState({ error, isLoading: false }));
}

  mypost()
  {
    var blog_img1=`${window.$siteurl}/blog_images/`;
    if(this.state.allPost.length>0)
    {
        return (
          this.state.allPost.map((postsingle, index) => (
              <tr>
                <td style={{whitespace: 'normal'}}>
                    
                    {(this.state.showComponent[0]==postsingle['id']) ? <Editpost onSelectLanguage={this.handleLanguage} postdesc={postsingle['description']} editid={postsingle['id']}/>:<div style={{width:'80%',marginTop: '12px'}}>{postsingle['description']}</div>}
                </td>
                <td className="text-right" style={{verticalAlign:'top'}}>
                    <ul className="list-inline font-size-20 contact-links mb-0">
                        <li className="list-inline-item" onClick={this.onButtonClick.bind(this,postsingle['id'])}>
                            <a href="#" data-toggle="tooltip"  data-placement="top" title="Message"><i className="fa fa-edit"></i></a>
                        
                        </li>
                        <li class="list-inline-item" onClick={this.onButtonDelClick.bind(this,postsingle['id'])}>
                            <a href="#" data-toggle="tooltip" data-placement="top" title="Profile"><i className="fa fa-trash"></i></a>
                        </li>
                    </ul>
                    <ul className="list-inline font-size-20 contact-links mb-0">
                        <li className="list-inline-item">
                            <a title="Message"><i className="bx bx-calendar"></i>Posted on : {postsingle['createdon']}</a>
                        </li>
                    </ul>
                </td>
              </tr>
              ))
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
        <div className="yellow_bg">
          <div className="container">
            <div className="row">
                <div className="col-md-12">
                  <div className="title">
                      <h2>My Review</h2>
                    
                  </div>
                </div>
            </div>
          </div>
        </div>
                <div className="col-lg-12">
                     <div className="card">
                         <div className="card-body">
                             <div className="table-responsive">
                                  <h5 class="font-size-14 mb-1">
                                      <a href="#" className="text-dark">Description</a>
                                  </h5>
                                 <table className="table table-centered table-nowrap table-hover">
                                     <tbody>
                                       {this.mypost()}
                                        
                                     </tbody>
                                 </table>
                             </div>

                         </div>
                     </div>
                </div>
    </div>
    );

  } 

}

export default Post;
