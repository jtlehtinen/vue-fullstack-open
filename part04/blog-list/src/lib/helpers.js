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
