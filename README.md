

# 🚀 GramQuest: Your Social Knowledge Hub 🧠

[](https://www.google.com/search?q=https://github.com/your-github-username/your-repo-name)
[](https://www.google.com/search?q=https://github.com/your-github-username/your-repo-name/graphs/commit-activity)
[](https://opensource.org/licenses/MIT)
[](https://github.com/sindresorhus/awesome)

**Unleash your curiosity and embark on a quest for knowledge\!** GramQuest is a vibrant, open-source social platform where users can share insights, ask questions, join challenges and connect with others who share their passion for learning. Gramquest is a social knowledge hub where users share their skills and insights with a community of like-minded individuals.

## ✨ Key Features

  * **Share Your Wisdom:** Effortlessly post your knowledge, discoveries, and thoughts in engaging formats.
  * **Ask and Learn:** Pose your questions to the community and receive insightful answers from fellow seekers.
  * **Connect and Collaborate:** Follow users with similar interests and engage in meaningful discussions.
  * **Rich Media Support:** Enhance your posts with images and other media to make your knowledge shine.
  * **Intuitive Interface:** A clean and user-friendly design powered by React ensures a seamless experience.
  * **Robust Backend:** Built with Node.js, Express, and MongoDB for a scalable and reliable platform.

## 🛠️ Prerequisites

This project is mostly for beginners who want to get into open source contributions but all users are welcome. But before you dive into contributing, make sure you have the following installed:

  * **Node.js:** Version 18.x or higher ([Download Node.js](https://nodejs.org/))
  * **npm** or **pnpm:** Your preferred Node.js package manager.
  * **MongoDB Atlas:** A connection string to a MongoDB Atlas cluster. You can either:
      * Ask a project maintainer for access.
      * Set up your own free MongoDB Atlas cluster ([MongoDB Atlas](https://www.mongodb.com/atlas/database)).

## ⚙️ Setup Instructions: Get GramQuest Running Locally

Ready to contribute? Follow these simple steps to get your local development environment up and running:

1.  **Clone the Repository:**

    ```bash
    git clone https://www.google.com/search?q=https://github.com/Sivaani-Janaswamy/GramQuest.git
    cd GramQuest
    ```

2.  **Install Backend Dependencies:**

    ```bash
    cd server
    npm install
    ```

    *Note:* This command automatically creates the `/uploads` folder for file storage and a `.gitkeep` file to ensure its presence in your Git repository, thanks to a postinstall script.

3.  **Install Frontend Dependencies:**

    ```bash
    cd client
    npm install
    ```

4.  **Configure Environment Variables (Backend):**

      * Create a `.env` file in the `/server` directory:
        ```bash
        touch server/.env
        ```
      * Open `.env` and add your MongoDB connection string and a secret key for JWT (JSON Web Tokens):
        ```
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        ```
        **Important:** Keep your `JWT_SECRET` secure\!

## 🚀 Running the Application

Now that you've set everything up, let's launch GramQuest\! Open two separate terminal windows.

**Terminal 1: Backend**

```bash
cd server
npm start
```

This will start the backend server. You should see output indicating the server is running (typically on `http://localhost:5000` or a similar port).

**Terminal 2: Frontend**

```bash
cd client
npm run dev
```

This will start the frontend development server. Usually, your browser will automatically open GramQuest (often at `http://localhost:5173`).

## 🤝 Contributing to GramQuest

We warmly welcome contributions of all kinds\! Whether you're a seasoned developer, a passionate designer, a meticulous tester, or simply have great ideas, your input is valuable. Here's how you can get involved:

  * **Reporting Bugs:** If you encounter any issues, please open a detailed bug report on our [GitHub Issues](https://www.google.com/search?q=https://github.com/your-github-username/your-repo-name/issues) page.

  * **Suggesting Enhancements:** Have a brilliant idea to make GramQuest even better? Share your suggestions as a feature request on our [GitHub Issues](https://www.google.com/search?q=https://github.com/your-github-username/your-repo-name/issues).

  * **Code Contributions:** Ready to roll up your sleeves and write some code?

    1.  Fork the repository.
    2.  Create a new branch for your feature or bug fix (`git checkout -b feature/your-awesome-feature`).
    3.  Make your changes and commit them (`git commit -m "Add your awesome feature"`).
    4.  Push your changes to your fork (`git push origin feature/your-awesome-feature`).
    5.  Submit a pull request to the main repository.

    Please follow our [Contribution Guidelines](https://www.google.com/search?q=link-to-contribution-guidelines) for code style and best practices.

  * **Documentation:** Help us improve our documentation\! Clear and concise documentation makes it easier for everyone to understand and contribute to GramQuest.

  * **Design Improvements:** Have an eye for design? We appreciate contributions that enhance the user interface and experience.

## 📄 License

GramQuest is open-source software licensed under the [MIT License](https://www.google.com/search?q=LICENSE).

## 🙏 Acknowledgements

We'd like to extend our sincere gratitude to all contributors and the open-source community for their invaluable support in making GramQuest a reality.

**Let's learn and grow together on GramQuest\!** 🚀📚
