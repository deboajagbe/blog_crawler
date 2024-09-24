//write several test cases for webcrawler.py
import unittest
from src.webcrawler import crawl_website

class TestWebCrawler(unittest.TestCase):
    def test_crawl_website(self):
        self.assertEqual(crawl_website('https://www.boundless.com/blog'), 'blog1')
        self.assertEqual(crawl_website('https://www.uscis.gov/newsroom/all-news'), 'blog2')
        self.assertEqual(crawl_website('https://www.uscis.gov/newsroom/all-news'), 'blog3')

if __name__ == '__main__':
    unittest.main()

