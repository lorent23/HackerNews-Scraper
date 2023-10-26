const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeNewsletter() {
  try {
    // Replace 'newsletter_url' with the URL of the cybersecurity newsletter you want to scrape.
    const response = await axios.get('https://thehackernews.com');
    const $ = cheerio.load(response.data);

    // Modify the CSS selectors to match the structure of the newsletter's content.
    const titles = [];
    const content = [];
    const images = [];
    const urls = []; // Change 'url' to 'urls' to avoid variable name conflict

    $('.home-title').each((index, element) => {
      const title = $(element).text();
      titles.push(title);

      // Find the previous sibling 'img' tag and extract its 'src' attribute for the image URL.
      const image = $(element).prev().find('img').attr('home-img-src');
      images.push(image);
    });

    $('.home-desc').each((index, element) => {
      const desc = $(element).text();
      content.push(desc);
    });

    $('.story-link').each((index, element) => {
      const link = $(element).attr('href'); // Use .attr('href') to get the URL
      urls.push(link);
    });

    // Combine titles, content, URLs, and images into an array of objects
    const newsletterData = titles.map((title, index) => ({
      title,
      content: content[index],
      url: urls[index],
      image: images[index],
    }));

    return newsletterData;
  } catch (error) {
    throw error;
  }
}

module.exports = { scrapeNewsletter };
