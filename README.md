# **UrbanWatch**

## NASA SpaceApps Challenge 2021
### CRDP Lebanese Space Phoenix (Beirut)

### Fida Taychouri | Habib Elkak | Jad Matta | Paul Melki | Rudy Issi 

--- 

## Project Summary
UrbanWatch is a web based application that provides location-based data-oriented recommendations for governmental organizations (such as municipalities) and stakeholders with the aim of guiding the users towards more durable and resilient future urban plans.

In order to show the efficiency and importance of this application, hybrid data (earth observation satellites (EOS) data, unmanned aerial vehicles (UAV) data, and in situ rovers’ data) was collected for a local region in Lebanon: the Bekaa Valley. Data was combined and processed to give recommendations based on location. 

## Methodology
With the aim of providing the most accurate recommendations and estimations to the user, our web application works on combining the power of satellite and Earth Observation techniques, which provide large scale data and estimations both spatially and temporally, with drone and earth-bound techniques, which allow for higher refinement and granularity of the data, especially at the spatial level. For example, a considerable number of satellite data resources available freely online provide data at a maximal spatial refinement level of 5 to 10 km radius. On the other hand, drone and earth-bound data sources can allow much higher refinement up to a spatial point: as such, we can retrieve data for a single spatial point defined by its coordinates.

An important challenge which poses itself is then the methodology of combination of the data arising from these multiple sources. Data can be combined on multiple dimensions: namely spatial, temporal or (optimally) spatio-temporal. Currently, as we do not have drone data available over long periods of time, we decided to combine the data only over the spatial dimension. As such, for a given location, we find the NASA-provided data relevant to it, and the drone data we have for this location, and combine them together (regardless of the time differences between the two data points, for now).

As our drone data are spatial points, and the NASA-retrieved data are polygons with lower resolution, the data combination technique consists of applying a “point-in-polygon” approach which finds, for a given spatial point (drone) the polygon to which it belongs (NASA). From here, the variables can be fused together and aggregated over the spatial field if needed using multiple possible techniques, the simplest being an average over the spatial field.

![sdsdf](https://drive.google.com/file/d/1CTDCpEmFUzC5pTNi8cqxP3zU2rZ3lIQO/view?usp=sharing)
