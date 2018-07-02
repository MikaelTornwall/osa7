import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [ ...state, action.data ]
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE': {
    console.log('ID FOR LIKE REDUCER FUNCTION IS: ', action.id)
    const before = state.filter(blog => blog.id !== action.id)
    const after = state.find(blog => blog.id === action.id)
    return [ ...before, { ...after, likes: after.likes + 1 }]
  }
  case 'NEW_COMMENT': {
    const before = state.filter(blog => blog.id !== action.comment.blog)
    console.log('BEFORE: ', before)
    const after = state.find(blog => blog.id === action.comment.blog)
    return [ ...before, { ...after, comment: after.comment.concat(action.comment) } ]
  }
  default:
    return state
  }
}

export const create = (data) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const blogInitialization = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    console.log('blogInitialization finds these: ', blogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const blogsAfterRemove = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    const blogs = await blogService.getAll()
    console.log('THESE ARE THE BLOGS AFTER REMOVAL: ', blogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    const newLike = await blogService.update(blog)
    dispatch({
      type: 'LIKE',
      id: newLike.id
    })
  }
}

export const addComment = (comment) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(comment)
    dispatch({
      type: 'NEW_COMMENT',
      comment: newComment
    })
  }
}

export default blogReducer
