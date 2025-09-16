from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Token & chat ID Telegram
TELEGRAM_BOT_TOKEN = "8466649370:AAHG8QZZWBP0h9LjDL60Z1XhzmhKpcEFGR0"
CHAT_ID = "7903002292"

def kirim_telegram(nama, pesan):
    text = f"Anonymous Chat\nNama: {nama}\nPesan: {pesan}"
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    requests.post(url, data={"chat_id": CHAT_ID, "text": text})

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/send", methods=["POST"])
def send():
    data = request.json
    nama = data.get("name")
    pesan = data.get("message")
    if not nama or not pesan:
        return jsonify({"status": "error", "message": "Nama dan pesan wajib diisi!"})
    kirim_telegram(nama, pesan)
    return jsonify({"status": "success", "message": "Pesan terkirim!"})

if __name__ == "__main__":
    app.run(debug=True)