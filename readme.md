Website blog crawler and feeder for the navigate summit to get the latest blog post and happening in the united state arround immigrations

To start you can update the list of websites in the setting.json file The list of the website should follow similar pathern and separeted by commas The project and blog file is setup to overide previous content (this can change later if needed)

To start the project locally Open the project in your IDE (example vs-code) Start a new terminal and navigate to the project root-folder /webcrawler run *npm install* to install the packages

To run the code *npm run start* to run the test *npm run test*

Feeder - This is fetching from a direct source using rss, which means the news can be tied to an org or gov best option

Settings

Period - Frequency of scheduler in minutes, for 24 hours that would be 24 * 60. example: "period": 3600

Site - The list of sites to crawn and scrap blog content example: "https://www.boundless.com/blog/category/immigration-news/"

Feeder - List of url to fetch RSS feed

Limit - The blog post limit, example to get the latest 5 posts: "limit": 5