"""
In this script, we implement the final version of the vegetation ratio function
that computes the propotion of green pixels in a certain image.

:author: Paul Melki

:date created: 27/09/2021

"""

# import required libraries
import os
import cv2
import numpy as np
import pandas as pd

# define the function


def vegetation_ratio(img, img_name, save_dir=os.getcwd()):
    """
    Function that computes the vegetation ratio in the provided image, based
    on thresholding in HSV color space. This is a simple algorithm, and
    definitely not the most advanced one.

    :param img: array-like
        the image on which to apply the vegetation ratio algorithm.
    :param img_name: str
        the name of the image, to be used for saving the files.
    :param save_dir: str
        path of the directory in which to save the intermediary images, and
        the final segmented image.
        By default, the current working directory.

    :return vege_ratio: float
        floating point number in [0, 1], the proportion of green pixels in the
        image.
    """

    # checks
    if img is None or len(img.shape) != 3:
        raise ValueError("Passed argument is not an RGB image! Exiting...")
    if not os.path.isdir(save_dir):
        raise FileNotFoundError("The specified path is not a valid directory.")

    # convert image to HSV
    img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # in the HSV color space, green is in the range
    # (36,25,25) ~ (86, 255,255)
    # define a mask of all pixels in this range
    mask = cv2.inRange(img_hsv, (36, 25, 25), (70, 255, 255))

    # slice the green
    index_mask = mask > 0
    img_green = np.zeros_like(img, np.uint8)
    img_green[index_mask] = img[index_mask]
    cv2.imwrite(rf"{save_dir}/{img_name}_green_vege.png", img_green)

    # convert green image to grayscale
    green_bw = cv2.cvtColor(img_green, cv2.COLOR_BGR2GRAY)

    # threshold to binarise
    ret, img_segmented = cv2.threshold(green_bw, 10, 255, cv2.THRESH_BINARY)
    # save the segmented image
    cv2.imwrite(rf"{save_dir}/{img_name}_segmented.png", img_segmented)

    # compute the number of non-zero pixels (green ones found)
    nb_nonzero_pixels = np.count_nonzero(img_segmented)
    # number of pixels in the image
    nb_pixels = img_segmented.shape[0] * img_segmented.shape[1]

    # compute the green ratio
    green_ratio = nb_nonzero_pixels / nb_pixels

    return green_ratio


# define the directory that contains all the images
image_dir = r"E:\Projects\nasa_space_challenge\data\drone_videos_mrhabib\images"

# for entry in os.scandir(image_dir):
#     img = cv2.imread(entry.path)

#     print(vegetation_ratio(img, img_name=entry.name,
#                            save_dir=r"E:\Projects\nasa_space_challenge\data\drone_videos_mrhabib\images\transformed"))


drone_data = pd.read_excel(r"E:\Projects\nasa_space_challenge\data\drone_videos_mrhabib\videos_data_pivot.xlsx")

vege_ratios = []
for i in range(len(drone_data)):
    img_path = drone_data.loc[i, "Image_Path"]
    img_name = drone_data.loc[i, "Image_Name"]
    img = cv2.imread(img_path)
    vege_ratio = vegetation_ratio(img, img_name=img_name)
    vege_ratios.append(vege_ratio)

drone_data["Vege_Ratio_Drone"] = vege_ratios

drone_data.to_csv(r"E:\Projects\nasa_space_challenge\data\drone_videos_mrhabib\videos_data_pivot_vegeratio.csv", 
                    index=False)