import React, {Component} from 'react';
import Modal from 'react-modal';
import '../styles.css';
import image from '../images/friends.png';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import {Redirect} from "react-router-dom";
        
export var isLogin=false
export var isLoginAdmin=false
export var isLoginClient=false
export var utilisateur='asa'
export var password='10022000a'
export var refreshNav=true

export class Accueil extends Component {

    constructor(){
        super()
        this.state={
            modalVisible:false,
            isLoginClient:false,
            isLoginAdmin:false,
            isLogin:false,
            isAdmin:false,
            username:'',
            password:'',
            nomClient:'cardoun07',
            passwordClient:'cardoun07',
            nomAdmin:'steven07',
            passwordAdmin:'steven07',
        }
    }

    onChangeNom = (event) => {
        this.setState({username: event.target.value});
        console.log('Nom ',event.target.value)
      }
      onChangePassword = (event) => {
        event.preventDefault();
        this.setState({password: event.target.value});
        console.log('password ',event.target.value)
      }
        
    isLoginAdmin=(event)=>{
        this.setState({modalVisible:false})
        event.preventDefault();
       
          let AuthInfos={
              'username' : this.state.username,
              'password': this.state.password,
          };
          axios.post('http://localhost:8000/ticket/login/', AuthInfos)
          .then(res => {
            console.log('res ',res);
            console.log('res ',res.data);
            if(res.data['state']==='success'){
                isLogin=true
                isLoginAdmin=true
                this.setState({redirect:true})
            }
            else{
                alert('echec de connexion')
            }
            
          })
          .catch(err => console.log(err));
    }
    isLoginClient=(event)=>{
        this.setState({modalVisible:false})
        event.preventDefault();
        let AuthInfos={
            'username' : this.state.username,
            'password': this.state.password,
        };
        
        axios.post('http://localhost:8000/ticket/loginClient/', AuthInfos)
        .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data['state']==='success'){
                    utilisateur=this.state.username
                    password=this.state.password
                    isLogin=true
                    isLoginClient=true
                this.setState({redirect:true})
            }
            else{
                alert('echec de connexion')
            }
          
        })
        .catch(err => console.log(err));
    }

    contentModal(){
        if(this.state.isAdmin){
            return(
                <div>
                <h3 style={{textAlign:'center',color:'black',fontWeight:'bold'}}>Connexion Admin</h3>
                    <form  onSubmit={this.isLoginAdmin} className="needs-validation">
                        
                            <div className='col-md-12' style={{marginTop:50, marginLeft:'8%'}}>
                                <input type='text' placeholder ='Nom' className ="form-control" name='Nom'
                                onChange={this.onChangeNom} required />
                            </div>
                            <div className='col-md-12'style={{marginTop:20, marginLeft:'8%',marginBottom:50}}>
                                <input type='password' placeholder ='Mot de passe' className ="form-control" name='Password'
                                onChange={this.onChangePassword} required />
                            </div>
                       
                        <div style={{marginLeft:'25%'}}>
                            

                        <input type="submit" className="btn btn-primary" value="Se connecter" />
                            <button style={{marginLeft:10}} onClick={()=>this.setState({modalVisible:false})} 
                                className="btn btn-danger">Annuler</button>
                        </div>
                    </form>
                </div>

            )
        }else{
            return(
                <div>
                <h3 style={{textAlign:'center',color:'black',fontWeight:'bold'}}>Connexion Client</h3>
                    <form onSubmit={this.isLoginClient} className="needs-validation">
                        
                            <div className='col-md-12' style={{marginTop:50, marginLeft:'8%'}}>
                                <input type='text' placeholder ='Nom' className ="form-control" name='Nom'
                                onChange={this.onChangeNom} required />
                            </div>
                            <div className='col-md-12'style={{marginTop:20, marginLeft:'8%',marginBottom:50}}>
                                <input type='password' placeholder ='Mot de passe' className ="form-control" name='Password'
                                onChange={this.onChangePassword} required />
                            </div>
                       
                        <div style={{marginLeft:'25%'}}>
                            <input type="submit" className="btn btn-primary" value="Se connecter" />
                            <button style={{marginLeft:10}} onClick={()=>this.setState({modalVisible:false})} 
                                className="btn btn-danger">Annuler</button>
                        </div>
                    </form>
                </div>

            )
        }
    }

    ShowModal(){
    
        return(
            <div className='main'>
                <Modal isOpen={this.state.modalVisible} closeTimeoutMS={500} contentLabel="modal"
                    style={{
                        overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)'
                        },
                        content: {
                        position: 'absolute',
                        top: '120px',
                        left: '38%',
                        right: '38%',
                        bottom: '120px',
                        border: '1px solid black',
                        background: '#E0E0E0',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '10px',
                        outline: 'none',
                        padding: '0px'
                        }
                    }}>
                    
                    {this.contentModal()}

                </Modal>
    
            </div>
        )
    }


    render(){
        if(this.state.redirect===true){
            return <Redirect to="Tickets/"/>
        }
        return(

          <div style={{backgroundColor:'black'}}>
            <Box display="flex" flexDirection="row" p={1} m={1} style={{height:500, marginTop:50}}
                bgcolor="background.paper" justifyContent='center'>
                <Box p={1} bgcolor="grey.300" style={{width:200,marginRight:50, borderRadius:10}}>
                    <Box style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:16, 
                        marginTop:20, marginBottom:20}}>NIVEAU DE SERVICE </Box>
                    <Box style={{textAlign:"center"}}>Decrivez juste votre problème lors de la création du ticket et notre système 
                        s'occupera du reste, vous laissant sans souci</Box>

                    <Box style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:16, 
                        marginTop:50, marginBottom:20}}>FILTRAGE DE TICKETS </Box>
                    <Box style={{textAlign:"center"}}>Notre puissant système de filtrage
                        des billets garantit que les bons billets sont acheminés au bon service, 
                        vous laissant un environnement sans encombrement</Box>
                </Box>
                <Box p={1} bgcolor="white" style={{width:300, marginRight:50, borderRadius:10}}>
                    <Box display="flex" flexDirection="row" p={1} m={1} style={{marginBottom:40}}
                        bgcolor="background.paper" justifyContent='space-between'>
                        <Box p={1}>
                        <button style={{ marginLeft:50,height:50, width:200}} onClick={
                            ()=>this.setState({ modalVisible:true,isAdmin:false})} 
                            className="btn btn-warning">Client</button>
                        </Box>
                        <Box p={1}>
                        <button style={{marginLeft:30,height:50, width:200, }} onClick={
                            ()=>this.setState({ modalVisible:true, isAdmin:true})} 
                            className="btn btn-warning">Administrateur</button>
                        </Box>


                       



                    </Box>
                    <div style={{height:200, marginLeft:100}}>
                        <img src={image}></img>
                    </div>
                </Box>
                <Box p={1} bgcolor="grey.300" style={{width:200, marginLeft:300, borderRadius:10}}>
                    <Box style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:16, 
                        marginTop:20, marginBottom:20}}>PORTAIL DE SUPPORT CLIENT </Box>
                    <Box style={{textAlign:"center"}}>Système de portail de support client robuste
                        pour aider votre entreprise à maintenir de bonnes relations avec les clients</Box>

                    <Box style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:16, 
                        marginTop:50, marginBottom:20}}>ET BEAUCOUP PLUS! </Box>
                    <Box style={{textAlign:"center"}}>Tech Support est livré avec des tonnes de 
                        fonctionnalités impressionnantes que vous devez essayer vous-même</Box>
                </Box>
            </Box>

                {this.ShowModal()}
        </div> 
       
        );
    }
}

 