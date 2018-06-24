let token = null

const blogs = [
    {
    id: "5b067f2ded8ffd1d24a0a8f2",
    likes: 9,
    title: "Käyttäjä lisää blogin",
    author: "test",
    url: "test_url",
    user: {
      _id: "5b066b22dbe9dd18f3d15b97",
      username: "test",
      name: "test"
    }
},
  {
    id: "5b0680a61c5c271d66d41530",
    likes: 11,
    title: "Käyttäjä lisää vielä toisen blogin",
    author: "test 2",
    url: "test_url_2",
    user: {
      _id: "5b066b22dbe9dd18f3d15b97",
      username: "test",
      name: "test"
    }
  },
  {
    id: "5b077c3e2e8bb82870070511",
    likes: 4,
    title: "Jamin eka blogi",
    author: "Jami",
    url: "http://www.jaminkotisivu.fi/",
    user: {
      _id: "5b07744a5997f8272fa87299",
      username: "jami",
      name: "jami"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('The token is: ', token)
}

export default { getAll, blogs, setToken }
