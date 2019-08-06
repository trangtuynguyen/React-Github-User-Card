import React from 'react';
import './App.css';
import axios from "axios";
import UserCard from "./components/UserCard"
import styled from "styled-components"
import { S } from 'xmlchars/xml/1.0/ed5';

const MainDiv = styled.div`
  width: 85%;
  margin: auto;
  border: 4px solid tomato;
  border-top: none;
  border-bottom: none;
`;

const SubDiv = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 1%;
`;

const Title = styled.h1`
  color: tomato;
  font-size: 1.5rem;
`;




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
      <MainDiv>
        <SubDiv><h1>Your Github Friends List</h1></SubDiv>
        <SubDiv>
          <Title>Your Profile</Title>
          <UserCard 
            username={this.state.username}
            img={this.state.img}
            repo={this.state.repo}
          />
        </SubDiv>
        <SubDiv> 
          <Title>Your Friends</Title>
          {this.state.friends.map(friend=>{

            return <UserCard
              username={friend.login}
              img={friend.avatar_url}
              repo={friend.repo}
            />

          })}
        </SubDiv>
      </MainDiv>
    )
  }

}

