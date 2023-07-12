import React, { Component } from 'react';
//Enable consuming REST APIs in a react app
import axios from 'axios';

//Define components as classes or functions
export default class Home extends Component{
  //The constructor for a React component is called before it is mounted.
  constructor(props){
    super(props);

    this.state={posts:[]};
  }

  //This is invoked immediately after a component is mounted
  componentDidMount(){
    this.retrivePosts();
  }

  retrivePosts(){
    axios.get('https://mern-crud-beige.vercel.app/posts').then(res=>{
      if(res.data.success){
        this.setState({posts:res.data.existingPosts});
        console.log(res.data.existingPosts);
      }
    });
  }

  onDelete = (id)=>{
    axios.delete(`https://mern-crud-beige.vercel.app/post/delete/${id}`).then((res)=>{
      alert("Delete successfully");
      this.retrivePosts();
    });
  }

  filterData(posts,searchKey){
    const result = posts.filter((post)=>
      post.topic.toLowerCase().includes(searchKey)||
      post.description.toLowerCase().includes(searchKey)||
      post.postCategory.toLowerCase().includes(searchKey)||
      post.topic.toUpperCase().includes(searchKey)||
      post.description.toUpperCase().includes(searchKey)||
      post.postCategory.toUpperCase().includes(searchKey)
    );
    //console.log(result);
    this.setState({posts:result});
  }

  handleSearchArea = (e)=>{
    const searchKey = e.currentTarget.value;
    //console.log(searchKey)
    axios.get('https://mern-crud-beige.vercel.app/posts').then(res=>{
      if(res.data.success){
        this.filterData(res.data.existingPosts,searchKey)
      }
    });
  }

  //Only required method in a class component
  //This will examine this.props and this.state and return relevant type
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-9 mt-2 mb-2'>
            <h4>All Posts</h4>
          </div>

          <div className='col-lg-3 mt-2 mb-2'>
            <input className='form-control' type='search' placeholder='Search' name='searchQuery' onChange={this.handleSearchArea}></input>
          </div>
        </div>
        
        <table className='table'>

          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Topic</th>
              <th scope='col'>Description</th>
              <th scope='col'>Post Category</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>

          <tbody>
            {this.state.posts.map((posts,index)=>(
              <tr key={index}>
                <th scope='row'>{index+1}</th>
                <td>
                    <a href={`https://mern-crud-beige.vercel.app/post/${posts._id}`} style={{textDecoration:'none'}}>
                    {posts.topic}
                    </a>
                </td>
                <td>{posts.description}</td>
                <td>{posts.postCategory}</td>
                <td>
                  <a className='btn btn-warning' href={`/edit/${posts._id}`}>
                    <i className='fas fa-edit'></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a className='btn btn-danger' href='#' onClick={()=>this.onDelete(posts._id)}>
                    <i className='fas fa-trash'></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
        
        <button className='btn btn-success'>
            <a href='/add' style={{textDecoration:'none', color:'white'}}>Create New Post</a>
        </button>

      </div>
    )
  }
}