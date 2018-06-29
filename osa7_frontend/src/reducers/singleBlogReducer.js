import blogService from '../services/blogs'

const singleBlogReducer = (state = [], action) => {
  switch (action.type) {
  case 'FIND_ME':
    return action.data
  case 'REMOVED_BLOG':
    return action.data
  default:
    return state
  }
}

export const findBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getById(id)
    console.log('THESE ARE THE BLOGS I FOUND: ', blog)
    dispatch({
      type: 'FIND_ME',
      data: blog
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVED_BLOG',
      data: null
    })
  }
}

export default singleBlogReducer
