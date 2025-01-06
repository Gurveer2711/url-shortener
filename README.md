# URL Shortener

This is a simple URL shortener service built with Node.js and Express.

## Features

- Shorten long URLs
- Redirect to original URL using the shortened link
- Track the number of times a shortened URL is accessed

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/url-shortener.git
   ```
2. Navigate to the project directory:
   ```sh
   cd url-shortener
   ```
3. Install dependencies:
   ```sh
   npm install express nodemon mongoose nanoid
   ```

## Usage

1. Start the server:
   ```sh
   npm start
   ```
2. Open your browser and go to `http://localhost:3000`

## API Endpoints

-POST / - Shorten a long URL
-GET /:shortUrl - Redirect to the original URL
-PUT /:shortUrl - Update the shortened URL
-DELETE /:shortUrl - Delete the shortened URL
