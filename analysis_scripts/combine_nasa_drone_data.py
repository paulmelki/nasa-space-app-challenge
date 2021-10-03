"""
In this script, we import the polygonized NASA Vegetation Continuous Fields 
and combine them with the point-wise drone data in order to obtain our current
"database". 

The current method of combination is "point-in-polygon", where the drone data
are the points intersected with the NASA satellite data polygons obtained 
using QGIS and GDAL. This method can be adapted to combine our drone data with 
other downloaded satellite data.

:author: Paul Melki

:date created: 28/09/2021

"""

# import required libraries
import geopandas as gpd
import pandas as pd
from pyproj import CRS
from constants import PYPROJ_DATADIR, NASA_VEGE_COVER_PATH, DRONE_DATA_PATH

# define the correct CRS and projections database (required for correct functioning)
crs=CRS('EPSG:4326')
import pyproj 
pyproj.datadir.set_data_dir(PYPROJ_DATADIR)

# read the NASA vegetation cover dataset
vege_cover_nasa = gpd.read_file(NASA_VEGE_COVER_PATH)
drone_data = pd.read_csv(DRONE_DATA_PATH)
drone_data_geo = gpd.GeoDataFrame(drone_data, geometry=gpd.points_from_xy(drone_data.Longitude, drone_data.Latitude))

polygons_contains = gpd.sjoin(vege_cover_nasa, drone_data_geo, op='contains')

polygons_contains.to_csv(r"E:\Projects\nasa_space_challenge\data\polygons_contains.csv")