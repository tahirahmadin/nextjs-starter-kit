import React, { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  Typography,
  Button,
  InputAdornment,
  Paper,
  useMediaQuery,
  Hidden,
  Input,
  SwipeableDrawer,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import {
  selectFarmCategory,
  selectCategory,
  selectBrand,
  selectMethod,
  selectDiet,
  selectCuisine,
  toggleCommonMobileFiltersVisible,
} from "../../reducers/UiReducer";
import StickyBox from "react-sticky-box";

const useStyles = makeStyles((theme) => ({
  root: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: "white",
  },
  inputRoot: {
    backgroundColor: "#6F6F6F",
    height: "100%",
  },
  input: {
    border: "2px solid #bdbdbd",
    outline: "none",

    "&:active": {
      outline: "none",
    },
  },
}));

const SideBar = ({
  recipes,
  farm,
  farmersMarket,
  searchWord,
  setSearchWord,
  search,
  filterValue,
  setFilterValue,
}) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const {
    cuisines,
    techniques,
    brands,
    methods,
    diet,
    farmCategories,
    selectedFarmCategory,
    selectedMethod,
    selectedCategory,
    selectedBrand,
    selectedDiet,
    selectedCuisine,
    selectedFarmersMarketTab,
    commonMobileFiltersVisible,
  } = store.ui;
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const sm = useMediaQuery(theme.breakpoints.down("md"));
  const md = useMediaQuery(theme.breakpoints.down("lg"));

  const clearFilter = () => {
    setFilterValue("");
    dispatch(setSearchWord(""));
    dispatch(selectFarmCategory(""));
    dispatch(selectBrand(""));
    dispatch(selectCategory(""));
    dispatch(selectDiet(""));
    dispatch(selectCuisine(""));
    dispatch(toggleCommonMobileFiltersVisible());
    dispatch(selectMethod(""));
  };

  const updateFilters = (type, value) => {
    if (filterValue === value) {
      clearFilter();
    } else {
      if (type === "farmCategory") {
        clearFilter();
        dispatch(selectFarmCategory(value));
        setFilterValue(value);
      }
      if (type === "category") {
        clearFilter();
        dispatch(selectCategory(value));
        setFilterValue(value);
      }
      if (type === "diet") {
        clearFilter();
        dispatch(selectDiet(value));
        setFilterValue(value);
      }
      if (type === "cuisine") {
        clearFilter();
        dispatch(selectCuisine(value));
        setFilterValue(value);
      }
      if (type === "method") {
        clearFilter();
        dispatch(selectMethod(value));
        setFilterValue(value);
      }
      if (type === "brand") {
        clearFilter();
        dispatch(selectBrand(value));
        setFilterValue(value);
      }
      console.log(type);
      console.log(value);
    }
  };

  return !sm ? (
    <Box
      px={2}
      pt={3}
      bgcolor={
        selectedFarmersMarketTab !== "Ingredients"
          ? theme.palette.pink.light
          : "#E3FFFD"
      }
      display="flex"
      flexDirection="column"
      minHeight="calc(100vh - 70px)"
      minWidth={md ? 210 : 235}
    >
      <Hidden mdDown>
        <Box
          pt={md ? 1 : 2}
          pb={!md && 2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" style={{ fontSize: md ? 20 : 24 }}>
            FILTERS
          </Typography>
          <Button
            variant="text"
            style={{ color: "#6F6F6F", fontSize: md ? 12 : 14 }}
            onClick={clearFilter}
          >
            Clear Filters
          </Button>
        </Box>
      </Hidden>

      <Hidden mdDown>
        <Box py={2}>
          <Typography variant="body2" style={{ fontSize: md ? 15 : 18 }}>
            SEARCH
          </Typography>
          <Input
            disableUnderline={true}
            className={classes.input}
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,

              backgroundColor: "#fff",
              height: 40,
              p: 0,
            }}
            endAdornment={
              <InputAdornment
                position="end"
                sx={{
                  height: 36,
                  backgroundColor: theme.palette.columbiaBlue.main,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={search}
              >
                <SearchIcon sx={{ color: "black", cursor: "pointer" }} />
              </InputAdornment>
            }
            value={searchWord}
            onChange={(e) => {
              dispatch(setSearchWord(e.target.value));
            }}
          />
        </Box>
      </Hidden>
      {farmersMarket && selectedFarmersMarketTab === "Ingredients" && (
        <Box>
          <Box py={2}>
            <Typography
              variant="body2"
              pb={2}
              style={{ fontSize: md ? (sm ? 16 : 15) : 18 }}
            >
              CATEGORIES
            </Typography>

            {farmCategories.map((item, index) => (
              <Paper
                key={index}
                sx={{
                  boxShadow: 0,
                  borderRadius: 0,
                  bgcolor:
                    selectedFarmCategory === item.name
                      ? selectedFarmersMarketTab === "Dishes"
                        ? "#FEDFFF"
                        : "#E9FF94"
                      : "",

                  py: md ? (sm ? 2 : 1.3) : 2,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => updateFilters("farmCategory", item.name)}
              >
                <embed
                  src={item.img}
                  alt={`${item.name} flag`}
                  height={20}
                  width={20}
                  style={{ marginRight: 10 }}
                />
                <Typography
                  variant="body2"
                  style={{ fontSize: md ? (sm ? 16 : 13) : 18 }}
                >
                  {item.name}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
      {(recipes || selectedFarmersMarketTab === "Dishes") && (
        <Box>
          <Box py={2}>
            <Typography variant="body2" pb={1}>
              DIET PREFERENCES
            </Typography>

            {diet.map((item, index) => (
              <Paper
                key={index}
                sx={{
                  boxShadow: 0,
                  borderRadius: 0,
                  bgcolor: selectedDiet === item.name && "#E9FF94",
                  py: 2,
                  px: 2,

                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => updateFilters("diet", item.name)}
              >
                <img
                  src={item.img}
                  alt={`${item.name} flag`}
                  height={20}
                  width={20}
                  style={{ marginRight: 10 }}
                />
                <Typography variant="body2">{item.name}</Typography>
              </Paper>
            ))}
          </Box>

          <Box py={2}>
            <Typography variant="body2" pb={1}>
              COOKING PREFERENCES
            </Typography>

            {methods.map((item, index) => (
              <Paper
                key={index}
                sx={{
                  boxShadow: 0,
                  borderRadius: 0,
                  bgcolor: selectedMethod === item.name && "#E9FF94",
                  py: 2,
                  px: 2,

                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => updateFilters("method", item.name)}
              >
                <img
                  src={item.img}
                  alt={`${item.name} method`}
                  height={20}
                  width={20}
                  style={{ marginRight: 10 }}
                />
                <Typography variant="body2">
                  {item.name.toUpperCase()}
                </Typography>
              </Paper>
            ))}
          </Box>
          <Box py={2}>
            <Typography variant="body2" pb={1}>
              BRAND CHOICE
            </Typography>

            {brands.map((item, index) => (
              <Paper
                key={index}
                sx={{
                  boxShadow: 0,
                  borderRadius: 0,
                  bgcolor: selectedBrand === item.name && "#E9FF94",
                  py: 2,
                  px: 2,

                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => updateFilters("brand", item.name)}
              >
                <img
                  src={item.img}
                  alt={`${item.name} method`}
                  height={20}
                  width={20}
                  style={{ marginRight: 10 }}
                />
                <Typography variant="body2">
                  {item.name.toUpperCase()}
                </Typography>
              </Paper>
            ))}
          </Box>

          <Box py={2}>
            <Typography variant="body2" pb={1}>
              CUISINE
            </Typography>

            {cuisines.map((item, index) => (
              <Paper
                key={index}
                sx={{
                  boxShadow: 0,
                  borderRadius: 0,
                  bgcolor: selectedCuisine === item.name && "#E9FF94",
                  py: 2,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => updateFilters("cuisine", item.name)}
              >
                <img
                  src={item.img}
                  alt={`${item.name} flag`}
                  height={20}
                  width={26}
                  loading="eager"
                  style={{ marginRight: 10, border: "0.1px solid #000" }}
                />
                <Typography variant="body2">
                  {item.name.toUpperCase()}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  ) : (
    <SwipeableDrawer
      anchor="bottom"
      open={commonMobileFiltersVisible}
      onOpen={() => dispatch(toggleCommonMobileFiltersVisible())}
      onClose={() => dispatch(toggleCommonMobileFiltersVisible())}
      style={{
        zIndex: 102,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "55vh",
          minWidth: md ? 210 : 235,
          marginBottom: "45px",
          overflowY: "scroll",
        }}
      >
        {farmersMarket && selectedFarmersMarketTab === "Ingredients" && (
          <Box
            px={2.5}
            bgcolor={
              selectedFarmersMarketTab !== "Ingredients"
                ? theme.palette.pink.light
                : "#E3FFFD"
            }
          >
            <Box py={2}>
              <StickyBox>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bgcolor={
                    selectedFarmersMarketTab !== "Ingredients"
                      ? theme.palette.pink.light
                      : "#E3FFFD"
                  }
                >
                  <Typography
                    variant="body2"
                    py={2.1}
                    width="100%"
                    style={{ fontSize: md ? 15 : 18 }}
                  >
                    CATEGORIES
                  </Typography>
                  <Button
                    variant="text"
                    style={{
                      color: "#6F6F6F",
                      fontSize: 12,
                      whiteSpace: "nowrap",
                    }}
                    onClick={clearFilter}
                  >
                    Clear Filters
                  </Button>
                </Box>
              </StickyBox>
              {farmCategories.map((item, index) => (
                <Paper
                  key={index}
                  sx={{
                    boxShadow: 0,
                    borderRadius: 0,
                    bgcolor:
                      selectedFarmCategory === item.name
                        ? selectedFarmersMarketTab === "Dishes"
                          ? "#FEDFFF"
                          : "#E9FF94"
                        : "",

                    py: md ? 1.4 : 2,
                    px: 2,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => updateFilters("farmCategory", item.name)}
                >
                  <embed
                    src={item.img}
                    alt={`${item.name} flag`}
                    height={20}
                    width={20}
                    style={{ marginRight: 10 }}
                  />
                  <Typography
                    variant="body2"
                    style={{ fontSize: md ? 13 : 18 }}
                  >
                    {item.name}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        )}
        {(recipes || selectedFarmersMarketTab === "Dishes") && (
          <Box
            px={2.5}
            bgcolor={
              selectedFarmersMarketTab !== "Ingredients"
                ? theme.palette.pink.light
                : "#E3FFFD"
            }
          >
            <Box py={2}>
              <StickyBox>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bgcolor={
                    selectedFarmersMarketTab !== "Ingredients"
                      ? theme.palette.pink.light
                      : "#E3FFFD"
                  }
                >
                  <Typography
                    variant="body2"
                    py={2.1}
                    width="100%"
                    style={{ fontSize: md ? 15 : 18 }}
                  >
                    CATEGORIES
                  </Typography>
                  <Button
                    variant="text"
                    style={{
                      color: "#6F6F6F",
                      fontSize: 12,
                      whiteSpace: "nowrap",
                    }}
                    onClick={clearFilter}
                  >
                    Clear Filters
                  </Button>
                </Box>
              </StickyBox>
            </Box>

            <Box py={2}>
              <StickyBox>
                <Typography
                  variant="body2"
                  py={2.1}
                  width="100%"
                  bgcolor={
                    selectedFarmersMarketTab !== "Ingredients"
                      ? theme.palette.pink.light
                      : "#E3FFFD"
                  }
                  style={{ fontSize: md ? 15 : 18 }}
                >
                  DIET PREFERENCES
                </Typography>
              </StickyBox>

              {diet.map((item, index) => (
                <Paper
                  key={index}
                  sx={{
                    boxShadow: 0,
                    borderRadius: 0,
                    bgcolor: selectedDiet === item.name && "#E9FF94",
                    py: md ? 1.4 : 2,
                    px: 2,

                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => updateFilters("diet", item.name)}
                >
                  <img
                    src={item.img}
                    alt={`${item.name} flag`}
                    height={20}
                    width={20}
                    style={{ marginRight: 10 }}
                  />
                  <Typography
                    variant="body2"
                    style={{ fontSize: md ? 13 : 18 }}
                  >
                    {item.name}
                  </Typography>
                </Paper>
              ))}
            </Box>

            <Box py={2}>
              <StickyBox>
                <Typography
                  variant="body2"
                  py={2.1}
                  width="100%"
                  bgcolor={
                    selectedFarmersMarketTab !== "Ingredients"
                      ? theme.palette.pink.light
                      : "#E3FFFD"
                  }
                  style={{ fontSize: md ? 15 : 18 }}
                >
                  BRAND CHOICE
                </Typography>
              </StickyBox>

              {brands.map((item, index) => (
                <Paper
                  key={index}
                  sx={{
                    boxShadow: 0,
                    borderRadius: 0,
                    bgcolor: selectedBrand === item.name && "#E9FF94",
                    py: 2,
                    px: 2,

                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => updateFilters("brand", item.name)}
                >
                  <img
                    src={item.img}
                    alt={`${item.name} method`}
                    height={20}
                    width={20}
                    style={{ marginRight: 10 }}
                  />
                  <Typography variant="body2">
                    {item.name.toUpperCase()}
                  </Typography>
                </Paper>
              ))}
            </Box>

            <StickyBox>
              <Typography
                variant="body2"
                py={2.1}
                width="100%"
                bgcolor={
                  selectedFarmersMarketTab !== "Ingredients"
                    ? theme.palette.pink.light
                    : "#E3FFFD"
                }
                style={{ fontSize: md ? 15 : 18 }}
              >
                COOKING PREFERENCES
              </Typography>
            </StickyBox>

            {methods.map((item, index) => (
              <Paper
                key={index}
                sx={{
                  boxShadow: 0,
                  borderRadius: 0,
                  bgcolor: selectedMethod === item.name && "#E9FF94",
                  py: md ? 1.4 : 2,
                  px: 2,

                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => updateFilters("method", item.name)}
              >
                <img
                  src={item.img}
                  alt={`${item.name} flag`}
                  height={20}
                  width={20}
                  style={{ marginRight: 10 }}
                />
                <Typography variant="body2" style={{ fontSize: md ? 13 : 18 }}>
                  {item.name.toUpperCase()}
                </Typography>
              </Paper>
            ))}

            <Box py={2}>
              <StickyBox>
                <Typography
                  variant="body2"
                  py={2.1}
                  width="100%"
                  bgcolor={
                    selectedFarmersMarketTab !== "Ingredients"
                      ? theme.palette.pink.light
                      : "#E3FFFD"
                  }
                  style={{ fontSize: md ? 15 : 18 }}
                >
                  CUISINE
                </Typography>
              </StickyBox>

              {cuisines.map((item, index) => (
                <Paper
                  key={index}
                  sx={{
                    boxShadow: 0,
                    borderRadius: 0,
                    bgcolor: selectedCuisine === item.name && "#E9FF94",
                    py: md ? 1.4 : 2,
                    px: 2,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => updateFilters("cuisine", item.name)}
                >
                  <embed
                    src={item.img}
                    alt={`${item.name} flag`}
                    height={20}
                    width={20}
                    style={{ marginRight: 10 }}
                  />
                  <Typography
                    variant="body2"
                    style={{ fontSize: md ? 13 : 18 }}
                  >
                    {item.name.toUpperCase()}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </SwipeableDrawer>
  );
};

export default SideBar;
