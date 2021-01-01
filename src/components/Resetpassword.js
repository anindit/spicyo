import { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from 'axios';
import {
  Redirect 
} from "react-router-dom";

class Resetpassword extends Component {

  constructor(props){
    super(props);

    this.state = {
     
      allPost:[],
      errmsg:[],
      password: "",
      confpassword:"",
      sendmsg:'',
      postid:0,
      redirect:false,
      resetlink:''
    }
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfPassword = this.onChangeConfPassword.bind(this);

 }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      resetlink:this.props.match.params.resetlink
    });
    
  }

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

  handleSubmit = e => {
    e.preventDefault();

    const password = this.state.password;
    const confpassword=this.state.confpassword;
    const resetlink=this.state.resetlink;
    var userid=localStorage.getItem('userid');
    this.setState({
        errmsg:[]
    });
    var error=0;
  
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

    
    const reguser = { resetlink:this.state.resetlink,password: this.state.password};
    console.log(reguser)
    if(error==0)
    {    
      axios
        .post(`${window.$siteurl}/users/resetlink`, reguser)
        .then(res => {
              //  console.log(res)      
            if(res.data.status==1)
            {
                this.setState({
                    sendmsg:res.data.msg,                    
                    p_desc:'',
                    redirect:true
                    },()=>{
                        //console.log(this.state.sendmsg)
                        
                    });
            }
            else{
                this.setState({
                    sendmsg:res.data.msg,
                    p_desc:''
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
}

  
  render()
  {
    if(this.state.redirect)
    {
      return <Redirect to='/'/>;
    }
    else{
      return (
        <div>
            <div class="yellow_bg">
              <div class="container">
                <div class="row">
                    <div class="col-md-12">
                      <div class="title">
                          <h2>Reset Password</h2>                        
                      </div>
                    </div>
                </div>
              </div>
            </div> 
            
            <Form
                onSubmit={this.handleSubmit}
                method="post"
                className="main_form" style={{paddingLeft:'30%'}}
                >
               <div>{this.state.sendmsg}</div>
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
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <button className="submit">Send</button>
                    </div>
               
                {
                    this.displayErrorMessage()
                }           
            </Form>     
        </div>
          );
      }

  } 

}

export default Resetpassword;
