import React from "react";
import { makeStyles } from "@mui/styles";
import {
  IconButton,
  Dialog,
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Backdrop,
  Slide,
  Typography,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";

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
    height: "fit-content",
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    minHeight: 400,
    maxHeight: 700,
    maxWidth: 400,
    position: "relative",
    background: "#000000",
    border: "2px solid #bdbdbd",
    display: "flex",
    alignItems: "center",
    zIndex: 11,
    borderRadius: 10,
    overflowX: "none",
    [theme.breakpoints.down("md")]: {
      border: "1px solid #bdbdbd",
      width: "100%",
      maxWidth: "95%",
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      height: "max-content",
    },
  },
  heading: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: "left",

    color: theme.palette.secondary.main,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },

  input: {
    backgroundColor: "transparent",
    height: 50,
    border: "1px solid rgba(224, 224, 224,1)",
    borderRadius: 15,
    fontSize: 18,
    width: "90%",
    color: theme.palette.secondary.main,
    padding: 10,
    outline: "none",
    [theme.breakpoints.down("sm")]: {
      height: 45,
      fontSize: 15,
    },
  },
  buttons: {
    marginBottom: 7,
  },

  closeIcon: {
    color: "#f9f9f9",
    fontSize: 24,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
  cancelButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.iconColor,
    width: "100%",
    textTransform: "none",
    fontSize: 17,
    borderRadius: 20,
    padding: "8px 50px 8px 50px",

    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  list: {
    paddingLeft: 20,
    minHeight: 400,
    maxHeight: 550,
    overflowY: "auto",
  },
  input: {
    fontSize: 14,
    borderRadius: 10,
  },
}));

let tokenList = [
  {
    name: "Sleep Token",
    symbol: "SLEEPT",
    id: "polkabridge",
    address: "0xb94d207a3fBdb312cef2e5dBEb7C22A76516BE37",
    decimals: 18,
    logoURI:
      "https://cdn3d.iconscout.com/3d/free/thumb/squigly-globe-3494833-2926648@0.png",
  },
];
// let tokenList = [
//   {
//     name: "MATIC",
//     symbol: "MATIC",
//     id: "matic-network",
//     address: "0x0000000000000000000000000000000000001010",
//     decimals: 18,
//     logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
//   },
//   {
//     name: "Polkabridge",
//     symbol: "PBR",
//     id: "polkabridge",
//     address: "0x0d6ae2a429df13e44a07cd2969e085e4833f64a0",
//     decimals: 18,
//     logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/8320.png",
//   },
//   {
//     name: "ChainLink",
//     symbol: "LINK",
//     id: "chainlink",
//     address: "0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
//     decimals: 18,
//     logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
//   },
//   {
//     name: "The Graph",
//     symbol: "GRT",
//     id: "the-graph",
//     address: "0x5fe2b58c013d7601147dcdd68c143a77499f5531",
//     decimals: 18,
//     logoURI:
//       "https://assets.coingecko.com/coins/images/13397/small/Graph_Token.png?1608145566",
//   },
//   {
//     name: "Decentraland",
//     symbol: "MANA",
//     id: "decentraland",
//     address: "0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
//     decimals: 18,
//     logoURI:
//       "https://assets.coingecko.com/coins/images/878/small/decentraland-mana.png?1550108745",
//   },
//   {
//     name: "Aave Token",
//     symbol: "AAVE",
//     id: "aave",
//     address: "0xd6df932a45c0f255f85145f286ea0b292b21c90b",
//     decimals: 18,
//     logoURI:
//       "https://assets.coingecko.com/coins/images/12645/small/AAVE.png?1601374110",
//   },
//   {
//     name: "Wrapped Bitcoin",
//     symbol: "WBTC",
//     id: "wrapped-bitcoin",
//     address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
//     decimals: 18,
//     logoURI:
//       "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744",
//   },
//   {
//     name: "Wrapped Ethereum",
//     symbol: "WETH",
//     id: "weth",
//     address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
//     decimals: 18,
//     logoURI:
//       "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
//   },

//   {
//     name: "Gains Network",
//     symbol: "GNS",
//     id: "gains-network",
//     address: "0xe5417af564e4bfda1c483642db72007871397896",
//     decimals: 18,
//     logoURI:
//       "https://assets.coingecko.com/coins/images/19737/small/logo.png?1635909203",
//   },

//   {
//     name: "Curve DAO Token",
//     symbol: "CRV",
//     id: "curve-dao-token",
//     address: "0x172370d5Cd63279eFa6d502DAB29171933a610AF",
//     decimals: 18,
//     logoURI:
//       "https://assets.coingecko.com/coins/images/12124/small/Curve.png?1597369484",
//   },
// ];

export const SelectTokenDialog = ({
  selectTokenPopup,
  handleClose,
  setSelectedToken,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      open={selectTokenPopup}
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
      {console.log(selectTokenPopup)}
      <div className={classes.background}>
        <div className={classes.container}>
          <div style={{ width: "100%" }}>
            <Box className="d-flex justify-content-between">
              <Typography variant="h6" fontWeight={600} lineHeight={1}>
                Select a token
              </Typography>
              <IconButton
                style={{ margin: 0, padding: 0 }}
                onClick={handleClose}
              >
                <Close className={classes.closeIcon} />
              </IconButton>
            </Box>

            {/* <Input
              type="text"
              disableUnderline
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#f9f9f9",
                border: "1px solid #bdbdbd",
                borderRadius: 12,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 6,
                paddingBottom: 6,
              }}
              fullWidth
              value={filterInput}
              placeholder="Search name or paste address"
              onChange={({ target: { value } }) => handleTokenFilter(value)}
            /> */}

            <List className={classes.list}>
              {tokenList.map((token, index) => (
                <ListItem
                  style={{ height: 65, cursor: "pointer" }}
                  key={index}
                  onClick={() => {
                    setSelectedToken(token);
                    handleClose();
                  }}
                >
                  <ListItemAvatar>
                    <img
                      src={token.logoURI}
                      alt={""}
                      style={{ height: 32, borderRadius: "50%" }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color={"#f9f9f9"}
                        lineHeight={1}
                        padding={0}
                        noWrap
                        margin={0}
                        spacing={0}
                        gutterBottom={0}
                      >
                        {token.symbol}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="small"
                        lineHeight={1}
                        noWrap
                        style={{ fontSize: 10 }}
                      >
                        {token.name}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
