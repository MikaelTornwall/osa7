import React from 'react'

const Create = ({ create, submit, title, author, url, message }) => (
  <div>
    <h3>Create new blog</h3>
    {message}
    <form onSubmit={submit}>
      <table>
        <tbody>
      <tr>
        <td>Title</td>
        <td><input
        type="text"
        name="title"
        value={title}
        onChange={create}
      /></td>
    </tr>
      <tr>
      <td>Author</td>
      <td><input
        type="text"
        name="author"
        value={author}
        onChange={create}
      />
      </td>
    </tr>
      <tr>
      <td>Url</td>
      <td><input
        type="url"
        name="url"
        value={url}
        onChange={create}
       />
     </td>
     </tr>
       <tr>
         <td></td>
       <td><input
         type="submit"
         value="Create"
       />
       </td>
     </tr>
       </tbody>
       </table>
    </form>
  </div>
)

export default Create
