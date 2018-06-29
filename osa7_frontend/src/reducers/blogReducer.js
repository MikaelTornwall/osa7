import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
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

export default blogReducer
