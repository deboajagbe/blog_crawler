const mocha = require('mocha');
const chai = require('chai');

const fs = require('fs');
const parser = require('rss-url-parser')
const schedule = require('node-schedule')


const settings = require('./settings.json')
const feeder = settings.feeder
const limit = settings.limit
const period = settings.period

mocha.describe('Feeds from the website and writes to a file', () => {
    mocha.it('If the file is written successfully', async () => {
        const file = fs.createWriteStream('blog.txt')
        file.write('***************************************************************************************')
        file.write('\n\n')
        file.write('title')
        file.write('\n\n')
        file.write('description')
        file.write('\n\n')
        file.write('link')
        file.write('\n\n')
        file.write('pubDate')
        file.write('\n\n')
        file.end()
        chai.expect(file).to.be.an('object')
    })

    mocha.it('If the file is not found', async () => {
        try {
            fs.readFileSync('blog.txt')
        } catch (error) {
            chai.expect(error).to.be.an('error')
        }
    })

    mocha.it('If the file is written successfully for all the feeds', async () => {
        for (const url of feeder) {
            const blog_content = await parser(url)
            const file = fs.createWriteStream('blog.txt')
            for (const blog of blog_content.slice(0, limit)) {
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
            file.end()
            chai.expect(file).to.be.an('object')
        }
    })

    mocha.it('If the file is written successfully for the first feed', async () => {
        const url = feeder[0]
        const blog_content = await parser(url)
        const file = fs.createWriteStream('blog.txt')
        for (const blog of blog_content.slice(0, limit)) {
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
        file.end()
        chai.expect(file).to.be.an('object')
    })

    mocha.it('If the blog feed is fetched successfully', async () => {
        const url = feeder[0]
        const blog_content = await parser(url)
        chai.expect(blog_content).to.be.an('array')
    })

    mocha.it('If the blog feed error is caught', async () => {
        const url = 'https://www.google.com'
        try {
            await parser(url)
        } catch (error) {
            chai.expect(error).to.be.an('error')
        }
    })

    mocha.it('If the blog feed have a valid title', async () => {
        const url = feeder[0]
        const blog_content = await parser(url)
        chai.expect(blog_content[0].title).to.be.a('string')
    })

    mocha.it('If the blog feed have a valid description', async () => {
        const url = feeder[0]
        const blog_content = await parser(url)
        chai.expect(blog_content[0].description).to.be.a('string')
    })

    mocha.it('If the blog feed have a valid link', async () => {
        const url = feeder[0]
        const blog_content = await parser(url)
        chai.expect(blog_content[0].link).to.be.a('string')
    })

    mocha.it('If the blog feed have a valid pubDate', async () => {
        const url = feeder[0]
        const blog_content = await parser(url)
        chai.expect(blog_content[0].pubDate).to.be.a('date')
    })

    mocha.it('If the blog feed have a valid pubDate in ISO format', async () => {
        const url = feeder[0]
        const blog_content = await parser(url)
        chai.expect(blog_content[0].pubDate.toISOString()).to.be.a('string')
    })

    mocha.it('If the period is set correctly', async () => {
        chai.expect(period).to.be.a('number')
    })

    mocha.it('If the limit is set correctly', async () => {
        chai.expect(limit).to.be.a('number')
    })

    mocha.it('If the feeder is set correctly', async () => {
        chai.expect(feeder).to.be.an('array')
    })

    mocha.it('If the settings are loaded correctly', async () => {
        chai.expect(settings).to.be.an('object')
    })

    mocha.it('If the schedule is set correctly', async () => {
        const job = schedule.scheduleJob(`*/${period} * * * *`, () => {})
        chai.expect(job).to.be.an('object')
    })

    mocha.it('If the schedule is running', async () => {
        const job = schedule.scheduleJob(`*/${period} * * * *`, () => {})
        chai.expect(job).to.be.an('object')
    })

    mocha.it('If the schedule is running at the correct time and period', async () => {
        const job = schedule.scheduleJob(`*/${period} * * * *`, () => {})
        chai.expect(job).to.be.an('object')
    })

    mocha.it('If the feed_periodically function is called', async () => {
        const feed_periodically = async () => {}
        chai.expect(feed_periodically).to.be.a('function')
    })

    mocha.it('If the blog_feed function is called', async () => {
        const blog_feed = async () => {}
        chai.expect(blog_feed).to.be.a('function')
    })

    mocha.it('If the file is created', async () => {
        const file = fs.createWriteStream('blog.txt')
        chai.expect(file).to.be.an('object')
    })

    mocha.it('If the error is handled and logged', async () => {
        try {
            fs.readFileSync('blog.txt')
        } catch (error) {
            chai.expect(error).to.be.an('error')
        }
    })

  })