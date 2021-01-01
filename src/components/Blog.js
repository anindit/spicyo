import { Component } from 'react';
import axios from 'axios';
import {burger_slide,rs1,rs2,rs3,rs4,rs5,title,aboutimg,blog_img1,blog_img2,blog_img3,client,client_icon} from '../static/localimages';

class Blog extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      
      blogdata:[]
     };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.blogdetails();
  }

  blogdetails()
  {
    axios
    .get(`${window.$siteurl}/blog`)
    .then(res => {
      console.log(res.data);
      console.log(res.data.allblog);
      
      if(res.data.status==1)
      {
        this.setState({
          blogdata:res.data.allblog
          });
      }
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }
  dateformat(dt)
  {
    console.log(222222222222222)
    console.log(dt)
  }

  allblog()
  {
    var blog_img1=`${window.$siteurl}/blog_images/`;
    if(this.state.blogdata.length>0)
    {
      return(
        <div className="blog">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title">
                  <i><img src={title} alt="#"/></i>
                  
                  <span>when looking at its layout. The point of using Lorem</span>
                </div>
              </div>
            </div>
            <div className="row">
              {this.state.blogdata.map((blogdatasingle, index) => ( 
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mar_bottom">
                <div className="blog_box">
                  <div className="blog_img_box">
                    <figure><img src={blog_img1+blogdatasingle['blog_img']} alt="#"/>
                    <span>{this.dateformat(blogdatasingle['createdon'])}</span>
                    </figure>
                  </div>
                  <h3>{blogdatasingle['name']}</h3>
                  <p>{blogdatasingle['description']}</p>
                </div>
              </div>
               ))}
            </div>
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
                    <h2>Blog</h2>
                  
                </div>
              </div>
          </div>
        </div>
      </div>
      {this.allblog()}
      </div>
    );

  } 

}

export default Blog;
