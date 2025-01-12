# # from flask import Flask, request, jsonify, make_response
# # from flask_cors import CORS
# # import threading

# # app = Flask(__name__)
# # CORS(app)

# # shared_string = ""

# # @app.route('/get-notes', methods=['GET'])
# # def get_notes():
# #     global shared_string
# #     response = make_response(shared_string)
# #     response.headers['Access-Control-Allow-Origin'] = '*'
# #     response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
# #     response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
# #     response.mimetype = 'text/plain'
# #     return response

# # #python pythonNoteTest.py

# # def run_server():
# #     print("Server is running on http://localhost:8080")
# #     app.run(host='0.0.0.0', port=8080, debug=False, use_reloader=False)

# # if __name__ == "__main__":
# #     server_thread = threading.Thread(target=run_server)
# #     server_thread.daemon = True
# #     server_thread.start()

# #     while True:
# #         new_string = input("Enter a new string: ")
# #         shared_string = new_string
# #         print("String updated!")


# from flask import Flask, request, jsonify, make_response, Response
# from flask_cors import CORS
# import threading
# import time

# app = Flask(__name__)
# CORS(app)

# shared_string = ""  # Shared string to store the notes

# # SSE endpoint to stream notes to the frontend
# @app.route('/stream-notes')
# def stream_notes():
#     def generate():
#         global shared_string
#         while True:
#             if shared_string:
#                 yield f"data: {shared_string}\n\n"  # Stream data as SSE format
#             time.sleep(1)  # Simulate a delay, adjust as necessary
#     return Response(generate(), mimetype='text/event-stream')

# # Regular GET endpoint to fetch the current notes (if needed)
# @app.route('/get-notes', methods=['GET'])
# def get_notes():
#     global shared_string
#     return shared_string

# # Running the server in a separate thread
# def run_server():
#     print("Server is running on http://localhost:8080")
#     app.run(host='0.0.0.0', port=8080, debug=False, use_reloader=False)

# if __name__ == "__main__":
#     server_thread = threading.Thread(target=run_server)
#     server_thread.daemon = True
#     server_thread.start()

#     # Accept user input to update the shared string
#     while True:
#         new_string = input("Enter a new string: ")
#         shared_string = new_string
#         print("String updated!")






from flask import Flask, Response, request
from flask_cors import CORS
import threading
import time

app = Flask(__name__)
CORS(app)

shared_string = ""  # Shared string to store the notes

# SSE endpoint to stream notes to the frontend
@app.route('/stream-notes')
def stream_notes():
    def generate():
        global shared_string
        last_sent = None  # Track the last sent value to avoid redundant updates
        while True:
            if shared_string and shared_string != last_sent:
                yield f"data: {shared_string}\n\n"  # Stream data as SSE format
                last_sent = shared_string
            time.sleep(1)  # Adjust the interval if needed for faster/slower updates
    return Response(generate(), mimetype='text/event-stream')

# Regular GET endpoint to fetch the current notes (optional, can be removed if not used)
@app.route('/get-notes', methods=['GET'])
def get_notes():
    global shared_string
    return shared_string

# Running the Flask server in a separate thread
def run_server():
    print("Server is running on http://localhost:8080")
    app.run(host='0.0.0.0', port=8080, debug=False, use_reloader=False)

if __name__ == "__main__":
    server_thread = threading.Thread(target=run_server)
    server_thread.daemon = True
    server_thread.start()

    # Accept user input to update the shared string
    while True:
        new_string = input("Enter a new string (comma-separated notes): ")
        shared_string = new_string
        print("String updated!")
