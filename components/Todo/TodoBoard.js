import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { constants } from "../../utils/constants";
import { Close } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#000000",
    marginBottom: 5,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 14,
    paddingRight: 14,
    width: "100%",
    height: "100%",
    border: "1px solid #414141",
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.03)",
    borderRadius: "0.5rem",
    "&:hover": {
      boxShadow: "0px 24px 33px -9px #0000005C",
    },

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
      paddingTop: 21,
      paddingBottom: 21,
      paddingLeft: 21,
      paddingRight: 21,
      maxHeight: 160,
    },
  },
}));

export default function TodoBoard() {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box pt={0} className={classes.card}>
      <Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Typography fontSize={12} fontWeight={600} color={"#f9f9f9"}>
              AI Trading Bot Script
            </Typography>
            <Typography
              style={{ textTransform: "capitalize" }}
              variant="body2"
              fontWeight={500}
              fontSize={md ? 14 : 12}
              color={"#bdbdbd"}
            >
              Finish writing script for AI Trading Bot
            </Typography>
          </Box>

          <Button
            style={{
              color: "white",
              backgroundColor: "#2E2E2E",
              borderRadius: 7,
              height: 40,
              width: "fit-content",
            }}
          >
            <Close style={{ cursor: "pointer", color: "white" }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
