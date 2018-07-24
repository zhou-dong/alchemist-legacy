import React from "react";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";

import avatar from "assets/img/faces/marc.jpg";
import Person from "@material-ui/icons/Person";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cardTitle: {
    fontSize: "16px"
  },
  description: {
    fontSize: "14px"
  }
};

const mapStateToProps = (state, ownProps) => ({
  user: state.updateUserReducer.user
});

const mapDispatchToProps = dispatch => {
  dispatch({ type: "GET_USER" });
  return { updateUser: () => dispatch({ type: "UPDATE_USER", user: {} }) };
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
};

const getUsername = user => (user && user.username) || "Username";
const getEmail = user => (user && user.email) || "Email address";
const getAvatar = user => (user && user.avatar) || avatar;

const getUserImage = user => {
  if(user && user.avatar){
    return <img src={getAvatar(user)} alt={getUsername(user)} />;
  } else {
    return <Person />;
  }
}

function UserProfile(props) {
  const { classes } = props;
  const { user } = props;
  return (
    <div>
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                {getUserImage(user)}
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{getUsername(user)}</h4>
              <p className={classes.description}>{getEmail(user)}</p>
              <Button disabled round>Follow</Button>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserProfile));
export const updateUserReducer = reducer;
