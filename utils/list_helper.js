const totalLikes = (blogs) => {
    var totalLikes = 0
    for (const key in blogs) {
        totalLikes += blogs[key].likes
    }

    return totalLikes
}

const favouriteBlog = (blogs) => {
    var favouriteBlogKey = 0
    for (const key in blogs) {
        if (blogs[key].likes > blogs[favouriteBlogKey].likes)
            favouriteBlogKey = key
    }

    return blogs[favouriteBlogKey]
}

const mostBlogs = (blogs) => {
    var totals = {}

    for (const key in blogs) {
        totals[blogs[key].author] = (totals[blogs[key].author] || 0) + 1
    }

    const mostProlific = Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b)

    return {author: mostProlific, blogs: totals[mostProlific]}
}

const mostLikes = (blogs) => {
    var totals = {}

    for (const key in blogs) {
        if (totals[blogs[key].author])
            totals[blogs[key].author] += blogs[key].likes
        else
            totals[blogs[key].author] = blogs[key].likes
    }

    const mostLiked = Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b)

    return {author: mostLiked, likes: totals[mostLiked]}
}

module.exports = {
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}

