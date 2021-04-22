import { Component } from 'react';
import axios from 'axios';
import {
  Redirect 
} from "react-router-dom";

class Addpost extends Component {

  constructor(props){
    super(props);

    this.state = {
     
      allPost:[],
      errmsg:[],
      p_desc: '',
      sendmsg:'',
      postid:0,
      redirect:false
    }
    //this.handleRegister = this.handleRegister.bind(this);

 }
  componentDidMount() {
    window.scrollTo(0, 0);
    
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

  handleInputChange = e => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const p_desc = this.state.p_desc;
    const postid=this.state.postid;
    var userid=localStorage.getItem('userid');
    this.setState({
        errmsg:[]
    });
    var error=0;
  
    if(p_desc ==''){
        error++;
        this.setState(prevState => ({
            errmsg: [...prevState.errmsg,'Description is required!']
        }))
    
    }

    
    const request = { userid:userid,p_desc:p_desc,postid:postid};
    console.log(request)
    if(error==0)
    {    
      axios
        .post(`${window.$siteurl}/add_post`, request)
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
      return <Redirect to='/review'/>;
    }
    else{
      return (
        <div>
            <div class="yellow_bg">
              <div class="container">
                <div class="row">
                    <div class="col-md-12">
                      <div class="title">
                          <h2>Add Review For Site</h2>                        
                      </div>
                    </div>
                </div>
              </div>
            </div> 
            <div>{this.state.sendmsg}</div>
            <form className="main_form" style={{paddingLeft:'30%'}} onSubmit={this.handleSubmit}>
                <div className="input-group">                
                  
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                        <textarea rows="5" col="10" style={{border: '1px solid #888'}} className="form-control"  onChange={this.handleInputChange} placeholder="Review" type="text" name="p_desc" >{this.state.p_desc}</textarea>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <button className="submit">Send</button>
                    </div>
                </div>  
                {
                    this.displayErrorMessage()
                }           
            </form>       
        </div>
          );
      }

  } 

}

export default Addpost;
