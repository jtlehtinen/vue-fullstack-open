export function dummy(blogs) {
  return 1
}

export function totalLikes(blogs) {
  return blogs
    .map(blog => blog.likes)
    .reduce((a, b) => a + b, 0)
}
