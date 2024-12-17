import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    print("Current Working Directory:", os.getcwd())  # Print working directory
    return render_template("index.html", name="Alice")

if __name__ == "__main__":
    app.run(debug=True, port=8000)
