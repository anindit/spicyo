import { Component } from 'react';
import axios from 'axios';
import {burger_slide,rs1,rs2,rs3,rs4,rs5,title,aboutimg,blog_img1,blog_img2,blog_img3,client,client_icon} from '../static/localimages';


class About extends Component {
  constructor(props) {
    super(props);
    console.log('-------props about-------')
    console.log(props)
    this.state = {      
      aboutdata:[]      
     };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.aboutdeatils();

  }

  aboutdeatils()
  {
    axios
    .get(`${window.$siteurl}/about`)
    .then(res => {
      console.log(res.data);
      console.log(res.data.allabout);
      
      if(res.data.status==1)
      {
        this.setState({
          aboutdata:res.data.allabout
          });
      }
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }

  about()
  {
    var aboutimg=`${window.$siteurl}/about_images/`;
    if(this.state.aboutdata.length>0)
    {
      return(
        <div className="about">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                    <div className="title">
                        <i><img src={title} alt="#"/></i>
                        <h2>About Our Food & Restaurant</h2>
                        <span>{this.state.aboutdata[0]['short_desc']}</span>
                    </div>
                  </div>
              </div>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="about_box">
                        <h3>{this.state.aboutdata[0]['title']}</h3>
                        <p>{this.state.aboutdata[0]['description']}</p>
                        <a href="#">Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                </div>
                  <div className="col-xl-5 col-lg-5 col-md-10 col-sm-12 about_img_boxpdnt">
                    <div className="about_img">
                        <figure><img src={aboutimg+this.state.aboutdata[0]['abt_img']} alt="#/"/></figure>
                    </div>
                </div>      
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
                        <h2>About</h2>
                      
                    </div>
                  </div>
              </div>
            </div>
          </div>
        {this.about()}</div>
    );

  } 

}

export default About;
