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
      "Your results and recommendation are below. The closest data point we have is at Long: and Lat:  ",
    image: "",
    imageText: "",
    linkText: "",
  };

  const featuredPosts = [
    {
      title: "Air Humidity",
      description: `Air Humidity: ${location.state.data}`,
    },
    {
      title: "Air_Speed",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
    },
    {
      title: "Atmospheric_Pressure:",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
    },
    {
      title: "Carbon_Monoxide:",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
    },
    {
      title: "Soil_Humidity:",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
    },
    {
      title: "Temperature:",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
    },
    {
      title: "NASA Terra Vegetation Continuous Fields (VCF5KYR):",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
    },
    {
      title: "Vegetation Ratio (Drone):",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
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
