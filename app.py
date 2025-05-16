from flask import Flask, render_template, request, jsonify
import algorithms

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sort', methods=['POST'])
def sort():
    data = request.get_json()
    numbers = list(map(int, data['numbers']))
    algorithm = data['algorithm']

    result = algorithms.get_sort_steps(numbers, algorithm)
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
