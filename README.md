🌍 Tea Blog Site 🌿
Welcome to the Tea Blog Site repository! This project is a dynamic and interactive platform where tea enthusiasts can sign up, publish blogs, and share their passion for teas from all around the world. The site is powered by Appwrite for seamless backend management and data storage.

Features

User Authentication
Sign Up: Users can create an account with their email, password, and name.
Login: Existing users can log in with their credentials.
User Session Management: Securely manage user sessions and get current user information.
Logout: Users can log out of their accounts.

Blog Management
Create Blog Post: Authenticated users can create a blog post with a title, content, featured image, and status (draft or published).
Update Blog Post: Users can edit their existing blog posts.
Delete Blog Post: Users can delete their blog posts if needed.
Fetch Single Blog Post: Retrieve the details of a specific blog post.
Fetch All Blog Posts: Get a list of all blog posts with the option to filter by status (e.g., active).

File Management
Upload File: Users can upload images for their blog posts.
Delete File: Remove uploaded images that are no longer needed.
Preview File: Get a preview of uploaded images.

Technology Stack
Appwrite: For backend services including database management, storage, and user authentication.
JavaScript/TypeScript: For handling client-side operations and interacting with Appwrite's services.
Installation and Setup

Clone the Repository:

sh
Copy code
git clone https://github.com/your-username/tea-blog-site.git
cd tea-blog-site
Install Dependencies:

sh
Copy code
npm install
Configure Appwrite:

Ensure you have an Appwrite instance running.
Update the config.js file with your Appwrite project details.
Run the Application:

sh
Copy code
npm start
Folder Structure
src/services/Service.js: Handles blog post creation, updating, deletion, and file management.
src/services/AuthService.js: Manages user authentication and session handling.
Contributing
We welcome contributions to enhance the functionality and improve the user experience of the Tea Blog Site. Please feel free to open issues and submit pull requests.

License
This project is licensed under the MIT License.
