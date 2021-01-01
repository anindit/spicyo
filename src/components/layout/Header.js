import { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import axios from 'axios';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import phoneimage from '../../static/images/phone_icon.png';
import mailicon from '../../static/images/mail_icon.png';
import locationicon from '../../static/images/location_icon.png';
import searchicon from '../../static/images/search_icon.png';
import menuicon from '../../static/images/menu_icon.png';
import logo from '../../static/images/logo.png';
import loading from '../../static/images/loading.gif';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import $ from 'jquery';
import 'malihu-custom-scrollbar-plugin';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
require('jquery-mousewheel');
const customStyles = {  
    overlay: {
      backgroundColor: 'papayawhip'
    },
    content: {
      color: 'lightsteelblue',      
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',      
    }
  
};

class Header extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          modalIsOpen:false,
          setIsOpen:false,
          loginmodalIsOpen:false,
          loginsetIsOpen:false,
          username: "",
          email: "",
          password: "",
          confpassword:"",
          successful: false,
          message: "",
          errmsg:[],
          registermsg:'',
          stylecolor:'',
          loginmsg:'',
          loginstylecolor:'',
          loginusername:'',
          loginpassword:'',
          errloginmsg:[],
          loginbtnshow:true,
          registerbtnshow:true,
          myprofilebtnshow:false,
          profilemodalIsOpen:false,
          profileDetails:[],
          file: null,
          updateUsername:'',
          profileimagelink:`${window.$siteurl}/myprofile_images/`,
          tabIndex: 0,
          isChecked:false,
          showform:'block',
          showform2:'none',
          errmsgfrt:[],
          forgetemail:'',
          headertitle:'Login',
          latitude: null,
          longitude: null,
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfPassword = this.onChangeConfPassword.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeLoginUsername = this.onChangeLoginUsername.bind(this);
        this.onChangeLoginPassword = this.onChangeLoginPassword.bind(this);
        
        this.profilecloseModal=this.profilecloseModal.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onupdateUsername=this.onupdateUsername.bind(this);
        this.logout=this.logout.bind(this);
        this.forgetPassword_openmodal=this.forgetPassword_openmodal.bind(this);
        this.displayForgetPasswordErrorMessage=this.displayForgetPasswordErrorMessage.bind(this);
        this.handleForgetpass=this.handleForgetpass.bind(this);
        this.onChangeforgetemail=this.onChangeforgetemail.bind(this);
        this.login_openmodal=this.login_openmodal.bind(this);
     }
     componentDidMount() {
       console.log('ani')
      
    }
     forgetPassword_openmodal()
     {
        this.setState({
          showform: 'none',
          showform2:'block',
          headertitle:'Forget Password'
        });
     }
     login_openmodal()
     {
      this.setState({
        showform: 'block',
        showform2:'none',
        headertitle:'Login'
      });
     }
      componentDidMount()
      {

        var remember=localStorage.getItem('remember');
        var remember_username=localStorage.getItem('remember_username');
        var remember_password=localStorage.getItem('remember_password');
        //console.log('-----remember-----'+remember);
        //console.log('-----remember_username-----'+remember_username);
        //console.log('-----remember_password-----'+remember_password)
        if(remember)
        {
          this.setState({
            isChecked: true,
            loginusername:remember_username,
            loginpassword:remember_password
          },()=>{
            //console.log('---this.state.loginusername----'+this.state.loginusername)
            //console.log('---this.state.loginpassword----'+this.state.loginpassword)
          });
        }
        else{
          this.setState({
            isChecked: false
          });
        }
       
        Modal.setAppElement('body');
        if(localStorage.getItem('loggedin'))
        {
            console.log('==========')
            var userid=localStorage.getItem('userid');
            this.fetchProfileDetails(userid);
        }

        $("#sidebar").mCustomScrollbar({ theme: "light",
        axis:"yx",
        setHeight: 613,});
        $('#dismiss, .overlay,.clickactive').on('click', function() {
            $('#sidebar').removeClass('active');
            $('.overlay').removeClass('active');
        });

        $('#sidebarCollapse').on('click', function() {
            $('#sidebar').addClass('active');
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
        setTimeout(function () {
            $('.loader_bg').fadeToggle();
        }, 1500);
      }
      fetchProfileDetails(userid)
      {
        const profileuser = { userid:userid};
          axios.post(`${window.$siteurl}/users/myprofile`, profileuser)
          .then((response) =>{
              console.log(response)
            if(response.data.status==1)
            {
              this.setState({
                profileDetails:response.data.result,
                updateUsername:response.data.result.username
              },()=>{
                  console.log(this.state.profileDetails)
                  console.log('====='+this.state.profileDetails.profileimage)
              });
              
            }
            else{
              this.setState({
                registermsg: response.data.msg,
                stylecolor:'red'
              });
            }
          })
      }
      onupdateUsername=(e)=>{
        this.setState({
          updateUsername: e.target.value
        });
      }
      openModal=()=> {
        this.setState({setIsOpen:true,modalIsOpen:true});
      }
    
      closeModal=()=> {
        this.setState({setIsOpen:false,modalIsOpen:false});
      }
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }
      onChangeConfPassword(e) {
        this.setState({
          confpassword: e.target.value
        });
      }
    
      handleRegister(e) {
        e.preventDefault();
        this.setState({
          errmsg:[]
        });
        var error=0;
    
        if(this.state.username ==''){
          error++;
          this.setState(prevState => ({
            errmsg: [...prevState.errmsg,'Username is required!']
          }))
        
        }
       
    
        if(this.state.email =='')
        {
          error++;     
          this.setState(prevState => ({
            errmsg: [...prevState.errmsg,'Email is required!']
          }))
        }
    
        if(this.state.password =='')
        {
          error++;    
    
          this.setState(prevState => ({
            errmsg: [...prevState.errmsg,'Password is required!']
          }))
        }
    
        if(this.state.confpassword =='')
        {
          error++;
          this.setState(prevState => ({
            errmsg: [...prevState.errmsg,'Confirm Password is required!']
          }))
        }
    
        if(this.state.password !='')
        {
          if(this.state.password !=this.state.confpassword)
          {
            error++;       
            this.setState(prevState => ({
              errmsg: [...prevState.errmsg,'Password and confirm password is not matched!']
            }))
          }
    
        }
        console.log('======='+error)
        if(error==0)
        {
          const reguser = { username:this.state.username,email:this.state.email,password: this.state.password};
          console.log(reguser)
          axios.post(`${window.$siteurl}/users/register`, reguser)
          .then((response) =>{
            if(response.data.status==1)
            {
              this.setState({
                registermsg: response.data.msg,
                stylecolor:'green',
                username: "",
                email: "",
                password: "",
                confpassword:""
              });
              
            }
            else{
              this.setState({
                registermsg: response.data.msg,
                stylecolor:'red'
              });
            }
          })
        }
      
      }
      displayErrorMessage = () => {
        if(this.state.errmsg.length > 0){
          return(
            <div>
               {
                this.state.errmsg.map((item, index) => {
                  return(
                  <div key={index} style={{color:'red'}}>{item}</div>
                  )
                })}
            </div>
          )
        }
        
      }

    
    
      loginOpenModal=()=> {
        this.setState({loginsetIsOpen:true,loginmodalIsOpen:true});
      }
    
      logincloseModal=()=> {
        this.setState({loginsetIsOpen:false,loginmodalIsOpen:false});
      }
    
      onChangeLoginUsername(e) {
        this.setState({
          loginusername: e.target.value
        });
      }
     
      onChangeLoginPassword(e) {
        this.setState({
          loginpassword: e.target.value
        });
      }
    
      handleLogin(e) {
        e.preventDefault();
        this.setState({
          errloginmsg:[]
        });
        var error=0;
        
        if(this.state.loginusername ==''){
          error++;
          this.setState(prevState => ({
            errloginmsg: [...prevState.errloginmsg,'Username is required!']
          }))
        
        }   
    
        if(this.state.loginpassword =='')
        {
          error++;     
          this.setState(prevState => ({
            errloginmsg: [...prevState.errloginmsg,'Password is required!']
          }))
        }
    
        
        console.log('======='+error)
        if(error==0)
        {
          const loginuser = { username:this.state.loginusername,password: this.state.loginpassword};
          console.log(loginuser)
          axios.post(`${window.$siteurl}/users/login`, loginuser)
          .then((response) =>{
            console.log(response.data)
            if(response.data.status==1)
            {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('userid', response.data.result[0].id);
              localStorage.setItem('loggedin', true);
              //alert(this.state.isChecked)
              if(this.state.isChecked)
              {
                localStorage.setItem('remember_username',this.state.loginusername);
                localStorage.setItem('remember_password', this.state.loginpassword);
                localStorage.setItem('remember', true);
              }
              else{
                localStorage.removeItem('remember');
                localStorage.removeItem('remember_username');
                localStorage.removeItem('remember_password');
              }
              this.setState({
                loginmsg: response.data.msg,
                loginstylecolor:'green',
                loginusername: "",
                loginpassword: "",
                loginbtnshow:false,
                registerbtnshow:false,
                loginsetIsOpen:false,
                loginmodalIsOpen:false,
                myprofilebtnshow:true
              },()=>
              {
                var userid=localStorage.getItem('userid');
                this.fetchProfileDetails(userid);
              });
          
              
            }
            else{
              this.setState({
                loginmsg: response.data.msg,
                loginstylecolor:'red'
              });
            }
          })
        }
      
      }
      displayLoginErrorMessage = () => {
        if(this.state.errloginmsg.length > 0){
          return(
            <div>
               {
                this.state.errloginmsg.map((item, index) => {
                  return(
                  <div key={index} style={{color:'red'}}>{item}</div>
                  )
                })}
            </div>
          )
        }
        
      }

    
    openMyProfileModal=()=> {
      
      this.setState({profilemodalIsOpen:true});
    }
    profilecloseModal=()=> {
      this.setState({profilemodalIsOpen:false});
    }

    onFormSubmit(e){
      e.preventDefault();
      const formData = new FormData();
      formData.append('myImage',this.state.file);
      formData.append('updateusername',this.state.updateUsername);
      formData.append('userid',localStorage.getItem('userid'));
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };
      axios.post(`${window.$siteurl}/users/upload`,formData,config)
          .then((response) => {
              console.log(response)
              if(response.data.status==1)
              {
                var userid=localStorage.getItem('userid');
                this.fetchProfileDetails(userid);
                this.setState({tabIndex:0});
                
              }
             
          }).catch((error) => {
      });
  }
  onChange(e) {
      this.setState({file:e.target.files[0]});
  }
  logoutSection()
  {
      if(localStorage.getItem('loggedin'))
      {
          return(
                  <li>
                      <a className="button" onClick={this.logout} href="javascript:void(0)">Logout</a>
                  </li>
          )
      }
  }
  logout(){

      const loginuser = { userid:localStorage.getItem('userid')};
      console.log(loginuser)
      axios.post(`${window.$siteurl}/users/logout`, loginuser)
      .then((response) =>{
        console.log(response.data)
        if(response.data.status==1)
        {
          //var l=localStorage.getItem('remember');
          localStorage.removeItem('loggedin');
          localStorage.removeItem('token'); 
          localStorage.removeItem('userid'); 
         // window.localStorage.clear();
          window.location.reload()
      
          
        }
        else{
          this.setState({
            loginmsg: response.data.msg,
            loginstylecolor:'red'
          });
        }
      })
  }
  postSection()
  {
    if(localStorage.getItem('loggedin'))
    {
      return(
        <div>
            <li>
                <Link to={"/review"}>My Review</Link>
            </li>
            <li>
              <Link to={"/addreview"}>Add Review</Link>
            </li>
        </div>
               
        )
    }
  }
  onChangeCheckbox = event => {
    this.setState({
        isChecked: event.target.checked
    })
  }

  onChangeforgetemail(e) {
    this.setState({
      forgetemail: e.target.value
    });
  }

  handleForgetpass(e) {
    e.preventDefault();
    this.setState({
      errmsgfrt:[]
    });
    var error=0;
    //alert('----this.state.forgetemail----'+this.state.forgetemail)
    if(this.state.forgetemail ==''){
      error++;
      this.setState(prevState => ({
        errmsgfrt: [...prevState.errmsgfrt,'Email is required!']
      }))
    
    }   

    
    console.log('======='+error+'==forgetemail==='+this.state.forgetemail)
    if(error==0)
    {
      const forgetemail_user = { forgetemail:this.state.forgetemail};
      axios.post(`${window.$siteurl}/users/forgetpassword`, forgetemail_user)
      .then((response) =>{
        console.log(response.data)
        if(response.data.status==1)
        {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userid', response.data.result[0].id);
          localStorage.setItem('loggedin', true);
          //alert(this.state.isChecked)
          if(this.state.isChecked)
          {
            localStorage.setItem('remember_username',this.state.loginusername);
            localStorage.setItem('remember_password', this.state.loginpassword);
            localStorage.setItem('remember', true);
          }
          else{
            localStorage.removeItem('remember');
            localStorage.removeItem('remember_username');
            localStorage.removeItem('remember_password');
          }
          this.setState({
            loginmsg: response.data.msg,
            loginstylecolor:'green',
            loginusername: "",
            loginpassword: "",
            loginbtnshow:false,
            registerbtnshow:false,
            loginsetIsOpen:false,
            loginmodalIsOpen:false,
            myprofilebtnshow:true
          },()=>
          {
            var userid=localStorage.getItem('userid');
            this.fetchProfileDetails(userid);
          });
      
          
        }
        else{
          this.setState({
            loginmsg: response.data.msg,
            loginstylecolor:'red'
          });
        }
      })
    }
  
  }
  displayForgetPasswordErrorMessage= () => {
    if(this.state.errmsgfrt.length > 0){
      return(
        <div>
           {
            this.state.errmsgfrt.map((item, index) => {
              return(
              <div key={index} style={{color:'red'}}>{item}</div>
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
    if (navigator.geolocation) {
      console.log('aniaaaaaaaaa')
      navigator.geolocation.watchPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    }
    var currentLocation = window.location.pathname;
    return (
      <div>
          <div className="loader_bg">
              <div className="loader"><img src={loading} alt="" /></div>
          </div>
          <div className="wrapper">
              <div className="sidebar">
                  <nav id="sidebar">

                      <div id="dismiss">
                          <i className="fa fa-arrow-left"></i>
                      </div>

                      <ul className="list-unstyled components">

                          <li id="id1" className={(currentLocation == '/' ? 'active clickactive' : '')} onClick={this.activeClass.bind(this,1)}>
                              <Link to={"/"}>Home</Link>
                          </li>
                          {this.postSection()}
                          <li id="id2" className={(currentLocation == '/about' ? 'active clickactive' : '')} onClick={this.activeClass.bind(this,2)}>
                              <Link to={"/about"}>About</Link>
                          </li>
                          <li id="id3" className={(currentLocation == '/recipe' ? 'active clickactive' : '')} onClick={this.activeClass.bind(this,3)}>
                              <Link to={"/recipe"}>Recipe</Link>
                          </li>
                          
                          <li id="id4" className={(currentLocation == '/blog' ? 'active clickactive' : '')} onClick={this.activeClass.bind(this,4)}>
                              <Link to={"/blog"}>Blog</Link>
                          </li>
                          <li id="id5" className={(currentLocation == '/contact' ? 'active clickactive' : '')} onClick={this.activeClass.bind(this,5)}>
                              <Link to={"/contact"}>Contact us</Link>
                          </li>
                          {this.logoutSection()}
                          
                      </ul>

                  </nav>
                    
                </div>
            
              <div id="content">
                <header>
                  <div className="container-fluid">
                      <div className="row">
                          <div className="col-md-3">
                              <div className="full">
                                  <a className="logo" href={`${window.location.origin.toString()}`}><img src={logo} alt="#" /></a>
                              </div>
                          </div>
                          <div className="col-md-9">
                              <div className="full">
                                  <div className="right_header_info">
                                      <ul>
                                          <li className="dinone">Contact Us : <img style={{marginRight:15,marginLeft:15}} src={phoneimage} alt="#"/><a href="#">987-654-3210</a></li>
                                          <li className="dinone"><img style={{marginRight:15}} src={mailicon} alt="#"/><a href="#">demo@gmail.com</a></li>
                                          <li className="dinone"><img style={{marginRight:15,height:21,position:'relative',top:-2}} src={locationicon} alt="#"/><a href="#">104 New york , USA </a></li>
                                          <li className="button_user">
                                          {localStorage.getItem('loggedin')?null:<a class="button active" onClick={this.loginOpenModal} href="javascript:void(0)">Login</a>}
                                                <Modal
                                                    isOpen={this.state.loginmodalIsOpen}
                                                    
                                                    onRequestClose={this.logincloseModal}
                                                    contentLabel="Example Modal"
                                                    style={customStyles}
                                                    
                                                    >
                                            
                                                    <h2 >{this.state.headertitle}</h2>
                                                    <button onClick={this.logincloseModal}>close</button>
                                                    <div style={{'color':this.state.loginstylecolor}}>{this.state.loginmsg}</div>
                                                        <div style={{'display':this.state.showform}}>
                                                            <Form
                                                                onSubmit={this.handleLogin}
                                                                method="post"
                                                                
                                                                >
                                                            
                                                                <div>
                                                                <div className="form-group">
                                                                    <label htmlFor="loginusername">Username</label>
                                                                    <Input
                                                                    type="text"
                                                                    name="loginusername"
                                                                    value={this.state.loginusername}
                                                                    onChange={this.onChangeLoginUsername}
                                                                    />
                                                                </div>


                                                                <div className="form-group">
                                                                    <label htmlFor="password">Password</label>
                                                                    <Input
                                                                    type="password"
                                                                    name="loginpassword"
                                                                    value={this.state.loginpassword}
                                                                    onChange={this.onChangeLoginPassword}
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                  <input type="checkbox" checked={this.state.isChecked} name="lsRememberMe" onChange={this.onChangeCheckbox} />
                                                                  <label>Remember me</label>
                                                                </div>
                                                                
                                                                

                                                                <div className="form-group">
                                                                    <button className="btn btn-primary btn-block">Login</button>
                                                                </div>
                                                                </div>             
                                                            
                                                            {
                                                                this.displayLoginErrorMessage()
                                                            }
                                                        
                                                
                                                            </Form>
                                                            <div className="form-group">
                                                                <a href="javascript:void(0)" onClick={this.forgetPassword_openmodal}>Forget Password</a>
                                                            </div>
                                                        </div>
                                                        
                                                            <div style={{'display':this.state.showform2}}>
                                                                <Form
                                                                    onSubmit={this.handleForgetpass}
                                                                    method="post"
                                                                    
                                                                    >                                                                
                                                                    <div>
                                                                        <div className="form-group">
                                                                            <label htmlFor="loginusername">Email</label>
                                                                            <Input
                                                                            type="text"
                                                                            name="forgetemail"
                                                                            value={this.state.forgetemail}
                                                                            onChange={this.onChangeforgetemail}
                                                                            />
                                                                        </div>

                                                                        <div className="form-group">
                                                                            <button className="btn btn-primary btn-block">Submit</button>
                                                                        </div>
                                                                        {
                                                                              this.displayForgetPasswordErrorMessage()
                                                                        }
                                                                    </div>
                                                                  </Form>
                                                                  <div className="form-group">
                                                                      <a href="javascript:void(0)" onClick={this.login_openmodal}>Back to Login</a>
                                                                  </div>
                                                              </div>
                                                        
                                                        
                                                    </Modal>
                                                    {localStorage.getItem('loggedin')?null:<a className="button" onClick={this.openModal} href="javascript:void(0)">Register</a>}
                                                    </li>
                                              <Modal
                                                    isOpen={this.state.modalIsOpen}
                                                    
                                                    onRequestClose={this.closeModal}
                                                    contentLabel="Example Modal"
                                                    style={customStyles}
                                                    
                                                    >
                                            
                                                    <h2 >Registration</h2>
                                                    <button onClick={this.closeModal}>close</button>
                                                    <div style={{'color':this.state.stylecolor}}>{this.state.registermsg}</div>
                                                    <Form
                                                        onSubmit={this.handleRegister}
                                                        method="post"
                                                        
                                                        >
                                                            <div>
                                                            <div className="form-group">
                                                                <label htmlFor="username">Username</label>
                                                                <Input
                                                                type="text"                                                        
                                                                name="username"
                                                                value={this.state.username}
                                                                onChange={this.onChangeUsername}
                                                                />
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="email">Email</label>
                                                                <Input
                                                                type="text"
                                                                name="email"
                                                                value={this.state.email}
                                                                onChange={this.onChangeEmail}
                                                                />
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="password">Password</label>
                                                                <Input
                                                                type="password"
                                                                name="password"
                                                                value={this.state.password}
                                                                onChange={this.onChangePassword}
                                                                />
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="password">Confirm Password</label>
                                                                <Input
                                                                type="password"
                                                                name="confpassword"
                                                                value={this.state.confpassword}
                                                                onChange={this.onChangeConfPassword}
                                                                />
                                                            </div>

                                                            <div className="form-group">
                                                                <button className="btn btn-primary btn-block">Sign Up</button>
                                                            </div>
                                                            </div>
                                                        
                                                        
                                                        {
                                                            this.displayErrorMessage()
                                                        }
                                                    
                                            
                                                        </Form>
                                                    </Modal>
                                                    <li className="button_user">
                                                    {localStorage.getItem('loggedin')?<a className="button" onClick={this.openMyProfileModal} href="javascript:void(0)">My Profile</a>:null}
                                                    </li>
                                                    <Modal
                                                    isOpen={this.state.profilemodalIsOpen}
                                                    
                                                    onRequestClose={this.profilecloseModal}
                                                    contentLabel="Example Modal"
                                                    style={customStyles}
                                                    
                                                    >
                                                        <button onClick={this.profilecloseModal}>close</button>
                                                        <h2 >My profile</h2>
                                                        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                                                            <TabList>
                                                            <Tab>Profile Details</Tab>
                                                            <Tab>Profile Update</Tab>
                                                            </TabList>
                                                        
                                                            <TabPanel>
                                                                <div>Profile Image</div>
                                                                <div><img style={{'width':150,'height':150,'borderRadius':75}} src={this.state.profileimagelink+this.state.profileDetails.profileimage} alt="#" /></div>
                                                                <div>Username</div><div>{this.state.profileDetails.username}</div>
                                                                <div>Email</div><div>{this.state.profileDetails.email}</div>
                                                            </TabPanel>
                                                            <TabPanel>
                                                              <form onSubmit={this.onFormSubmit}>
                                                              <div className="form-group">
                                                                    <label htmlFor="username">Username</label>
                                                                    <input
                                                                    type="text"                                                        
                                                                    name="updateusername"
                                                                    value={this.state.updateUsername}
                                                                    onChange={this.onupdateUsername}
                                                                    />
                                                                </div>
                                                                <input type="file" name="myImage" onChange= {this.onChange} />
                                                                <button type="submit">Upload</button>
                                                              </form>
                                                            </TabPanel>
                                                        </Tabs>
                                                    </Modal>
                                                    
                                                    
                                         
                                          <li>
                                              <button type="button" id="sidebarCollapse">
                                                  <img src={menuicon} alt="#"/>
                                              </button>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </header>
              </div>
              <div className="overlay"></div>            
          </div>
      </div>
    );

  } 

}

export default Header;
