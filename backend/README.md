# 🚀 How to Run BACKEND

Follow the steps below to set up and run the backend:

## ✅ Step 1: Create a `.env` file and paste the following inside it

### ⚠️ Note:

The values provided in the .env file are just placeholders. Make sure to replace them with your real credentials before running the project.

```
PORT="4000"  
MONGODB_URI=your_mongodb_connection_uri_here  
JWT_SECRET=your_jwt_secret_key  
CLOUDINARY_API_KEY = your_cloudinary_api_key  
CLOUDINARY_SECRET_KEY = your_cloudinary_secret_key  
CLOUDINARY_NAME = your_cloudinary_name  
STRIPE_SECRET_KEY=your_stripe_secret_key  
```

## 🔐 How to Get These Credentials

1. MONGODB_URI

    👉 Go to [MongoDB Atlas](https://www.mongodb.com/products/platform/cloud)  

    Create a cluster.

    Create a user and set a password.

    Click “Connect” → “Connect Your Application”.

    Copy the connection string like this:


```
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
```
Replace `username`, `password`, and `dbname` with your actual values.


2. CLOUDINARY Credentials

    👉 Go to [Cloudinary](https://cloudinary.com), sign up or log in.

    Go to your Dashboard.

    You'll see:-

    Cloud name → `CLOUDINARY_NAME`

    API Key → `CLOUDINARY_API_KEY`

    API Secret → `CLOUDINARY_SECRET_KEY`

3. JWT_SECRET

    This is your own secret key for signing JWT tokens.

    You can generate a random string using this site: https://generate-random.org/string

    Example:

    ```
    JWT_SECRET=akjhdgA7823hd7aBsjhfaj@#KHJ
    ```

    ### ⚠️ Note: These are sample values. Replace them with your own secure admin email and password for production use.


4. STRIPE_SECRET_KEY

    👉 Go to [Stripe](https://dashboard.stripe.com/register) and create an account.

    Go to Developers > API Keys.

    Copy the Secret Key, it will look like:

    ```
    sk_test_51Jxxxxxxx...
    ```


## ✅ Step 2: Install Dependencies in the backend
 Navigate to the  stayfinder\backend folder and run:
```
npm install
```

## ✅ Step 3: Run the Backend
```
npm run server
```

