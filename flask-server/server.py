"""
This is the main server of our web application. 
For now, the main purpose of this server is to take the input coordinates 
selected by the user in the front-end and process them in order to find the 
data we have for the selected region, namely in the function `process_coordinates`. 

:author: Jad Matta & Paul Melki

:date created: 19/09/2021

"""

# import required libraries and modules
from flask import Flask, json
from flask import current_app, jsonify, request
import pandas as pd
import numpy as np
import geopandas as gpd

# initialise Flask server
app = Flask(__name__)


@app.route("/members")
def members():
    return {"members": ["Jad", "Rudy", "Fida", "Habib"]};

# define function that connects the server to the front-end and retrieves the 
# coordinates chosen by the user.
@app.route('/get_coordinates', methods=['POST'])
def get_coordinates(): 
    print("Coordinates are being printed")
    data = request.get_json()
    return_data = process_coordinates(data)
    return return_data

# define the function that processes the obtained coordinates
def process_coordinates(data):
    """
    Function that takes a list of coordinates [longitude, latitude] of the 
    points selected by the user in the front-end and processes them in the 
    correct format, then applies a point-in-polygon approach for finding which
    polygons in our combined dataset (which includes both NASA and drone data)
    
    The function returns a JSON object of the retrieved data if any is found,
    otherwise specifies that no data is found.

    :param data: list[*]
        list of lists where each element is a 2-elements list specifying the 
        coordinates of one of the chosen points.
    
    """

    # get the list of coordinates from the front-end
    coords_list = data[0]

    # extract the longitudes and latitudes of the polygon separately
    lon = [point[0] for point in coords_list]
    lat = [point[1] for point in coords_list]

    # create dataframe from the coordinates
    coords_df = pd.DataFrame(columns=["longitude", "latitude"])
    coords_df["longitude"], coords_df["latitude"] = lon, lat

    # convert the dataframe to a geodataframe
    coords_geo = gpd.GeoDataFrame(
        coords_df, geometry=gpd.points_from_xy(coords_df.longitude, coords_df.latitude)
    )

    # load the "database" dataframe
    data_df = pd.read_csv(
        r"E:\Projects\nasa_space_challenge\data\polygons_contains.csv"
    )
    data_df["geometry"] = gpd.GeoSeries.from_wkt(data_df["geometry"])
    data_geo = gpd.GeoDataFrame(data_df, geometry="geometry")
    data_geo = data_geo.drop(["index_right"], axis=1)

    polygons_contains = gpd.sjoin(data_geo, coords_geo, op="contains")
    polygons_contains = polygons_contains[
        polygons_contains["Vege_Ratio_Drone"] == np.max(polygons_contains["Vege_Ratio_Drone"])
        ]
    polygons_contains = polygons_contains.drop_duplicates("fid")

    data_to_return = {"found": False}
    if polygons_contains.empty:
        return {"features": [{"properties": data_to_return}]}
    else: 
        polygons_contains["found"] = True
        data_to_return = polygons_contains.to_json()

    return(data_to_return)
    
        


if __name__ == "__main__":
    app.run(debug=True);