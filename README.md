# MERN Bill Splitting Optimization

#### Website Link: https://dividexpert.netlify.app/
## Overview
This project aims to optimize the process of settling bills among a group of friends. It leverages the MERN (MongoDB, Express, React, Node.js) stack to create a robust and user-friendly application for splitting bills efficiently. The project utilizes priority queues (min-heap and max-heap) to calculate the optimized number of transactions required to settle debts within the group.

## Features
- User Authentication: Secure user registration and login functionality.
- Group Creation: Create and manage groups of friends for bill splitting.
- Optimized Transactions: Calculate the minimum number of transactions needed to settle debts.
- Min-Heap and Max-Heap: Utilize priority queues for efficient debt settlement calculations.
- User-friendly Interface: Intuitive and responsive UI for seamless user experience.
- Data Privacy: Ensure data privacy and security through proper authentication and authorization.

## Technology Stack
- Front-end: React.js, HTML, CSS
- Back-end: Node.js, Express.js
- Database: MongoDB
- Priority Queues: Min-Heap, Max-Heap (for debt calculations)

## Installation and Setup
1. Clone the repository: 
```bash 
    git clone https://github.com/sakshamgoel-github/divide-Xpert.git
```
2. Navigate to the project directory: 
```bash
    cd divide-Xpert
```
3. Install server dependencies: 
```bash 
    cd server && npm install
```
4. Navigate to the client directory and install dependencies:
```bash
    cd ../client && npm install
```
5. Start the server: 
```bash
    node ../server/app.js
```
6. Start the client: 
```bash
    npm run dev
```