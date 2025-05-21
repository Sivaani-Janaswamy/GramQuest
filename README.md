# 🚀 GramQuest: Your Social Knowledge Hub 🧠

[![Main Repo - Last Commit](https://img.shields.io/github/last-commit/Sivaani-Janaswamy/GramQuest?label=Main%20Repo)](https://github.com/Sivaani-Janaswamy/GramQuest)
[![Frontend - Last Commit](https://img.shields.io/github/last-commit/Sivaani-Janaswamy/GramQuest-Frontend?label=Frontend)](https://github.com/Sivaani-Janaswamy/GramQuest-Frontend)
[![Backend - Last Commit](https://img.shields.io/github/last-commit/Sivaani-Janaswamy/GramQuest-Backend?label=Backend)](https://github.com/Sivaani-Janaswamy/GramQuest-Backend)  
[![License](https://img.shields.io/github/license/Sivaani-Janaswamy/GramQuest)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/Sivaani-Janaswamy/GramQuest?style=social)](https://github.com/Sivaani-Janaswamy/GramQuest/stargazers)
[![Forks](https://img.shields.io/github/forks/Sivaani-Janaswamy/GramQuest?style=social)](https://github.com/Sivaani-Janaswamy/GramQuest/network/members)
[![Issues](https://img.shields.io/github/issues/Sivaani-Janaswamy/GramQuest)](https://github.com/Sivaani-Janaswamy/GramQuest/issues)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Sivaani-Janaswamy/GramQuest/node.js.yml?branch=main)](https://github.com/Sivaani-Janaswamy/GramQuest/actions)
[![Deployment](https://img.shields.io/badge/Deployed-Vercel-00C7B7?logo=vercel&logoColor=white)](https://your-vercel-link.vercel.app/)

**Unleash your curiosity and embark on a quest for knowledge!**  
GramQuest is a vibrant, open-source social platform where users can share insights, ask questions, join challenges, and connect with others who share their passion for learning. It's a social knowledge hub where people contribute what they know to help each other grow.

---

## ✨ Key Features

- **Share Your Wisdom:** Effortlessly post your knowledge, discoveries, and thoughts in engaging formats.
- **Ask and Learn:** Pose your questions to the community and receive insightful answers from fellow seekers.
- **Connect and Collaborate:** Follow users with similar interests and engage in meaningful discussions.
- **Rich Media Support:** Enhance your posts with images and other media to make your knowledge shine.
- **Intuitive Interface:** A clean and user-friendly design powered by React ensures a seamless experience.
- **Robust Backend:** Built with Node.js, Express, and MongoDB for a scalable and reliable platform.

---

## 📁 Project Structure

GramQuest is split into two repositories:

- 🔹 **Frontend:** [GramQuest-Frontend](https://github.com/Sivaani-Janaswamy/GramQuest-Frontend)
- 🔸 **Backend:** [GramQuest-Backend](https://github.com/Sivaani-Janaswamy/GramQuest-Backend)

---

## 🤝 Contributions Welcome!

We welcome all contributions — whether you're a developer, designer, tester, or someone with ideas!

- 🐛 Report bugs  
- 💡 Suggest features  
- 🧑‍💻 Submit pull requests  
- 📘 Improve documentation  
- 🎨 Contribute to UI/UX  

By participating, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 📦 Cloning This Repo with Submodules

This repository uses **Git submodules** to include the frontend and backend projects.

To clone the main project **along with its submodules**, run:

```bash
git clone https://github.com/Sivaani-Janaswamy/GramQuest.git
cd GramQuest
git submodule update --init --recursive
```

---

## 🔄 Updating Submodules

If the submodule repositories (like `gramquest-frontend` or `gramquest-backend`) have been updated and you want to fetch the latest changes inside the main repo:

```bash
# Navigate into the submodule folder
cd gramquest-frontend   # or gramquest-backend

# Pull the latest changes from its main branch
git pull origin main

# Go back to the root of the main repo
cd ..

# Add and commit the updated submodule reference
git add gramquest-frontend   # or gramquest-backend
git commit -m "Update submodule to latest commit"
git push
```

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

**Let’s learn and grow together on GramQuest!** 🚀📚
