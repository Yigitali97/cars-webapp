# Cars Inventory Web Application

A fully-featured web application for managing a car inventory system. This application allows users to view, add, and delete cars from a database.

## Overview

This web application provides a simple and intuitive interface for managing a car inventory. It features:

- Responsive design that works on desktop and mobile devices
- Interactive data table displaying car inventory
- Add new cars through a user-friendly modal form
- Delete cars from the inventory
- Real-time updates after any operation

## Architecture

The application consists of:

- **Frontend**: Static HTML, CSS, and JavaScript files hosted on Amazon S3
- **Backend**: RESTful API built with Flask, running on Amazon EC2 (IP: 3.35.132.211:8800)
- **Database**: Amazon RDS PostgreSQL instance storing car inventory data

## How to Run the Application

### Accessing the Deployed Application

The application is already deployed and can be accessed at:

- Frontend URL: [http://yigitali-1t.s3-website.ap-northeast-2.amazonaws.com/](http://yigitali-1t.s3-website.ap-northeast-2.amazonaws.com/)

### Running Locally

1. Clone this repository:

   ```
   git clone https://github.com/Yigitali97/cars-webapp
   cd cars-webapp
   ```

2. Set up the backend (requires Python 3.6+):

   ```
   pip install flask psycopg2-binary flask-cors
   python app.py
   ```

3. Open the `index_yigitali.html` file in your browser:

   ```
   open index_yigitali.html
   ```

4. Note: The application connects to the remote API by default. To connect to a local backend, modify the `API_URL` in `script.js` to point to `http://localhost:8800/cars`. Replace the localhost with EC2 public URL

## Project Structure

- `index_yigitali.html` - Main HTML structure of the application
- `style.css` - CSS styling for the application
- `script.js` - JavaScript code for interacting with the API and handling UI events
- `app.py` - Flask backend application providing the RESTful API endpoints and database connectivity

## Deployment Resources

- **Static Frontend**: Amazon S3

  - Bucket: yigitali-1t
  - URL: https://ap-northeast-2.console.aws.amazon.com/s3/buckets/yigitali-1t?region=ap-northeast-2&bucketType=general&tab=objects

- **Backend API**: Amazon EC2

  - Instance IP: 3.35.132.211
  - Port: 8800
  - API Endpoint: http://3.35.132.211:8800/cars

- **Database**: Amazon RDS PostgreSQL
  - Instance: db-yigitali.clyucs4e44b4.ap-northeast-2.rds.amazonaws.com
  - Database Name: postgres
  - Table: tbl_yigitali_cars_data

## API Endpoints

The backend API provides the following endpoints:

- `GET /cars` - Retrieve all cars
- `POST /cars` - Add a new car
- `DELETE /cars/:id` - Delete a car by ID

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python with Flask (hosted on EC2)
- **Database**: PostgreSQL (Amazon RDS)
- **Deployment**: AWS S3, EC2, and RDS
