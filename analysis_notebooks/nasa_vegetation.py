"""
In this script, we implement manipulation of the NASA vegetation cover data
using geopandas

:author: Paul Melki

:date created: 28/09/2021

"""

# # import required libraries
import cv2
import geopandas as gpd
from numpy import poly
import pandas as pd

from pyproj import CRS

crs=CRS('EPSG:4326')
import pyproj 
pyproj.datadir.set_data_dir(r"C:\Users\Paul\anaconda3\envs\GlobalEnv\Lib\site-packages\pyproj\proj_dir\share\proj")

# read the NASA vegetation cover dataset
vege_cover_nasa = gpd.read_file(r"E:\Projects\nasa_space_challenge\data\vegetation_cover\vegetation_cover.zip")
drone_data = pd.read_csv(r"E:\Projects\nasa_space_challenge\data\drone_videos_mrhabib\videos_data_pivot_vegeratio.csv")
drone_data_geo = gpd.GeoDataFrame(drone_data, geometry=gpd.points_from_xy(drone_data.Longitude, drone_data.Latitude))

polygons_contains = gpd.sjoin(vege_cover_nasa, drone_data_geo, op='contains')

polygons_contains.to_csv(r"E:\Projects\nasa_space_challenge\data\polygons_contains.csv")

