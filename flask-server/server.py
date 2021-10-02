from flask import Flask, json
from flask import current_app,jsonify,request
import pandas as pd
import numpy as np
app = Flask(__name__)


@app.route("/members")
def members():
    return {"members": ["Jad", "Rudy", "Fida", "Habib"]};

@app.route('/get_coordinates', methods=['POST'])
def get_coordinates(): 
    print("Coordinates are being printed")
    data = request.get_json();
    print(data)
    return jsonify(data);

# def process_coordinates(coords):
#     coords_df = pd.DataFrame(coords)


if __name__ == "__main__":
    app.run(debug=True);