import React from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { Menu, Button, Image } from "semantic-ui-react";
import { setCurrentUser } from "../actions/user";
import { connect } from "react-redux";

function Nav(props) {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    props.setCurrentUser(null);
  };
  return (
    <div>
      {props.user ? (
        <Menu>
          <Menu.Item header as={NavLink} to="/" active="false">
            <Image size="mini" src="/logo.png"></Image>
          </Menu.Item>

          <Menu.Item as={NavLink} to="/browse-books" name="Browse Books" />
          <Menu.Item as={NavLink} to="/browse-clubs" name="Browse Clubs" />
          <Menu.Item as={NavLink} to="/create-club" name="Create Club" />

          <Menu.Menu position="right">
            <Menu.Item
              as={NavLink}
              to={`/users/${props.user.id}`}
              name={props.user.username}
            >
              <Image size="mini" src={props.user.avatar} />
              {props.user.username}
            </Menu.Item>
            <Menu.Item>
              <Link to="/" onClick={logout}>
                <Button primary>Log Out</Button>
              </Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      ) : (
        <div>
          <Menu>
            <Menu.Item header as={NavLink} to="/" active="false">
              <Image size="mini" src="/logo.png"></Image>
            </Menu.Item>
            <Menu.Item as={NavLink} to="/browse-books" name="Browse Books" />
            <Menu.Item
              as={NavLink}
              to="/browse-clubs"
              name="Browse Clubs"
              // active={pathname === "/browse-groups"}
            />
            <Menu.Menu position="right">
              <Menu.Item>
                <Link to="/login">
                  <Button primary>Sign In</Button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/create-account">
                  <Button primary>Sign Up</Button>
                </Link>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // user: state.user.user,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
