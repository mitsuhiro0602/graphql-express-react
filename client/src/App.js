import React, { useState } from "react";
import ApolloClient from 'apollo-boost'
import { gql } from 'apollo-boost'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});



const App = () => {
  const [posts, setPosts] = useState([])
  // console.log(client)
  client.query({
    query: gql`
      {
        allPosts {
          id
          title
          description
        }
      }
    `
    
  }).then(result => setPosts(result.data.allPosts));

  return (
    <div className="container">
      <div className="row p5">
        {posts.map(p => (
        <div className="col-md-4" key={p.id}>
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h4>{p.title}</h4>
              </div>
                <p className="card-text">{p.description}</p>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default App;
