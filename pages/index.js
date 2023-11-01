import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Hidden,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import Seo from "../common/Seo";
import Header from "../components/resuableComponents/Header";
import { useTopPoolInfo } from "../hooks/useTopPoolsInfo";
import TodoBoard from "../components/Todo/TodoBoard";
import TodoAdd from "../components/Todo/TodoAdd";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundPosition: "center center,center center",
    backgroundRepeat: "no-repeat,no-repeat",
    backgroundSize: "cover,contain",
    height: "100%",
    width: "100%",
    paddingTop: "2%",
    paddingLeft: "3%",
    paddingRight: "3%",
    [theme.breakpoints.down("md")]: {
      paddingTop: 0,
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
  pageTitle: {
    fontWeight: 600,
    fontSize: 24,
    color: "#f9f9f9",
    textAlign: "left",
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
    },
  },

  pageSubtitle: {
    color: "#bdbdbd",
    textAlign: "left",
  },
  card1: {
    backgroundColor: "#171320",
    height: 295,

    backgroundSize: "cover",
    backgroundImage:
      "url(https://ninjapromo.io/wp-content/uploads/2022/11/best-crypto-ad-networks.jpg)",
    width: "100%",

    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: 14,
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: 295,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
    },
  },

  title: {
    fontWeight: 600,
    color: "#f9f9f9",
    textAlign: "left",
    fontSize: 16,
  },
  description: {
    fontWeight: 400,
    color: "#bdbdbd",
    textAlign: "left",
    lineHeight: 1.5,
    paddingTop: 5,
  },
}));

const Home = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const [pageLoaded, setPageLoaded] = useState(false);

  // To fetch pools info
  const { poolsInfo: topPoolsData, loading } = useTopPoolInfo();

  useEffect(() => setPageLoaded(true), []);

  return (
    <Box style={{ backgroundColor: "black" }}>
      <Seo
        title="NextJs | Starter Kit"
        description="NextJs Starter Kit"
        keywords="NextJs Starter Kit"
        image="https://mobisoftinfotech.com/resources/wp-content/uploads/2022/04/next-JS-framework.png"
      />

      {pageLoaded && (
        <Grid container justifyContent={"center"}>
          <Grid item md={8} sm={12} xs={12}>
            <Header />
            <Box className={classes.background}>
              <Container>
                <Hidden mdDown>
                  <Typography variant="h2" className={classes.pageTitle} mb={2}>
                    Tasks board
                  </Typography>
                </Hidden>

                <Grid container spacing={md ? 1 : 2} mb={md ? 5 : 6}>
                  <TodoAdd />
                  <TodoBoard />
                  <TodoBoard />
                  <TodoBoard />
                  <TodoBoard />
                  <TodoBoard />
                </Grid>
              </Container>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Home;
