from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

import account

app = Flask(__name__)
CORS(app)

@app.route('/api/login', methods = [ 'POST' ])
def register():
    result = account.New(login, password)
    if result:
        return jsonify({'session': result})
    return jsonify({'error': 'Error creating new account'})


@app.route('/api/login', methods = [ 'GET' ])
def login():
    result = account.Authorize("login", "password")
    if result:
        return jsonify({'session': result})
    return jsonify({'error': 'Wrong credentials'})

if __name__ == '__main__':
    app.run()
