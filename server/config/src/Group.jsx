import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import GroupMember from './GroupMember.jsx.js';

/**
 * This is the component that is rendered when a user clicks on one of their groups
 * from their home page.
 *
 * A user can click Start Game to initiate a decision making 'game,'
 * If the user is randomly chosen as the decision maker, they will be presented with an
 * input form and a button, Show Options. They can optionally put something in the input form
 * to add a parameter to the Yelp API query that will result from them clicking the Show Options button.
 * Clicking the Show Options button renders the Options view/component, which will have a list of five
 * restaurant choices for them to choose.
 * 
 * We were attempting to make this stateful in order
 * to implement occasional rerendering of state based on changes to the database,
 * but that is not a currently active feature.
 */
class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: '',
    };
  }

  render() {
    const {
      user, groupName, pricePoint, groupMembers,
      handleViewChange, userImages, handleGetOptions,
      choiceName, choiceAddress, randomizer, chooser, showWinner,
      toggleDialog, directionsPopup, handleCategoriesInput,
    } = this.props;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${choiceName} ${choiceAddress}`;
    return (
      <div>
        <h1>{groupName}</h1>
        <h2>Price point: {pricePoint}</h2>
        <br />
        <div> {showWinner === true
          ? <h1>{chooser} is the lucky Decision Maker</h1>
          : <div>
              <h2>Click Start Game to choose the Decision Maker</h2>
            </div>}
        </div>
        <div> {user === chooser
          ? <div>
              <input id='categories' type='text' onChange={handleCategoriesInput} />
              <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => { handleGetOptions(); }}>Show Options</Button>
            </div>
          : <h2></h2>}
        </div>
      <Dialog onBackdropClick={() => { toggleDialog('directionsPopup'); }} open={directionsPopup}>
          <DialogTitle>{chooser} chose {choiceName}.</DialogTitle>
          <Link href={mapsUrl} target="_blank" rel="noreferrer">Click here for directions.</Link>
        </Dialog>
        <ul>
          {groupMembers.map((groupMember) => <GroupMember userImages={userImages} groupMember={groupMember} />)}
        </ul>
        <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => { handleViewChange('addUserToGroup'); }}>Add Group Member</Button>
        <Button style={{ background: '#9900cc', color: 'white' }} onClick={() => { randomizer(); }}>Start Game</Button>
      </div>
    );
  }
}

export default Group;
