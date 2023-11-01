import React, { useCallback, useMemo, useState } from "react";

import TokenList from "./TokenList";
import { useSelector } from "react-redux";

import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Slide,
  Backdrop,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { tokenList } from "../../utils/tokenData";
import { constants } from "../../utils/constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  background: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    display: "grid",
    placeItems: "center",
    background: "rgba(0,0,0,0.2)",
  },
  container: {
    width: "100%",
    minHeight: 400,
    maxWidth: 420,
    padding: 21,
    backgroundColor: "#ffffff",
    borderRadius: "1rem",
    display: "flex",
    alignItems: "center",
    zIndex: 11,
    borderRadius: 21,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      maxWidth: "95%",
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      height: "max-content",
    },
  },

  input: {
    backgroundColor: "#e5e5e5",
    color: "#bdbdbd",
    borderRadius: 12,
    padding: 10,
    border: "none",
    width: "100%",
    minWidth: 280,
    outline: "none",
  },
  confirmButton: {
    borderRadius: 14,
    background: constants.highlighColorDark,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 40px 10px 40px",
    color: "white",
    width: "100%",
    textTransform: "capitalize",
    maxWidth: 260,
    fontWeight: 600,
    fontSize: 16,
    "&:hover": {
      background: "rgba(130, 71, 229, 0.9)",
    },
  },
  cancelButton: {
    color: "black",
    padding: "10px 20px 10px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textTransform: "capitalize",
    maxWidth: "fit-content",
    fontWeight: 600,
    borderRadius: 14,
    fontSize: 16,
    "&:hover": {
      color: "rgba(130, 71, 229, 0.9)",
    },
  },
}));

const SelectTokenDialog = ({
  open,
  handleClose,
  handleTokenSelected,
  disableToken,
}) => {
  const classes = useStyles();

  const [filterInput, setFilterInput] = useState("");
  //   const { chainId } = useActiveWeb3React();
  const tokens = useSelector((state) => state?.list?.tokens);
  const [stockSelected, setStockSelected] = useState(
    localStorage.selectedList === "true" ? true : false
  );

  const onTokenSelect = (token) => {
    handleTokenSelected(token);
    handleClose();
  };

  const filteredTokenList = useMemo(() => {
    if (!tokenList) {
      return [];
    }

    const filtered =
      tokenList &&
      tokenList.filter(
        (item) =>
          (item.symbol &&
            item.symbol
              .toLocaleLowerCase()
              .includes(filterInput.toLocaleLowerCase())) ||
          (item.name &&
            item.name
              .toLowerCase()
              .includes(filterInput.toLocaleLowerCase())) ||
          (item.address &&
            item.address
              .toLowerCase()
              .includes(filterInput.toLocaleLowerCase()))
      );

    return filtered;
  }, [tokenList, filterInput]);

  const handleTokenFilter = async (value) => {
    if (!value) {
      const _value = "";
      setFilterInput(_value);
      return;
    }

    const _value = value.split(" ").join("");

    setFilterInput(_value);
  };

  const resetInputState = () => {
    handleTokenFilter("");
  };

  const onClose = () => {
    handleClose();
    resetInputState();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted={false}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      maxWidth="lg"
      fullWidth={false}
    >
      <div className={classes.background}>
        <div className={classes.container}>
          <IconButton
            style={{ position: "absolute", right: 10, top: 10 }}
            onClick={onClose}
          >
            <Close style={{ cursor: "pointer", color: "black" }} />
          </IconButton>

          <Box width={"100%"}>
            <Typography
              variant="h5"
              textAlign="left"
              fontWeight={600}
              color={"#000000"}
              mb={2}
            >
              Select a token
            </Typography>
            <input
              type="text"
              className={classes.input}
              value={filterInput}
              placeholder="Search...."
              onChange={({ target: { value } }) => handleTokenFilter(value)}
            />
            <Divider
              style={{
                width: "100%",
                borderTop: "1px solid #616161",
                marginTop: 15,
              }}
            />
            <TokenList
              handleItemSelected={onTokenSelect}
              tokens={filteredTokenList}
              disableToken={disableToken}
            />

            <Divider
              style={{
                width: "100%",
                borderTop: "1px solid #616161",
                marginTop: 15,
                marginBottom: 10,
              }}
            />
            <div className="d-flex justify-content-center">
              <Button
                onClick={onClose}
                className={classes.confirmButton}
                // style={{
                //   backgroundColor: "#6E67B6",
                //   color: "#f9f9f9",
                //   width: "100%",
                //   textTransform: "none",
                //   fontSize: 15,
                //   borderRadius: 10,
                //   padding: "10px 50px 10px 50px",
                // }}
              >
                Cancel
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </Dialog>
  );
};

export default SelectTokenDialog;
