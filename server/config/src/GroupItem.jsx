import React from 'react';

/**
 * GroupItems are rendered on the user's Home page to list
 * each Group a user belongs to.
 * Clicking on a group name will render the Group page for that Group.
 */

const GroupItem = (props) => {
  const {
    handleViewChange, groupName, handleGroupSetState, getGroupMembers, getGroupPricePoint
  } = props;
  const clickFunction = async () => {
    handleGroupSetState(groupName);
    // await getGroupMembers(groupName);
    await getGroupPricePoint(groupName);
    await handleViewChange('group');
  };
  return (
      <div onClick={() => { clickFunction(); }}>
          <h2>{groupName}</h2>
      </div>
  );
};

export default GroupItem;
