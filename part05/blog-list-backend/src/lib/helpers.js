export function dummy(blogs) {
  return 1
}

export function totalLikes(blogs) {
  return blogs
    .map(blog => blog.likes)
    .reduce((a, b) => a + b, 0)
}

export function favoriteBlog(blogs) {
  if (blogs.length === 0) {
    return undefined
  }

  return blogs
    .reduce((fav, blog) => (blog.likes > fav.likes ? blog : fav))
}

export function mostBlogs(blogs) {
  if (blogs.length === 0) return undefined

  const authorToBlogCount = new Map()
  let maxAuthor = ''
  let maxBlogs = 0

  for (const blog of blogs) {
    const newCount = (authorToBlogCount.get(blog.author) || 0) + 1
    authorToBlogCount.set(blog.author, newCount)

    if (newCount > maxBlogs) {
      maxBlogs = newCount
      maxAuthor = blog.author
    }
  }

  return { author: maxAuthor, blogs: maxBlogs }
}

export function mostLikes(blogs) {
  if (blogs.length === 0) return undefined

  const authorToLikesCount = new Map()
  let maxAuthor = ''
  let maxLikes = -1

  for (const blog of blogs) {
    const newLikes = (authorToLikesCount.get(blog.author) || 0) + blog.likes
    authorToLikesCount.set(blog.author, newLikes)

    if (newLikes > maxLikes) {
      maxLikes = newLikes
      maxAuthor = blog.author
    }
  }

  return { author: maxAuthor, likes: maxLikes }
}
