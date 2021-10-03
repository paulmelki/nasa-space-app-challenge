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

# import required libraries.
import geopandas as gpd
import pandas as pd
import pyproj
import constants as cts

# define the correct CRS and projections database (required for correct functioning).
crs = pyproj.CRS('EPSG:4326')
pyproj.datadir.set_data_dir(cts.PYPROJ_DATADIR)

# read the NASA vegetation cover dataset.
vege_cover_nasa = gpd.read_file(cts.NASA_VEGE_COVER_PATH)

# read the drone data.
drone_data = pd.read_csv(cts.DRONE_DATA_PATH)
# convert the drone data to GeoDataFrame format.
drone_data_geo = gpd.GeoDataFrame(drone_data, geometry=gpd.points_from_xy(drone_data.Longitude, drone_data.Latitude))

# apply point-in-polygon on the two datasets, to combine the two datasets
# together.
polygons_contains = gpd.sjoin(vege_cover_nasa, drone_data_geo, op='contains')

# Save the obtained dataset to a .csv file.
polygons_contains.to_csv(fr"{cts.LOCAL_DATA_PATH}\polygons_contains.csv")