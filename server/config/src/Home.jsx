import React from 'react';
import { Avatar } from '@material-ui/core';
import GroupItem from './GroupItem.jsx.js';
import './App.css';

/**
 * 
 * The Home component is properly rendered after a user creates an account and clicks on Home.
 * It lists their Groups.
 */

const Home = (props) => {
  const {
    groups, handleViewChange, user, handleGroupSetState, userImage, getGroupMembers, getGroupPricePoint, userImages,
  } = props;
  return (
    <div>
      <div>
        Home
      </div>
      <div>
        <h1>hi {user}!</h1>
        <Avatar src={userImage} />
      </div>
      <h2>your groups:</h2>
      <div> {groups.length === 0
        ? <h1></h1>
        : <div>
          {groups.data.map((group) => <GroupItem
            className="homeGroupItem"
            key={group.groupName}
            groupName={group.groupName}
            userImages={userImages}
            handleViewChange={handleViewChange}
            handleGroupSetState={handleGroupSetState}
            getGroupPricePoint={getGroupPricePoint}
            getGroupMembers={getGroupMembers} />)}
        </div>
      }

      </div>
    </div>
  );
};

export default Home;
