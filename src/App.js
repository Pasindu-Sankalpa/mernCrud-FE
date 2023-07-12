import React, { Component } from 'react';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Home from './components/Home';
import NavBar from './components/NavBar';
import PostDetails from './components/PostDetails';

export default class App extends Component{
  render() {
    return (
    <BrowserRouter>
    <div className='container'>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/add' element={<CreatePost/>}></Route>
        <Route path='/edit/:id' element={<EditPost/>}></Route>
        <Route path='/post/:id' element={<PostDetails/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
    )
  }
}