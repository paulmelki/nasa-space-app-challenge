import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedVariables from "./MainFeaturedVariables";
import FeaturedVariables from "./FeaturedVariables";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import Footer from "./Footer";
import "./Results.css";
import { useLocation } from "react-router-dom";
import airHumidity from "../img/airHumidity.jpg";
import airSpeed from "../img/airSpeed.png";
import atmosphericPressure from "../img/atmosphericPressure.png";
import co2 from "../img/co2.jpg";
import soilHumidity from "../img/soilHumidity.jpg";
import temperature from "../img/temperature.jpg";
import vegRatio from "../img/vegeRatio.png";
import vegRatio2 from "../img/vegRatio2.jpg";
const sections = [];
var data;

const theme = createTheme();

export default function Results() {
  const location = useLocation();
  const mainFeaturedPost = {
    title: "Welcome to UrbanWatch, Your Region has been processed!",
    description: `Your results and recommendation are below. The closest data point we have is at Long: ${location.state.long} and Lat: ${location.state.lat}.`,
  };

  const featuredPosts = [
    {
      title: "Air Humidity: ",
      description: `Air Humidity: ${location.state.airHumidity} %`,
      image: airHumidity,
    },
    {
      title: "Air Speed: ",
      description: `Air Speed: ${location.state.airSpeed} km/h`,
      image: airSpeed,
    },
    {
      title: "Atmospheric Pressure:",
      description: `Air Speed: ${location.state.atmosphericPressure} hPa (HectoPascal)`,
      image: atmosphericPressure,
    },
    {
      title: "Carbon Monoxide:",
      description: `Carbon Monoxide: ${location.state.carbonMonoxide} ppm (parts per million) / baseline: 4.4 (Fresh Air)`,
      image: co2,
    },
    {
      title: "Soil Humidity:",
      description: `Soil Humidity: ${location.state.soilHumidity} %`,
      image: soilHumidity,
    },
    {
      title: "Temperature:",
      description: `Temperature: ${location.state.temperature} °C`,
      image: temperature,
    },
    {
      title: "NASA Terra Vegetation Continuous Fields (VCF5KYR):",
      description: `Vegetation Ratio (NASA): ${location.state.nasaVege} %`,
      image: vegRatio2,
    },
    {
      title: "Vegetation Ratio (Drone):",
      description:
        "Vegetation Ratio (Drone): " +
        Math.round(100 * location.state.droneVege) +
        " %",
      image: vegRatio,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedVariables post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedVariables key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}></Grid>
        </main>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {/* {location.state.dataResult.Recommendation} */}
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
