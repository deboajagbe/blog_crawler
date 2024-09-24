import feedparser
import schedule
import time
import json
with open('settings.json') as f:
    data = json.load(f)
    feeder = data['feeder']
    period = data['period']
    limit = data['limit']
    print('_____________________________________________________________', end='\n\n')
    print(feeder)
    print('_____________________________________________________________', end='\n\n')
    print(period)





def blog_feed(rss_feed_url):
    print('***************************************************************************************')
    print('Feeding from website...', rss_feed_url, end='\n\n')
    print('***************************************************************************************')
    feed = feedparser.parse(rss_feed_url)
    print('***************************************************************************************')
    print(f"Feed Title: {feed.feed.title}")
    print(f"Feed Description: {feed.feed.description}\n")
    print('***************************************************************************************')
    return feed


def feed_periodically():
    print("***************************************************************************************")
    print('Feeding started...', end='\n\n')
    print('***************************************************************************************')
    for url in feeder:
        try:
            blog_content = blog_feed(url)
            print('***************************************************************************************')
            print('Writing to file...', blog_content, end='\n\n')
            with open(f'blog.txt', 'w') as file:
                for blog in blog_content.entries[:limit]:
                    print('***************************************************************************************')
                    print('Writing into file for...', url, end='\n\n')
                    print('***************************************************************************************')
                    file.write('***************************************************************************************')
                    file.write('\n\n')
                    file.write(blog.title)
                    file.write('\n\n')
                    file.write(blog.description)
                    file.write('\n\n')
                    file.write(blog.link)
                    file.write('\n\n')
                    file.write(blog.published)
                    file.write('\n\n')                     
            print('***************************************************************************************')
            print('Feeding completed successfully!')
            print('***************************************************************************************')
            print(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))
            print('***************************************************************************************')
        except FileNotFoundError:
            print('***************************************************************************************')
            print('File not found!', end='\n\n')
            print('***************************************************************************************')


schedule.every(period).minutes.do(feed_periodically)

while True:
    print('***************************************************************************************')
    print('Schedule is running...')
    print('***************************************************************************************')
    schedule.run_pending()
    time.sleep(1)
