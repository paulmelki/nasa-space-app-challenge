import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
const sections = [];
var data;

const theme = createTheme();

export default function Blog() {
  const location = useLocation();
  const mainFeaturedPost = {
    title: "Your Region has been processed!",
    description:
      `Your results and recommendation are below. The closest data point we have is at Long: ${location.state.long} and Lat: ${location.state.lat}.`,
    image: "",
    imageText: "",
    linkText: "",
  };

  const featuredPosts = [
    {
      title: "Air Humidity: ",
      description: `Air Humidity: ${location.state.airHumidity} %`,
    },
    {
      title: "Air Speed: ",
      description: `Air Speed: ${location.state.airSpeed} km/h`,
    },
    {
      title: "Atmospheric Pressure:",
      description: `Air Speed: ${location.state.atmospheriPressure} hPa (HectoPascal)`,
    },
    {
      title: "Carbon Monoxide:",
      description: `Carbon Monoxide: ${location.state.carbonMonoxide} ppm (parts per million) / baseline: 4.4 (Fresh Air)`,

    },
    {
      title: "Soil Humidity:",
      description: `Soil Humidity: ${location.state.soilHumidity} %`,

    },
    {
      title: "Temperature:",
      description: `Temperature: ${location.state.temperature} °C`,

    },
    {
      title: "NASA Terra Vegetation Continuous Fields (VCF5KYR):",
      description: `Vegetation Ratio (NASA): ${location.state.nasaVege} %`,

    },
    {
      title: "Vegetation Ratio (Drone):",
      description: "Vegetation Ratio (Drone): " + Math.round(100 * location.state.droneVege) + " %",

    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}></Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
