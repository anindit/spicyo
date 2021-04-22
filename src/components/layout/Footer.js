import { Component } from 'react';
import axios from 'axios';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams 
  } from "react-router-dom";
  import $ from 'jquery';
import {img,logo1} from '../../static/localimages';

class Footer extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { 
            fname:'',
            femail:'',
            fphone:'',
            fmessage:'',
            sendmsg:'',
            errmsg:[],
            subsemail:'',
            errsubsmsg:[],
            sendmsgsubs:'',
            nameerr:'',
            emailerr:'',
            phoneerr:''
         };

         
      }

    componentDidMount()
    {
       
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleInputChangeSubs=e=>{
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmitSubscribe = e => {
        e.preventDefault();

        const { subsemail } = this.state;

        this.setState({
            errsubsmsg:[],
            
        });
        var error=0;
      
        if(subsemail ==''){
            error++;
            this.setState(prevState => ({
                errsubsmsg: [...prevState.errsubsmsg,'Subscription email is required!']
            }))
        
        }

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (subsemail !='' && !pattern.test(subsemail)) {
            error++;
            this.setState(prevState => ({
                errsubsmsg: [...prevState.errsubsmsg,'Enter a valid Email!']
            }))
        }

        const request = {
            subsemail
        };
        console.log(request)
        if(error==0)
        {    
        axios
            .post(`${window.$siteurl}/subscribe_email`, request)
            .then(res => {
                    console.log(res)      
                if(res.data.status==1)
                {
                    this.setState({
                        sendmsgsubs:res.data.msg,
                        subsemail:''
                        },()=>{
                            console.log(this.state.sendmsgsubs)
                        });
                }
                else{
                    this.setState({
                        sendmsgsubs:res.data.msg,
                        subsemail:''
                        },()=>{
                            console.log(this.state.sendmsgsubs)
                        });
                }

                setTimeout(
                    () => this.setState({ sendmsgsubs: '' }), 
                    3000
                );
            })
            .catch(error => this.setState({ error, isLoading: false }));
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        const { fname, femail, fphone,fmessage } = this.state;

        this.setState({
            errmsg:[],
            nameerr:'',
            emailerr:'',
            phoneerr:''
        });
        var error=0;
      
        if(fname ==''){
            error++;
            this.setState(prevState => ({
                nameerr: 'Name is required!'
            }))
        
        }

        if(femail ==''){
            error++;
            this.setState(prevState => ({
                emailerr: 'Email is required!'
            }))
        
        }

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (femail !='' && !pattern.test(femail)) {
            error++;
            this.setState(prevState => ({
                emailerr: 'Enter a valid Email!'
            }))
        }

        if(fphone ==''){
            error++;
            this.setState(prevState => ({
                phoneerr: 'Phone is required!'
            }))
        
        }

        const request = {
            fname,
            femail,
            fphone,
            fmessage
        };
        console.log(request)
    if(error==0)
    {    
        axios
            .post(`${window.$siteurl}/create_request`, request)
            .then(res => {
                    console.log(res)      
                if(res.data.status==1)
                {
                    this.setState({
                        sendmsg:res.data.msg,
                        fname:'',
                        femail:'',
                        fphone:'',
                        fmessage:'',
                        nameerr:'',
                        emailerr:'',
                        phoneerr:''
                        },()=>{
                            console.log(this.state.sendmsg)
                        });
                }
                else{
                    this.setState({
                        sendmsg:res.data.msg,
                        fname:'',
                        femail:'',
                        fphone:'',
                        fmessage:'',
                        nameerr:'',
                        emailerr:'',
                        phoneerr:''
                        },()=>{
                            console.log(this.state.sendmsg)
                        });
                }

                setTimeout(
                    () => this.setState({ sendmsg: '' }), 
                    3000
                );
            })
            .catch(error => this.setState({ error, isLoading: false }));
        }
    };

    displayErrorMessage = () => {
        if(this.state.errmsg.length > 0){
          return(
            <div>
               {
                this.state.errmsg.map((item, index) => {
                  return(
                  <div key={index} style={{'color':'red'}}>{item}</div>
                  )
                })}
            </div>
          )
        }
        
      }

    displaySubsErrorMessage= () => {
        if(this.state.errsubsmsg.length > 0){
            return(
            <div>
                {
                this.state.errsubsmsg.map((item, index) => {
                    return(
                    <div key={index} style={{'color':'red'}}>{item}</div>
                    )
                })}
            </div>
            )
        }
    
    }

  
    activeClass(num)
    {
      console.log(num);
      $('#id1').removeClass('active');
      $('#id2').removeClass('active');
      $('#id3').removeClass('active');
      $('#id4').removeClass('active');
      $('#id5').removeClass('active');
      $('#ids1').removeClass('active');
      $('#ids2').removeClass('active');
      $('#ids3').removeClass('active');
      $('#ids4').removeClass('active');
      $('#ids5').removeClass('active');
      $('#id'+num).addClass('active');
      $('#ids'+num).addClass('active');
      $('#sidebar').removeClass('active');
              $('.overlay').removeClass('active');
    }
  render()
  {
    var currentLocation = window.location.pathname;
  
    return (
    <footer>
        
      <div className="footer">
          <div className="container-fluid">
              <div className="row">
                <div className=" col-md-12">
                  <h2>Request  A<strong className="white"> Call  Back</strong></h2>
                </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    
                      <form className="main_form" onSubmit={this.handleSubmit}>
                      <div>{this.state.sendmsg}</div>
                          <div className="row">
                           
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <input className="form-control" placeholder="Name" type="text" value={this.state.fname} name="fname" onChange={this.handleInputChange}/>
                                    <div style={{'color':'red'}}>{this.state.nameerr}</div>
                              </div>
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <input className="form-control" placeholder="Email" type="text" value={this.state.femail} name="femail" onChange={this.handleInputChange}/>
                                  <div style={{'color':'red'}}>{this.state.emailerr}</div>
                              </div>
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <input className="form-control" placeholder="Phone" type="text" value={this.state.fphone} name="fphone" onChange={this.handleInputChange}/>
                                  <div style={{'color':'red'}}>{this.state.phoneerr}</div>
                              </div>
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <textarea className="textarea" placeholder="Message" type="text" name="fmessage" onChange={this.handleInputChange}>{this.state.fmessage}</textarea>
                              </div>
                              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <button className="send">Send</button>
                              </div>
                          </div>
                          {
                                this.displayErrorMessage()
                            }
                      </form>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="img-box">
                          <figure><img src={img} alt="img" /></figure>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-12">
                      <div className="footer_logo">
                        <a className="index.html"><img src={logo1} alt="logo" /></a>
                      </div>
                  </div>
                  <div className="col-md-12">
                     
                      <ul className="lik">
                      
                          <li onClick={this.activeClass.bind(this,1)} id="ids1" className={(currentLocation == '/' ? 'active' : '')}> <Link to={"/"}>Home</Link></li>
                         
                          <li onClick={this.activeClass.bind(this,2)} id="ids2" className={(currentLocation == '/about' ? 'active' : '')}> <Link to='/about'>About</Link></li>
                          <li onClick={this.activeClass.bind(this,3)} id="ids3" className={(currentLocation == '/recipe' ? 'active' : '')}> <Link to='/recipe'>Recipe</Link> </li>
                          <li onClick={this.activeClass.bind(this,4)} id="ids4" className={(currentLocation == '/blog' ? 'active' : '')}> <Link to='/blog'>Blog</Link></li>
                          <li onClick={this.activeClass.bind(this,5)} id="ids5" className={(currentLocation == '/contact' ? 'active' : '')}> <Link to='/contact'>Contact us</Link> </li>
                      </ul>
                  </div>
                  <div className="col-md-12">
                      <div className="new">
                          <h3>Newsletter</h3>
                          <div>{this.state.sendmsgsubs}</div>
                          <form className="newtetter" onSubmit={this.handleSubmitSubscribe}>
                              <input className="tetter" placeholder="Your email" type="text" value={this.state.subsemail} name="subsemail" onChange={this.handleInputChangeSubs}/>
                              <button className="submit">Subscribe</button>
                              
                          </form>
                      </div>
                  </div>
              </div>
          </div>
          <div className="copyright">
              <div className="container">
                  <p>© 2021 All Rights Reserved at Spicyo</p>
              </div>
          </div>
      </div>
  </footer>
    );

  } 

}

export default Footer;
