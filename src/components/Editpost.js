import { Component } from 'react';
import axios from 'axios';
import {
  Redirect 
} from "react-router-dom";

class Editpost extends Component {

  constructor(props){
    super(props);

    this.state = {
     
      allPost:[],
      errmsg:[],
      p_desc: this.props.postdesc,
      sendmsg:'',
      postid:0,
      redirect:false
    }
    this.cancelPost = this.cancelPost.bind(this);

 }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      p_desc:this.props.postdesc,
  },()=>{
    
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

  handleInputChange = e => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const p_desc = this.state.p_desc;
    const postid=this.props.editid;

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
              this.props.onSelectLanguage(p_desc);
                this.setState({
                    sendmsg:res.data.msg,                    
                   
                    redirect:true
                    },()=>{
                        //console.log(this.state.sendmsg)
                        
                    });
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
}

cancelPost()
{
  
  this.setState({
    
    redirect:true
    },()=>{
        //console.log(this.state.sendmsg)
        
    });
}
  render()
  {
    if(this.state.redirect)
    {
      return <div style={{width:'80%',marginTop: '12px'}}>{this.state.p_desc}</div>;
    }
    else{
      return (
        <div>
         
            <div>{this.state.sendmsg}</div>
            <form  onSubmit={this.handleSubmit}>
              <input type="hidden" name="postid" value={this.props.editid}/>
                <div className="input-group">                
                  
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                        <textarea rows="5" col="10" style={{border: '1px solid #888'}} className="form-control"  onChange={this.handleInputChange} placeholder="Review" type="text" name="p_desc" >{this.props.postdesc}</textarea>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
                        <button className="submit">Update Post</button>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
                        <button onClick={this.cancelPost} className="submit">Cancel Post</button>
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

export default Editpost;
