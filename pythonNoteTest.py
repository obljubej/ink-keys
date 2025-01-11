from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import threading

app = Flask(__name__)
CORS(app)

shared_string = ""

@app.route('/get-notes', methods=['GET'])
def get_notes():
    global shared_string
    response = make_response(shared_string)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.mimetype = 'text/plain'
    return response

def run_server():
    print("Server is running on http://localhost:8080")
    app.run(host='0.0.0.0', port=8080, debug=False, use_reloader=False)

if __name__ == "__main__":
    server_thread = threading.Thread(target=run_server)
    server_thread.daemon = True
    server_thread.start()

    while True:
        new_string = input("Enter a new string: ")
        shared_string = new_string
        print("String updated!")
