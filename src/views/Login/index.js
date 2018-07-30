import React from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// import InputLabel from "@material-ui/core/InputLabel";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import IconButton from "@material-ui/core/IconButton";

import GitHub from "views/Icons/Github";
import Google from "views/Icons/Google";
import Facebook from "views/Icons/Facebook";

import ContentCopy from "@material-ui/icons/ContentCopy";
import CodeIcon from "@material-ui/icons/Code";
import Logo from "components/Logo";
import CardIcon from "components/Card/CardIcon.jsx";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    "& svg": {
      width: "30px",
      height: "30px"
    }
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  text: {
    width: "135px"
  },
  footText: {
    fontSize: 17,
    color: "lightgray"
  }
});

const Login = ({ ...props }) => {
  const classes = props.classes;
  return (
    <div>
      <MuiThemeProvider>
        <div>
          <AppBar title="Sign in with" />
          <TextField
            hintText="Enter your Username"
            floatingLabelText="Username"
            onChange={(event, newValue) =>
              this.setState({ username: newValue })}
          />
          <br />
          <TextField
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange={(event, newValue) =>
              this.setState({ password: newValue })}
          />
          <br />
          {/* <RaisedButton
            label="Submit"
            primary={true}
            style={style}
            onClick={event => this.handleClick(event)}
          /> */}
        </div>
      </MuiThemeProvider>
    </div>
  );
};

const GridLogin = ({ ...props }) => {
  const { classes } = props;
  return (
    <Card>
      <CardHeader color="info">
        <h3>Sign in with</h3>
      </CardHeader>
      <CardBody profile>
        <Grid container align="center">
          <GridItem xs={12} sm={12} md={12}>
            <Button color="warning" className={classes.button}>
              <span className={classes.text}>Sign in with Google</span>
              <Google className={classes.rightIcon} />
            </Button>
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <Button color="success" className={classes.button}>
              <span className={classes.text}>Login with Github</span>
              <GitHub className={classes.rightIcon} />
            </Button>
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <Button color="info" className={classes.button}>
              <span className={classes.text}>Login with Facebook</span>
              <Facebook className={classes.rightIcon} />
            </Button>
          </GridItem>
        </Grid>
      </CardBody>
      <CardFooter stats>
        <span className={classes.footText} color="info">
          Alchemist Login
        </span>
      </CardFooter>
    </Card>
  );
};

const style = {
  margin: 15
};
export default withStyles(styles)(GridLogin);
