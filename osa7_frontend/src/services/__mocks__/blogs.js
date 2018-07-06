let token = null

const blogs = [
  {
    id: "5b392b15fa9613b090a7884a",
    likes: 0,
    title: "CopyBlogger",
    author: "Brian Clark",
    url: "https://www.copyblogger.com/",
    user: {
      _id: "5b2fc1f7581f5d6dde0cabc2",
      username: "mikael",
      name: "mikael"
    },
    comment: [ ]
  },
  {
    id: "5b392c65fa9613b090a7884b",
    likes: 5,
    title: "TechCrunch",
    author: "Michael Arrington & Keith Teare",
    url: "https://techcrunch.com/",
    user: {
      _id: "5b2fc1f7581f5d6dde0cabc2",
      username: "mikael",
      name: "mikael"
    },
    comment: [
      {
        _id: "5b3990fd462d3cbd1e33d8d2",
        date: "Sun Jul 01 2018 20:42:05 GMT-0600 (CST)"
      }
    ]
  },
  {
    id: "5b392db60583b7b317bb1c9c",
    likes: 0,
    title: "Mashable",
    author: "Pete Cashmore",
    url: "https://mashable.com/",
    user: {
      _id: "5b2fc1f7581f5d6dde0cabc2",
      username: "mikael",
      name: "mikael"
    },
    comment: [ ]
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('The token is: ', token)
}

export default { getAll, setToken }
