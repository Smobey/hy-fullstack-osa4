



const totalLikes = (blogs) => {
    var totalLikes = 0
    for (const key in blogs) {
        totalLikes += blogs[key].likes
    }

    return totalLikes
}

module.exports = {
    totalLikes
}

