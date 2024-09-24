import requests
import schedule
import time
from bs4 import BeautifulSoup
import os
import json
with open('settings.json') as f:
    data = json.load(f)
    site = data['site']
    period = data['period']
    print('_____________________________________________________________', end='\n\n')
    print(site)
    print('_____________________________________________________________', end='\n\n')
    print(period)



def crawl_website(url):
    print('***************************************************************************************')
    print('Crawling website...', url, end='\n\n')
    print('***************************************************************************************')
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    blog_content = soup.find_all('div', class_='blog-content')
    print('***************************************************************************************')
    print('Website crawled successfully!', url, blog_content, end='\n\n')
    print('***************************************************************************************')
    return blog_content


def crawl_website_periodically():
    print("***************************************************************************************")
    print('Crawling started...', end='\n\n')
    print('***************************************************************************************')
    print("**********",os.path.dirname(__file__))

    for url in site:
        try:
            blog_content = crawl_website(url)
            with open(f'blog.txt', 'w') as file:
                for blog in blog_content[:5]:
                    if blog.text:
                        print('***************************************************************************************')
                        print('Writing to file...', url, end='\n\n')
                        print('***************************************************************************************')
                        file.write(blog.text)
                        file.write('\n\n')
            print('***************************************************************************************')
            print('Crawling completed successfully!')
            print('***************************************************************************************')
            print(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))
            print('***************************************************************************************')
        except FileNotFoundError:
            print('***************************************************************************************')
            print('File not found!', end='\n\n')
            print('***************************************************************************************')


schedule.every(30).seconds.do(crawl_website_periodically)
#schedule.every(24).hours.do(crawl_website_periodically)

while True:
    print('***************************************************************************************')
    print('Schedule is running...')
    print('***************************************************************************************')
    schedule.run_pending()
    time.sleep(1)



