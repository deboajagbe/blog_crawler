// Code: Feeds from the website and writes to a file
const fs = require('fs');
const parser = require('rss-url-parser')
const schedule = require('node-schedule')


const settings = require('./settings.json')
const feeder = settings.feeder
const limit = settings.limit
const period = settings.period

const blog_feed =  async (rss_feed_url) => {
    console.log('***************************************************************************************')
    console.log('Feeding from website...', rss_feed_url, '\n\n')
    console.log('***************************************************************************************')
    return await parser(rss_feed_url)
}

const feed_periodically = async () => {
    console.log("***************************************************************************************")
    console.log('Feeding started...', '\n\n')
    console.log('***************************************************************************************')
    for (const url of feeder) {
        try {
            const blog_content = await blog_feed(url)
            const file = fs.createWriteStream('blog.txt')
            for (const blog of blog_content.slice(0, limit)) {
                console.log('***************************************************************************************')
                console.log('Writing into file for...', url, '\n\n')
                console.log('***************************************************************************************')
                file.write('***************************************************************************************')
                file.write('\n\n')
                file.write(blog.title)
                file.write('\n\n')
                file.write(blog.description ? blog.description : '')
                file.write('\n\n')
                file.write(blog.link ? blog.link : '')
                file.write('\n\n')
                file.write(blog.pubDate ? blog.pubDate.toISOString() : '')
                file.write('\n\n')
            }
            console.log('***************************************************************************************')
            console.log('Feeding completed successfully!')
            console.log('***************************************************************************************')
            console.log(new Date())
            console.log('***************************************************************************************')
        } catch (error) {
            console.log('***************************************************************************************')
            console.log('File not found!', error, '\n\n')
            console.log('***************************************************************************************')
        }
    }
}
schedule.scheduleJob(`*/${period} * * * *`, feed_periodically)

module.exports = {
    blog_feed,
    feed_periodically
}

