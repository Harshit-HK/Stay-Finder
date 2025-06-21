# 📄 Note: 
__Please read the README.md file in each folder carefully to avoid confusion or errors — especially after filling in your credentials like MongoDB URI, Cloudinary keys, or Stripe secrets.__

## 🧑‍💻 Just Want to Try the Frontend Without Hassle? 

If you only wish to explore the frontend UI without configuring the backend & database, you can run the frontend independently — however, features like login & payments will not function.

 ## 🧠 Project overview
 
A full-stack villa/hotel/resort booking web application built with:

**Frontend** (User & Host Panels): React.js + Tailwind CSS

**Backend**: Node.js + Express.js

**Database**: MongoDB Atlas

**Image Hosting**: Cloudinary

**Authentication**: Secure host/user authentication with encrypted passwords

**Payments**: Stripe integration

**Features**: Full CRUD for listings, admin panel, and more

**Project Structure**:

`/host` – Host-side frontend

`/client` – User-side frontend

`/server` – Backend AP



# 📌 StayFinder – Full-Stack Hotel/Villa/Resort Booking Web App

**StayFinder** is a full-stack booking platform designed for customers to explore and book stays at various hotels, villas, and resorts. The application supports **multi-host functionality** allowing multiple property owners (hosts) to list their accommodations and manage bookings independently.

# 🔐 Host Panel (Frontend + Backend)

- Each host has a secure login system and can **add, edit, or delete their property listings**.

- Hosts can view their own **personalized bookings page**, where only bookings made on their properties are displayed.

- Integrated **Google Maps** for location tagging during property listing.

- Hosts have access to:

    - **A Profile page.**

    - **A Listing page** (their uploaded listings).

    - **A Bookings page** (only bookings from their listings).

# 🏡 User Panel (Frontend)

Customers can browse all available listings from all hosts on a single **homepage**.

- Powerful **search functionality** to filter by title and price etc.
 
- User can:
 
    - View listing details.
    
    - Select check-in/check-out dates.
    
    - Make bookings using the **Stripe payment gateway**.

    - View a personal **booking history page**.

# 🔐 Security & Authentication (Backend)

- Secure **authentication** for both Hosts and Users using encrypted passwords stored in MongoDB.

- Auth tokens are validated on each page load to ensure session integrity.

- Protected routes and **middleware-based token verification** implemented to guard sensitive actions like posting listings or viewing bookings.

