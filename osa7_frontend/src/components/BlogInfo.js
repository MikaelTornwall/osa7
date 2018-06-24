import React from 'react'

const BlogInfo = ({ url, likes, like, user, validate, remove }) => {

  const deleteButton = user === false || user === validate ?
  <button onClick={remove}>Delete</button> :
  null

  return (
  <div className="blog-info">
    <a href={url}>{url}</a>
    <div>{likes} likes <button onClick={like}>Like</button></div>
    <div>Added by {user}</div>
    {deleteButton}
  </div>
)
}

export default BlogInfo
