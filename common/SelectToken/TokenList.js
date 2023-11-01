import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import TokenIcon from "../TokenIcon";
import { constants } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 400,
    position: "relative",
    overflowY: "auto",
    maxHeight: 450,
  },
  tokenIcon: {
    height: 36,
    width: 36,
    padding: 0,
    borderRadius: "50%",
    backgroundColor: "#000000",
    [theme.breakpoints.down("sm")]: {
      height: 32,
      width: 32,
    },
  },
  tokenTitle: {
    padding: 0,
    margin: 0,
    color: "#000000",
    fontSize: 13,
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: 15,
    },
  },
  tokenSubtitle: {
    color: "#616161",
    fontWeight: 400,
    fontSize: 12,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  listItem: {
    marginTop: 3,
    marginBottom: 3,
    borderRadius: 14,
    "&:hover": {
      background: "#f5f5f5",
      borderRadius: 14,
    },
  },
  selectedListItem: {
    marginTop: 3,
    marginBottom: 3,
    background: "#f5f5f5",
    borderRadius: 14,
  },
}));

const TokenList = ({ handleItemSelected, tokens, disableToken }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {tokens.map((token, index) => (
        <ListItem
          style={{ height: 60 }}
          button
          key={index}
          className={
            token.symbol === disableToken.symbol
              ? classes.selectedListItem
              : classes.listItem
          }
          onClick={() => handleItemSelected(token)}
        >
          <ListItemAvatar>
            <TokenIcon path={token?.logoURI} className={classes.tokenIcon} />
          </ListItemAvatar>
          <ListItemText
            primary={<p className={classes.tokenTitle}>{token.symbol}</p>}
            secondary={
              <span className={classes.tokenSubtitle}>{token.name}</span>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default React.memo(TokenList);
