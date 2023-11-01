//done
import React from "react";
import { Typography, Slide, Dialog, Backdrop } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
    minHeight: 400,
    maxWidth: 540,
    position: "relative",
    background: "#000000",
    border: "2px solid #bdbdbd",
    display: "flex",
    alignItems: "center",
    zIndex: 11,
    borderRadius: 10,
    [theme.breakpoints.down("md")]: {
      border: "10px solid #D1FE1D",
      width: "100%",
      maxWidth: "95%",
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      height: "max-content",
    },
  },
  closeIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    height: 22,
    width: 22,
    cursor: "pointer",
    color: "white",
    [theme.breakpoints.down("md")]: {
      top: 5,
      right: 5,
      height: 18,
      width: 18,
    },
  },

  heading: {
    color: "#f9f9f9",
    textAlign: "center",
    fontSize: 30,
    lineHeight: 1,
    paddingTop: 5,
    [theme.breakpoints.down("md")]: {
      fontSize: 24,
    },
  },

  para: {
    color: "#bdbdbd",
    textAlign: "center",
    fontSize: 13,
    fontWeight: 300,
    paddingTop: 5,

    [theme.breakpoints.down("md")]: {
      fontSize: 13,
      paddingTop: 15,
    },
  },
}));

const TxPopup = ({ txCase, resetPopup }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={txCase > 0}
      TransitionComponent={Transition}
      keepMounted={false}
      onClose={null}
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
          <div className="h-100 w-100">
            {txCase === 1 && (
              <div
                className="h-100 w-100 d-flex flex-column justify-content-between"
                style={{ minHeight: 400 }}
              >
                <div
                  className="d-flex justify-content-end align-items-start"
                  onClick={resetPopup}
                >
                  <Close style={{ cursor: "pointer", color: "white" }} />
                </div>
                <div>
                  <div className="text-center">
                    <img
                      src="https://cdn3d.iconscout.com/3d/premium/thumb/time-is-money-5374083-4492219.png"
                      alt="Waiting"
                      height="120px"
                    />
                  </div>

                  <div className="my-2">
                    <Typography
                      variant="h5"
                      className={classes.heading}
                      textAlign="center"
                      fontWeight={600}
                      fontSize={20}
                      color={"#f9f9f9"}
                    >
                      Waiting for Confirmation
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      mt={2}
                      fontWeight={400}
                      fontSize={15}
                      color={"#bdbdbd"}
                    >
                      Confirm the transaction in Metamask to make <br />
                      strategy working.
                    </Typography>
                  </div>
                </div>
                <div></div>
              </div>
            )}
            {txCase === 2 && (
              <div
                className="h-100 w-100 d-flex flex-column justify-content-between"
                style={{ minHeight: 400 }}
              >
                <div
                  className="d-flex justify-content-end"
                  onClick={resetPopup}
                >
                  <Close style={{ cursor: "pointer", color: "white" }} />
                </div>
                <div>
                  <div className="text-center">
                    <img
                      src="https://cdn3d.iconscout.com/3d/premium/thumb/shopping-offer-time-4408277-3663982.png"
                      alt="Submitted"
                      height="120px"
                    />
                  </div>
                  <div className="my-2">
                    {" "}
                    <Typography
                      variant="h5"
                      className={classes.heading}
                      textAlign="center"
                      fontWeight={600}
                      fontSize={22}
                    >
                      Transaction Submitted
                    </Typography>
                    <Typography
                      mt={2}
                      variant="body2"
                      className={classes.para}
                      textAlign="center"
                      fontSize={15}
                      color={"#bdbdbd"}
                    >
                      Transaction is submitted and we are creating <br />
                      your space in the pool.
                    </Typography>
                  </div>
                </div>
                <div></div>
              </div>
            )}
            {txCase === 3 && (
              <div
                className="h-100 w-100 d-flex flex-column justify-content-between"
                style={{ minHeight: 400 }}
              >
                <div
                  className="d-flex justify-content-end"
                  onClick={resetPopup}
                >
                  <Close style={{ cursor: "pointer", color: "white" }} />
                </div>
                <div>
                  <div className="text-center">
                    <img
                      src="https://cdn3d.iconscout.com/3d/premium/thumb/success-5825150-4874092.png"
                      alt="success"
                      height="120px"
                    />
                  </div>
                  <div className="my-2">
                    {" "}
                    <Typography
                      variant="h5"
                      className={classes.heading}
                      textAlign="center"
                      fontWeight={600}
                      fontSize={20}
                      color={"#f9f9f9"}
                    >
                      Transaction Successful!
                    </Typography>
                    <Typography
                      mt={2}
                      variant="body2"
                      className={classes.para}
                      textAlign="center"
                      fontWeight={400}
                      fontSize={15}
                      color={"#bdbdbd"}
                    >
                      Congratulations! your strategy is ready to give you yeilds
                      <br /> while you sleep.
                    </Typography>
                  </div>
                </div>
                <div></div>
              </div>
            )}
            {txCase === 4 && (
              <div
                className="h-100 w-100 d-flex flex-column justify-content-between"
                style={{ minHeight: 400 }}
              >
                <div
                  className="d-flex justify-content-end"
                  onClick={resetPopup}
                >
                  <Close style={{ cursor: "pointer", color: "white" }} />
                </div>
                <div>
                  <div className="text-center">
                    <img
                      src="https://cdn3d.iconscout.com/3d/premium/thumb/expired-time-warning-5342745-4468817.png"
                      alt="failed"
                      height="120px"
                    />
                  </div>

                  <div className="my-2">
                    <Typography
                      variant="h5"
                      textAlign="center"
                      fontWeight={600}
                      fontSize={20}
                      color={"#f9f9f9"}
                    >
                      Sorry, Something went wrong!
                    </Typography>
                    <Typography
                      mt={2}
                      variant="body2"
                      textAlign="center"
                      fontWeight={400}
                      fontSize={15}
                      color={"#bdbdbd"}
                    >
                      Sorry, Something went wrong and we are not able to <br />{" "}
                      give you pass in the pool. Try again!
                    </Typography>
                  </div>
                </div>
                <div></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default TxPopup;
