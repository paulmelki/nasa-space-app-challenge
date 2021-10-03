"""
In this script, we define some constants that are needed throughout the data
manipulation process. In order to adapt the code to your local environment,
you only need to change these constants to reflect your local environment and
everything else should work just fine.

:author: Paul Melki

:date created: 03/10/2021

"""

# Define PyProj data directory, where all geographic projections are defined.
# This will usually be in your Anaconda environment!
PYPROJ_DATADIR = r"C:\Users\Paul\anaconda3\envs\GlobalEnv\Lib\site-packages\pyproj\proj_dir\share\proj"


# INPUT DATA PATHS
# ----------------

# This should be the local data directory where we wish to save and load our 
# data files. Please change it to your local path.
LOCAL_DATA_PATH = r"E:\Projects\nasa_space_challenge\data"

# This should be the path to the polygonized NASA data in either a .zip file 
# or Shapefile (.shp). Each Shapefile should always be accompanied with other 
# .shx, .dbf, .cpg and .prj files, with the same name in the same directory. 
# Alternatively, all these files can be zipped together.
NASA_VEGE_COVER_PATH = fr"{LOCAL_DATA_PATH}\vegetation_cover\vegetation_cover.zip"

# This should be the path to the drone data formatted in a .csv file. 
# Note: the drone dataframe has to have 2 important columns: 
# Longitude and Latitude, without which it cannot be transformed into a 
# GeoDataFrame
DRONE_DATA_PATH = fr"{LOCAL_DATA_PATH}\drone_videos_mrhabib\videos_data_pivot_vegeratio.csv"

# This will be the path to the directory that contains the images obtained 
# using the drone. This path will be read in the script `compute_vegetation_ratio.py`
# in order to compute the vegetation ratio on all the images in the directory.
IMAGES_PATH = r"E:\Projects\nasa_space_challenge\data\drone_videos_mrhabib\images"
