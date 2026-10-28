# 🔐 CryptoApp

**A secure, web-based encryption and hashing tool utilizing AES and SHA algorithms.**

![Python](https://img.shields.io/badge/Language-Python_3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Streamlit](https://img.shields.io/badge/Framework-Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)
![Security](https://img.shields.io/badge/Security-AES_%2F_SHA-000000?style=for-the-badge)
![Live Site](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)

## 🚀 About The Project

**CryptoApp** is an interactive web application designed to make cryptographic concepts accessible and easy to use. Built with Python and the **Streamlit** framework, it provides a clean, graphical interface for encrypting data and generating cryptographic hashes without needing to use the command line.

Whether you need to securely scramble a secret message using a password (AES) or verify data integrity by generating an irreversible checksum (SHA), CryptoApp handles the math in the background.

🌐 **Try it live here:** [CryptoApp on Streamlit](https://cryptoapp-miniowa.streamlit.app/)

## ✨ Key Features

### 🛡️ Symmetric Encryption (AES)
* **Advanced Encryption Standard:** Fast and secure encryption for texts or data using a single secret key/password.
* **Two-Way Process:** Easily encrypt your plaintext and decrypt the resulting ciphertext back to its original form, provided you have the correct key.

### #️⃣ Cryptographic Hashing (SHA)
* **Secure Hash Algorithm:** Generate fixed-size, unique hash values for your input text.
* **One-Way Function:** Demonstrates the irreversible nature of hashing—ideal for securely storing passwords or verifying data integrity (checksums).

### 🖥️ User Experience
* **No Installation Required:** As a Streamlit cloud app, it runs entirely in your browser.
* **Intuitive UI:** Clear inputs, sidebars for navigation, and instant visual feedback for your cryptographic operations.
* **Data Privacy:** Operations are performed in memory, ensuring your sensitive plaintexts and keys aren't permanently stored.

## 🏗️ Architecture & Tech Stack

* **Language:** Python
* **Web Framework:** [Streamlit](https://streamlit.io/)
* **Cryptography Libraries:** Built with standard libraries (e.g., `hashlib`, `cryptography` or `PyCryptodome`).
* **Deployment:** Streamlit Community Cloud.

## 📥 Installation & Running Locally

If you prefer to run the encryption tool entirely offline on your own machine for maximum security:

### Prerequisites
* Python 3.8 or higher.

### Build Steps
```bash
# 1. Clone the repository
git clone https://github.com/yourusername/cryptoapp.git
cd cryptoapp

# 2. Install the required dependencies
pip install -r requirements.txt

# 3. Run the Streamlit app
streamlit run app.py
```
*(The app will open automatically in your browser at `http://localhost:8501`)*

## ⚠️ Disclaimer

*This application is built for educational and practical purposes. Always ensure you are using up-to-date cryptographic libraries and standard practices when handling highly sensitive real-world data.*

## 🖼️ Gallery
<img width="1920" height="942" alt="1" src="https://github.com/user-attachments/assets/b142cece-ba36-4a9e-9af8-75b01b7226b1" />
<img width="1920" height="949" alt="image" src="https://github.com/user-attachments/assets/e997e88c-93c9-4506-b5ca-13b76735221d" />

