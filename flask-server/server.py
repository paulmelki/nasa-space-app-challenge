from flask import Flask 
import geopandas as gpd 
import pandas as pd
import numpy as np
import cv2
app = Flask(__name__)


@app.route("/members")
def members():
    return {"members": ["Jad", "Rudy", "Fida", "Habib"]};

@app.route("/get_coordinates")  
def get_coordinates():
    return

def process_coordinates(coords):
    coords_df = pd.DataFrame(coords)


if __name__ == "__main__":
    app.run(debug=True);