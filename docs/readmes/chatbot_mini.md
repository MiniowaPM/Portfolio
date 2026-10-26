# 🤖 E.D.E.K. (Experimental Message Emitting Advisor)

**A lightweight, modern Question-Answering chatbot powered by Semantic Search.**

![PHP](https://img.shields.io/badge/Frontend-PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Flask](https://img.shields.io/badge/Backend-Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![AI](https://img.shields.io/badge/AI-Sentence_Transformers-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🚀 About The Project

**E.D.E.K.** *(Eksperymentalny Doradca Emitujący Komunikaty)* is a lightweight and modern Question-Answering chatbot. It bridges the gap between advanced NLP technologies and simple web integration. 

The project is a hybrid system combining a highly efficient Python-based AI backend with a minimalist, responsive frontend built in PHP, HTML, and CSS. Instead of relying on exact keyword matches, E.D.E.K. understands the *meaning* of your questions to deliver accurate answers.

## ✨ Key Features

### 🧠 Semantic Search Engine
* **Vector Analysis:** User questions are instantly converted into numerical vectors using the robust `paraphrase-multilingual-MiniLM-L12-v2` model.
* **Cosine Similarity:** The system calculates the mathematical similarity between the user's prompt and the pre-existing database.
* **Intelligent Threshold:** If the match confidence exceeds the defined threshold (`> 0.5`), E.D.E.K. serves the most relevant answer.

### ⚡ Data Pipeline ("Bake Mode")
* **Zero Cold Starts:** Includes a built-in `bake_mode.py` module that pre-computes ("bakes") your JSON knowledge base into numerical vectors (`.npy`). This allows the bot to boot up instantly without recalculating data on every restart.

### 🎨 Minimalist Frontend
* **Asynchronous UX:** Smooth, reload-free communication with the backend via `fetch` API.
* **Theme Support:** Built-in Light/Dark mode that automatically saves user preferences to `localStorage`.

## 🏗️ Architecture & Tech Stack

The system is neatly divided into a web interface and an AI processing server.

### Frontend
* **Tech:** PHP (`index.php`), HTML5, CSS3 (`style.css`), Vanilla JS (`script.js`)
* **Deployment:** Any standard web server (e.g., XAMPP, WAMP, Apache).

### Backend & AI
* **Framework:** Flask (Python)
* **AI Libraries:** `sentence-transformers`, `scikit-learn`, `numpy`
* **Functionality:** Exposes an `/ask` endpoint that accepts queries and returns JSON responses.

## 🔮 Roadmap (Future Plans)

* **Generative Fallback:** Integrating an LLM API (like OpenAI or DeepSeek) to answer questions outside the predefined dataset.
* **Typing Indicators:** Adding visual "bot is typing..." animations to the frontend for a more natural UX.
* **Admin Panel:** A web GUI to easily add and edit questions in the knowledge base without touching JSON files.

## 📥 Installation & Setup

### Prerequisites
* Python 3.8+
* Local PHP Server (e.g., XAMPP, WAMP)

### 1. Backend & AI Setup
Install the required Python libraries:
```bash
pip install flask sentence-transformers scikit-learn numpy
```

### 2. Prepare the Knowledge Base
1. Create your dataset in a JSON file (e.g., `baza_wiedzy.json` or `model_dataset.json`) using this format:
   ```json
   {"Question?": "Answer."}
   ```
2. Run the preparation script to "bake" the vectors:
```bash
python bake_mode.py
```
*Note: This will generate a compiled `upieczone_wektory.npy` file.*

### 3. Run the System
**Start the Backend:**
```bash
python main.py
```
*(The Flask server will start, typically on port `5050`)*

**Start the Frontend:**
Move your frontend files to your PHP server's public directory (e.g., `htdocs` in XAMPP). Ensure the `fetch` URL in your `index.php` or `script.js` points to the correct backend port (`http://localhost:5050/ask`).

## ❓ Example Questions to Try

Once running, try asking the bot:
* *"What is your name?"*
* *"Can you program?"*
* *"Who created you?"*
* *"Tell me about steam engines."* *(Assuming you imported a SQuAD-style dataset)*

## 📋 Technical Notes

* **Updating Knowledge:** To teach the bot new things, simply edit your JSON dataset and re-run `bake_mode.py`.
* **Port Conflicts:** If port `5050` is in use on your machine, change it in both `main.py` and the frontend `fetch` request.
* **Active Background:** The chatbot requires the Flask backend to be actively running in the background to serve answers.

## 🖼️ Gallery
<img width="1920" height="949" alt="3" src="https://github.com/user-attachments/assets/e61ce8ef-b3df-40db-a237-4769d0e295b9" />
<img width="1920" height="950" alt="1" src="https://github.com/user-attachments/assets/b28ad628-18f3-4270-8547-2d2b27ef3533" />
<img width="1920" height="943" alt="2" src="https://github.com/user-attachments/assets/e2d674fb-19a3-46ec-ab7b-72a117936f5e" />
