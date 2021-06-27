import React from 'react'
import Image from './Image';
import { Link, useHistory } from 'react-router-dom';


const PostCard = ({ post, handleDelete = (f) => f}) => {
  const history = useHistory();
  const { image, content, postedBy } = post;
  return (
     <div className="card text-center" style={{minHeight: '375px' }}>
      <div className="card-body">
        <Link to={`/post/${post._id}`}>
          <Image image={image} />
        </Link>
        <h4 className="text-primary">@{post.postedBy.username}</h4>
        <hr />
        <small>{content}</small>
      </div>
    </div>
  )
}

export default PostCard;
