import React, { useState, useContext } from "react";
import ApolloClient from 'apollo-boost'
import { gql } from 'apollo-boost'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";
import { GET_ALL_POSTS, TOTAL_POSTS } from "../graphql/queries";
import PostCard from "../components/PostCard";
import PostPagination from "../components/PostPagination";


const Home = () => {
  const [page, setPage] = useState(1)
  const { data, loading, error } = useQuery(GET_ALL_POSTS, {
    variables: {page}
  });
  const {data: postCount} = useQuery(TOTAL_POSTS)
  
  const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_POSTS);
  //access context
  const { state, dispatch } = useContext(AuthContext);

  // react router
  let history = useHistory()

  const updateUserName = () => {
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: 'Ryan Dhungel'
    });
  }

  

  if(loading) return <p className="p-5">Loading...</p>;


  return (
    <div className="container">
      <div className="row p-5">
        {data && 
          data.allPosts.map((post) => (
            <div className="col-md-6 pt-5" key={post._id}>
              <PostCard post={post}/>
            </div>
          ))
        }
      </div>
      <PostPagination page={page} setPage={setPage} postCount={postCount} />
      <hr />
      {JSON.stringify(posts)}
      <hr />
      {JSON.stringify(state.user)}
      <hr />
      <button className="btn btn-primary" onClick={updateUserName}>Change user name</button>
      <hr />
      {JSON.stringify(history)}
    </div>
  );
}

export default Home;
