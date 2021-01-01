import { Component } from 'react';
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class Recipe extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      recipelistdata:[]
     };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.fetchRecipelist();
   
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

  render()
  {
    return (
    <div>
      <div class="yellow_bg">
        <div class="container">
          <div class="row">
              <div class="col-md-12">
                <div class="title">
                    <h2>Our Recipes</h2>
                  
                </div>
              </div>
          </div>
        </div>
      </div>
      {this.recipelistall()}</div>
    );

  } 

}

export default Recipe;
