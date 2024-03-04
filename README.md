

# Reserve: Bus Ticketing System

Reserve is a bus ticketing system that simplifies the process of searching, reserving, and managing bus tickets. Whether you're a traveler planning a trip or a bus operator managing bookings, Reserve has got you covered.

## Features

- **User-Friendly Interface**: Intuitive design for easy navigation.
- **Search and Book**: Search for available bus routes, view schedules, and reserve tickets seamlessly.
- **State Management with React-Redux**: Efficiently manage application state using React-Redux.
- **Front-End Development with ReactJS**: Developed the user interface using ReactJS.
- **Back-End Development with NodeJS and ExpressJS**: Built the server-side logic using NodeJS and ExpressJS.
- **Database**: Utilized MongoDB as the database for storing ticket information.
- **Payment Gateway Integration**: Integrated Stripe for secure and convenient payment processing.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/IamPiyushChauhan/Reserve.git
    ```

2. Install dependencies:

    ```bash
    cd Reserve
    cd BackEnd
    npm install
    cd..
    cd FrontEnd
    npm install
    cd..
    ```

3. Set up your environment variables (e.g., Stripe API keys, MongoDB connection string).
   
 ```bash
PORT=3000
STRIPE_PRIVATE_KEY=sk_test_your_stripe_private_key
CLIENT_URL=http://localhost:3000
```

5. Start the Backend server:

    ```bash
    cd BackEnd
    npm start
    ```
6. Start the FrontEnd server:
```bash
    cd FrontEnd
    npm start
    ```
