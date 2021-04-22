import { Component } from 'react';
import axios from 'axios';

import {burger_slide,rs1,rs2,rs3,rs4,rs5,title,aboutimg,blog_img1,blog_img2,blog_img3,client,client_icon} from '../static/localimages';
import OwlCarousel from 'react-owl-carousel';
import { Carousel } from 'react-responsive-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

class Index extends Component {

  constructor(props) {
    super(props);
console.log('-------props-------')
    console.log(props)
    // Don't call this.setState() here!
    this.state = { 
      recipelistdata:[],
      bannerdata:[],
      aboutdata:[],
      blogdata:[],
      clientdetailsdata:[]
     };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchRecipelist();
    this.bannerlist();
    this.aboutdeatils();
    this.blogdetails();
    this.Clientdetails();
  }

  fetchRecipelist()
  {
    
    axios
      .get(`${window.$siteurl}/recipelist`)
      .then(res => {
        console.log(res.data);
        console.log(res.data.allrecipes);
        
        if(res.data.status==1)
        {
          this.setState({
            recipelistdata:res.data.allrecipes
            });
        }
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  recipelistall(){
    console.log('++++++length++++'+this.state.recipelistdata.length)
    var imagelink=`${window.$siteurl}/recipe_images/`;
    if(this.state.recipelistdata.length>0)
    {
      return(      
          <section className="resip_section">
                <div className="container">
                    <div className="row">
                <div className="col-md-12">
              <div className="ourheading">
            <h2>Our Recipes</h2>
            </div>
            </div>    
            <div className="container">
                <div className="row">
                    <div className="col-md-12">                 
                          <OwlCarousel
                              className="owl-theme"
                              loop
                              margin={10}
                              nav
                              items="5"
                          >

                          {this.state.recipelistdata.map((recipelistsingle, index) => (
                                  <div className="item">
                                      <div className="product_blog_img">
                                          <img src={imagelink+recipelistsingle['image']} alt="#" />
                                      </div>
                                      <div className="product_blog_cont">
                                          <h3>{recipelistsingle['recipyname']}</h3>
                                          <h4><span className="theme_color">$</span>{recipelistsingle['price']}</h4>
                                      </div>
                                  </div>
                              ))}
                            
                            
                          </OwlCarousel>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </section>
      )

    }
    else{
      return null;
    }
    
  }

  bannerlist()
  {
    axios
    .get(`${window.$siteurl}/bannerlist`)
    .then(res => {
      console.log('-------banner---------');
      console.log(res.data.allbanner);
      
      if(res.data.status==1)
      {
        this.setState({
          bannerdata:res.data.allbanner
          });
      }
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }

  bannerShow()
  {
    var burger_slide=`${window.$siteurl}/banner_images/`;
    if(this.state.bannerdata.length>0)
    {
      return(    
        this.state.bannerdata.map((bannerdatasingle, index) => (  
        <div>
            <div className="row">
                <div className="col-md-5">
                    <div className="slider_cont">
                      <h3>{bannerdatasingle['title']}</h3>
                      <p>{bannerdatasingle['description']}</p>
                        
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="slider_image full text_align_center">
                        <img className="img-responsive" src={burger_slide+bannerdatasingle['banimage']} alt="#" />
                    </div>
                </div>
            </div>
        </div>
         ))
      )

    }
    else{
      return null;
    }
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
              <br/>
              <div className="col-md-12">
                <div className="title">
                  <i><img src={title} alt="#"/></i>
                  <h2>Our Blog</h2>
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

  Clientdetails()
  {
    axios
    .get(`${window.$siteurl}/clientdetails`)
    .then(res => {
      console.log(res.data);
      console.log(res.data.allclient);
      
      if(res.data.status==1)
      {
        this.setState({
          clientdetailsdata:res.data.allclient
          });
      }
    })
    .catch(error => this.setState({ error, isLoading: false }));
  }

  allClients()
  {
    var client=`${window.$siteurl}/myprofile_images/`;
    console.log('+++++++++'+this.state.clientdetailsdata.length)
    if(this.state.clientdetailsdata.length>0)
    {    
      return (
        this.state.clientdetailsdata.map((clientdetailsdatasingle, index) => ( 
        <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="Client_box">
            <img className="product_blog_img" src={client+clientdetailsdatasingle['profileimage']} alt="#"/>
            <h3>{clientdetailsdatasingle['username']}</h3>
            <p>{clientdetailsdatasingle['description']}</p>
            <i><img src={client_icon} alt="#"/></i>
          </div>
        </div>
      </div>
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
          <div className="slider_section">
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                        <Carousel>
                          {this.bannerShow()}
                        </Carousel>
                      </div>
                  </div>
              </div>
          </div>

          {this.recipelistall()}
      <div className="bg_bg">

      {this.about()}
      
      {this.allblog()}

      <div className="Client">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title">
                <i><img src={title} alt="#"/></i>
                <h2>Our Client</h2>
              </div>
            </div>
          </div>
          
          <OwlCarousel
                              className="owl-theme"
                              loop
                              margin={10}
                              nav
                              items="1"
                          >
                            {this.allClients()}
         

          </OwlCarousel>
        </div>
      </div>  
      </div>
      </div>
    );

  } 

}

export default Index;
