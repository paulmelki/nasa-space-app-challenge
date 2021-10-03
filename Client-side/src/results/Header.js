import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Header(props) {
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 3, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h2"
          color="white"
          className="HeaderBackground"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          UrbanWatch
        </Typography>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
