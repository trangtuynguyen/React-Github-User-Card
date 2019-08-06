import React from 'react';
import './App.css';
import axios from "axios";
import UserCard from "./components/UserCard"

export default class App extends React.Component{

  constructor(){
    super();
    this.state = {
      username:null,
      img: null,
      repo: null,
      friends: []
    };
  }

  componentDidMount(){
    this.callAPI();
    this.callFriendAPI();
  }

  callAPI(){
    axios
      .get(`https://api.github.com/users/trangtuynguyen`)
      .then(data=>{
        console.log("username as axios data: ", data.data.login)
        this.setState({
          username: data.data.login,
          img: data.data.avatar_url,
          repo: data.data.public_repos
        })
      })
      .catch(error =>{console.log(error)})
  }

  callFriendAPI(){
    axios
      .get(`https://api.github.com/users/trangtuynguyen/followers`)
      .then(data=>{
        this.setState({friends: data.data})
      })
      .catch(error =>{console.log(error)})
  }


  render(){
    console.log("username render: ", this.state)
    return(
      <>
      <h1>You</h1>
      <UserCard 
        username={this.state.username}
        img={this.state.img}
        repo={this.state.repo}
      />
      <h1>Your Friends</h1>
      {this.state.friends.map(friend=>{

        return <UserCard
          username={friend.login}
          img={friend.avatar_url}
          repo={friend.repo}
        />

      })}
      </>
    )
  }

}

