"""
This is a trial script, in which we try to load a random dataframe in pandas, 
apply some manipulations on it then send it to Flask. 

:author: Paul Melki
:date created: 20/09/2021
"""

# import required libraries
import pandas as pd

# load some dataframe
def load_df():
    extremes = pd.read_csv(r"E:\College Material\Master 2\Extreme Value Theory\Data\RR_SOUID100105.csv")
    return extremes

print(load_df())

