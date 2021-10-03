from flask import Flask, json
from flask import current_app,jsonify,request
import pandas as pd
import numpy as np
import geopandas as gpd
app = Flask(__name__)


@app.route("/members")
def members():
    return {"members": ["Jad", "Rudy", "Fida", "Habib"]};

@app.route('/get_coordinates', methods=['POST'])
def get_coordinates(): 
    print("Coordinates are being printed")
    data = request.get_json()
    return_data = process_coordinates(data)
    return return_data


def process_coordinates(data):

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
    polygons_contains = polygons_contains[polygons_contains["Vege_Ratio_Drone"] == np.max(polygons_contains["Vege_Ratio_Drone"])]
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