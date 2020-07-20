import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles.css';
import axios from 'axios';
import { isLoginAdmin,isLogin,isLoginClient, refreshNav } from './Accueil';

class Navbar extends Component {


    constructor(){
        super()
        this.state={
            isLogin:false,
            isLoginAdmin:false,
            isLoginClient:false,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
    
        if (nextProps.isLogin!=this.state.isLogin || nextProps.isLoginAdmin!=this.state.isLoginAdmin 
            || nextProps.isLoginClient!=this.state.isLoginClient) {
          this.setState({
            isLogin:nextProps.isLogin,
            isLoginAdmin:nextProps.isLoginAdmin,
            isLoginClient:nextProps.isLoginClient,
          });
        }
      }
    deconnexion=()=>{
        this.setState({
            isLogin:false,
            isLoginAdmin:false,
            isLoginClient:false,
        })


        axios.get('http://localhost:8000/ticket/logout/')
        .then(res => {
         alert(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });

        window.location.reload(false);
    }
       
    

     refreshNavBar=()=> {
         this.setState({
            isLogin:isLogin,
            isLoginAdmin:isLoginAdmin,
            isLoginClient:isLoginClient,
          });
      }
    IsLogin=()=>{
        if(this.state.isLogin){
            if(this.state.isLoginAdmin){
                return(
                    <>
                        <li className="li_nav" activeClassName="main-nav">
                            <NavLink to="/Tickets">Tickets</NavLink>
                        </li>
                        <li className="li_nav" activeClassName="main-nav">
                            <NavLink to="/Staff">Administration</NavLink>
                        </li>
                        <li className="li_nav" activeClassName="main-nav">
                            <NavLink to="/Services">Services</NavLink>
                        </li>
                        <button onClick={this.deconnexion} style={{border:'none'}} >
                             <a className="navbar-brand" style={{fontSize:12,
                                color:'black',fontWeight:'bold',marginLeft:10}}>Deconnexion</a>
                        </button>
                    </>
                )
            }
            if(this.state.isLoginClient){
                return(
                    <>
                        <li className="li_nav" activeClassName="main-nav">
                            <NavLink to="/Tickets">Tickets</NavLink>
                        </li>
                        <button onClick={this.deconnexion} style={{border:'none'}} >
                             <a className="navbar-brand" style={{fontSize:12,
                                color:'black',fontWeight:'bold',marginLeft:10}}>Deconnexion</a>
                        </button>
                    </>
                )
            }
        }
        else{
            return(
                <li className="li_nav" activeClassName="main-nav">
                    <NavLink exact to="/">Accueil</NavLink>
                </li>
            )
        }
    }
    render(){
        return (
            <nav className="navbar navbar-default" id='navbar'style={{
                    
                marginTop:0,
                marginLeft:0,
                marginRight:0,
                marginBottom:0,
                height:52,
            }}>
                <div className="container-fluid">
                    <div className="navbar-header">
                    <button onClick={this.refreshNavBar} style={{marginLeft:-15,height:50,border:'none'}} >
                    <NavLink to="/Tickets" className="navbar-brand" style={{fontSize:22,
                            color:'black',fontWeight:'bold',marginLeft:10}}>TECH SUPPORT</NavLink>
                    </button>
                        
                    </div>
                    <div className="collapse navbar-collapse" 
                        id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right ul"  >
                            
                            
                            {this.IsLogin()}

                        </ul>
                    </div>
                </div>
                <div style={{
                        height:20,
                        backgroundColor:'orange',
                        marginBottom:45,
                        }}></div>
            </nav>
        );
    }
}

export default Navbar