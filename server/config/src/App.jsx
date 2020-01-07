// temp state for username and permstate on submit
import React from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import RemoveUserForm from './RemoveUserForm.jsx.js';
import Preferences from './Preferences.jsx.js';
import SignIn from './SignIn.jsx.js';
import Header from './Header.jsx.js';
import Home from './Home.jsx.js';
import CreateGroup from './CreateGroup.jsx.js';
import UserSettings from './UserSettings.jsx.js';
import Group from './Group.jsx.js';
import AddUserForm from './AddUserForm.jsx.js';
import Options from './Options.jsx.js';
import './App.css';
import Title from './TitlePage.jsx.js';
import AltHeader from './AltHeader.jsx.js';

/**
 * these are the avatar options a user can select from when creting an account
 */
const userImages = {
  oppossum: 'https://cdn.discordapp.com/attachments/635332255178424335/661017399109353502/image3.jpg',
  koala: 'https://cdn.discordapp.com/attachments/635332255178424335/661017399109353505/image4.jpg',
  kangaroo: 'https://cdn.discordapp.com/attachments/635332255178424335/661017398496854075/image2.jpg',
  bilby: 'https://cdn.discordapp.com/attachments/635332255178424335/661017398496854074/image1.jpg',
  sugarGlider: 'https://cdn.discordapp.com/attachments/635332255178424335/661017398068903937/image0.jpg',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      view: 'titlepage',
      user: '',
      userStatus: '',
      groups: [],
      userImages,
      dietaryRestriction: '',
      image: '',
      groupName: '',
      pricePoint: '',
      members: [],
      newMember: '',
      options: [],
      categories: '',
      chooser: '',
      choiceId: '',
      choiceName: '',
      choiceLat: '',
      choiceLng: '',
      choiceAddress: '',
      chosen: false,
      showWinner: false,
      open: false,
      login: false,
      directionsPopup: false,
      users: [],
    };
    this.getGroupMembers = this.getGroupMembers.bind(this);
    this.getGroupPricePoint = this.getGroupPricePoint.bind(this);
    this.getUsersGroups = this.getUsersGroups.bind(this);
    this.handleAddUserToGroup = this.handleAddUserToGroup.bind(this);
    this.handleCategoriesInput = this.handleCategoriesInput.bind(this);
    this.handleChooseOption = this.handleChooseOption.bind(this);
    this.handleGetOptions = this.handleGetOptions.bind(this);
    this.handleGroupSetState = this.handleGroupSetState.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleNewGroupMember = this.handleNewGroupMember.bind(this);
    this.handleNewGroupName = this.handleNewGroupName.bind(this);
    this.handleNewGroupPricePoint = this.handleNewGroupPricePoint.bind(this);
    this.handleNewGroupSubmit = this.handleNewGroupSubmit.bind(this);
    this.handlePreferenceChange = this.handlePreferenceChange.bind(this);
    this.handleRemoveUserFromGroup = this.handleRemoveUserFromGroup.bind(this);
    this.handleSetState = this.handleSetState.bind(this);
    this.handleSignInWithGoogle = this.handleSignInWithGoogle.bind(this);
    this.handleSignOutWithGoogle = this.handleSignOutWithGoogle.bind(this);
    this.handleSubmitPreferences = this.handleSubmitPreferences.bind(this);
    this.handleUserNameInput = this.handleUserNameInput.bind(this);
    this.handleUserSettings = this.handleUserSettings.bind(this);
    this.handleUserStatusInput = this.handleUserStatusInput.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.randomizer = this.randomizer.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  toggleDialog(type) {
    // toggles error dialog box
    if (this.state[type] === false) {
      this.setState({ [type]: true });
    } else {
      this.setState({ [type]: false });
    }
  }

  /**
   * `handleViewChange`is called when the user clickson a
   * button that would logically tke them to a new "page".
   * the <view> property in state is change, which dynamically
   * renders one of the views that start on line 388.
   */
  async handleViewChange(view) {
    console.log(`${view} button clicked`);
    if (view === 'home') {
      await this.getUsersGroups(this.state.user);
      await this.setState({ view: `/${view}` });
    }
    else if (view === 'createGroup') {
      await this.setState({ view: `/${view}` });
    }
    else if (view !== 'profile') {
      this.getUsersGroups(this.state.user);
      await this.getGroupMembers(this.state.groupName);
      await this.getAllUsers();
      await this.setState({ view: `/${view}` });
    }
    else {
      await this.setState({ view: '/profile' });
    }
  }

  handleLoginClick() {
    this.handleSignInWithGoogle();
  }

  handleSignInWithGoogle() {
    return window.open('/api/login', '_blank');
  }

  handleSignOutWithGoogle() {
    axios.get('/api/logout')
      .then(this.handleViewChange('/login'))
      .catch(() => {
        this.toggleDialog('open');
      });
  }

  getAllUsers() {
    axios.get('/api/users')
      .then((response) => {
        this.setState({ users: response });
      })
      .catch(() => {
        this.toggleDialog('open');
      });
  }

  handleCategoriesInput(e) {
    const categories = e.target.value;
    this.setState({ categories: categories });
  }

  handleGetOptions() {
    const { groupName, categories } = this.state;
    console.log(categories);
    console.log(groupName);
    axios.get(`/api/choices/${groupName}/${categories}`, {
      params: {
        groupName,
        categories,
      },
    })
      .then((response) => {
        console.log(response);
        const { data } = response;
        this.setState({
          options: data,
        });
      }).then(() => {
        this.handleViewChange('options');
      })
      .catch((error) => {
        console.log(error);
        this.toggleDialog('open');
      });
  }

  handleChooseOption(id, name, address, city, state, zipCode) {
    console.log('hey');
    // set state
    this.setState({
      choiceId: id,
      choiceName: name,
      choiceAddress: `${address} ${city} ${state} ${zipCode}`,
    });
    const { groupName } = this.state;
    // make axios request to add choice to database
    axios.post('/api/groupHistory', { id, groupName }).then(() => {
      // render group view
      console.log('hey');
      this.handleViewChange('group');
      this.setState({
        chosen: true,
        directionsPopup: true,
      });
    })
      .catch(() => {
        this.toggleDialoque('open');
      });
  }

  handleSetState(k, v) {
    this.setState([k, v]);
    console.log('here', this.state);
  }

  handleUserSettings(k, v) {
    axios.post(`/api/users/${this.state.user}/${k}`, {
      k: v,
    }).then(this.handleSetState(k, v))
      .catch(() => {
        this.toggleDialog('open');
      });
  }

  getGroupMembers(group) {
    axios.get(`/api/groups/${group}/users`)
      .then((members) => {
        this.setState({
          members: members.data,
        });
      })
      .catch(() => {
        this.toggleDialog('open');
      });
  }

  getGroupPricePoint(group) {
    axios.get(`/api/groups/${group}/pricePoint`)
      .then((response) => {
        const { pricePoint } = response.data[0];
        this.setState({
          pricePoint,
        });
      })
      .catch(() => {
        this.toggleDialog();
      });
  }

  randomizer() {
    const { members, groupName } = this.state;
    const memberIndex = Math.floor(Math.random() * (members.length));
    const theChosen = members[memberIndex].userName;
    this.setState({ chooser: theChosen, showWinner: true });
    axios.post((`/api/groups/${groupName}`)).then(() => {
      console.log('hey');
    }).catch(() => {
      this.toggleDialog();
    });
  }

  placeRandomizer() {
    const { options } = this.state;
    const optionIndex = Math.floor(Math.random() * (options.length));
    // const theChoice = options[optionIndex].userName;
    // this.setState({ chooser: theChosen, showWinner: true });
    // axios.post((`/api/groups/${groupName}`)).then(() => {
    //   console.log('hey');
    // }).catch(() => {
    //   this.toggleDialog();
    // });
  }

  handlePreferenceChange(k, v) {
    this.setState({ [k]: v });
  }

  handleNewGroupPricePoint(newPricePoint) {
    this.setState({
      pricePoint: newPricePoint,
    });
  }

  handleNewGroupSubmit() {
    const {
      groupName, pricePoint, user,
    } = this.state;
    axios.post('/api/groups', {
      groupName,
      pricePoint,
      userName: user,
    })
      .catch(() => {
        this.toggleDialog('open');
      });
  }

  handleNewGroupName(e) {
    this.setState({
      groupName: e.target.value,
    });
  }

  handleGroupSetState(groupName) {
    this.setState({ groupName });
  }

  getUsersGroups(user) {
    axios.get(`/api/users/${user}/groups`)
      .then((groupList) => {
        this.setState({ groups: groupList });
      }).catch(() => {
        this.toggleDialog('open');
      });
  }

  resetGameState() {
    this.setState({
      chooser: '',
      showWinner: false,
    });
  }

  // handlePass() {
  //   // this.setState()
  //   this.handleViewChange('group');

  // }

  handleNewGroupMember(e) {
    this.setState({ newMember: e.target.value });
  }

  handleUserNameInput(e) {
    const user = e.target.value;
    this.setState({ user });
  }

  handleSubmitPreferences(method) {
    const { user, image, dietaryRestriction } = this.state;
    const dietaryRestrictionArr = [dietaryRestriction];
    if (method === 'post') {
      axios.post('/api/users', { userName: user })
        .then(() => axios.post(`/api/users/${user}/dietaryRestrictions`, { restrictions: dietaryRestrictionArr }))
        .then(() => axios.post(`/api/users/${user}/image`, { image }))
        .then(() => {
          axios.post(`/api/users/${this.state.user}/userName`, {
            userStatus: '',
          });
        })
        .catch(() => {
          this.toggleDialog('open');
        });
    } else if (method === 'patch') {
      axios.patch(`/api/users/${user}/dietaryRestrictions`, { restrictions: dietaryRestrictionArr })
        .then(() => axios.patch(`/api/users/${user}/image`, { image }))
        .then(() => {
          axios.patch(`/api/users/${this.state.user}/userName`, {
            userStatus: this.state.status,
          });
        })
        .catch(() => {
          this.toggleDialog('open');
        });
    }
  }

  handleAddUserToGroup() {
    axios.post('/api/user_group', {
      userName: this.state.newMember,
      groupName: this.state.groupName,
    })
      .catch(() => {
        this.toggleDialog('open');
      });
  }

  handleRemoveUserFromGroup(userName) {
    axios.delete(`/api/groups/${this.state.newMember}`, {
      userName: this.state.newMember,
      groupName: this.state.groupName,
    });
  }

  handleUserStatusInput(e) {
    this.setState({ userStatus: e.target.value });
  }

  render() {
    const {
      view, groups, group, members,
      options, groupName, pricePoint, open, directionsPopup,
      chooser, choiceId, choiceName, choiceAddress, chosen, userStatus, userImage,
      showWinner, user, userImages, dietaryRestriction, users, tempMember,
    } = this.state;
    const {
      randomizer, getGroupMembers, getGroupPricePoint, handleGroupSetState, handleGetOptions,
      handleChooseOption, handlePreferenceChange, handleSubmitPreferences, handleCategoriesInput,
      handleNewGroupMember, handleSetState, handleAddUserToGroup, handleViewChange,
      handleLoginClick, toggleLoginDialog, handleSignInWithGoogle, handleNewGroupName,
      handleNewGroupPricePoint, handleRemoveUserFromGroup, handleNewGroupSubmit, handleUserSettings, handleUserNameInput,
      handleDietaryRestrictionsSetState, handleUserStatusInput, toggleDialog, handlePass, handleSignOutWithGoogle,
    } = this;
    /**
     * The following lines handle view changes.
     * When a user clicks on a button that should logically bring them to a new section
     * of the site, the state's property <view> is changed with the function `handleViewChange`
     * , and different components are rendered accordingly.
     */
    let View;
    if (view === '/login') {
      View = <SignIn handleSignInWithGoogle={handleSignInWithGoogle} />;
    } else if (view === '/profile') {
      View = <Preferences
        koala={'https://cdn.discordapp.com/attachments/635332255178424335/661017399109353505/image4.jpg'}
        oppossum={'https://cdn.discordapp.com/attachments/635332255178424335/661017399109353502/image3.jpg'}
        bilby={'https://cdn.discordapp.com/attachments/635332255178424335/661017398496854074/image1.jpg'}
        kangaroo={'https://cdn.discordapp.com/attachments/635332255178424335/661017398496854075/image2.jpg'}
        sugarGlider={'https://cdn.discordapp.com/attachments/635332255178424335/661017398068903937/image0.jpg'}
        handleDietaryRestrictionsSetState={handleDietaryRestrictionsSetState}
        handleUserStatusInput={handleUserStatusInput}
        handleSignInWithGoogle={handleSignInWithGoogle}
        handleSetState={handleSetState}
        handleViewChange={handleViewChange}
        handlePreferenceChange={handlePreferenceChange}
        handleSubmitPreferences={handleSubmitPreferences}
        handleUserNameInput={handleUserNameInput}
        userImages={userImages} />;
    } else if (view === '/createGroup') {
      View = <CreateGroup
        handleViewChange={handleViewChange}
        handleNewGroupName={handleNewGroupName}
        handlePreferenceChange={handlePreferenceChange}
        handleSetState={handleSetState}
        handleNewGroupPricePoint={handleNewGroupPricePoint}
        handleNewGroupSubmit={handleNewGroupSubmit}
        handleAddUserToGroup={handleAddUserToGroup}
        koala={'https://cdn.discordapp.com/attachments/635332255178424335/661017399109353505/image4.jpg'}
        oppossum={'https://cdn.discordapp.com/attachments/635332255178424335/661017399109353502/image3.jpg'}
        bilby={'https://cdn.discordapp.com/attachments/635332255178424335/661017398496854074/image1.jpg'}
        kangaroo={'https://cdn.discordapp.com/attachments/635332255178424335/661017398496854075/image2.jpg'}
        sugarGlider={'https://cdn.discordapp.com/attachments/635332255178424335/661017398068903937/image0.jpg'}
        handleDietaryRestrictionsSetState={handleDietaryRestrictionsSetState}
        handleUserStatusInput={handleUserStatusInput}
        handleSignInWithGoogle={handleSignInWithGoogle}
        handleSubmitPreferences={handleSubmitPreferences}
        users={users}
        handleUserNameInput={handleUserNameInput} />;
    } else if (view === '/home') {
      View = <Home
        groups={groups}
        user={user}
        getGroupMembers={getGroupMembers}
        getGroupPricePoint={getGroupPricePoint}
        handleViewChange={handleViewChange}
        handleGroupSetState={handleGroupSetState} />;
    } else if (view === '/userSetting') {
      View = <UserSettings
        koala={'https://cdn.discordapp.com/attachments/635332255178424335/661017399109353505/image4.jpg'}
        oppossum={'https://cdn.discordapp.com/attachments/635332255178424335/661017399109353502/image3.jpg'}
        bilby={'https://cdn.discordapp.com/attachments/635332255178424335/661017398496854074/image1.jpg'}
        kangaroo={'https://cdn.discordapp.com/attachments/635332255178424335/661017398496854075/image2.jpg'}
        sugarGlider={'https://cdn.discordapp.com/attachments/635332255178424335/661017398068903937/image0.jpg'}
        handleDietaryRestrictionsSetState={handleDietaryRestrictionsSetState}
        handleUserStatusInput={handleUserStatusInput}
        handleSignInWithGoogle={handleSignInWithGoogle}
        handleSetState={handleSetState}
        handleViewChange={handleViewChange}
        handlePreferenceChange={handlePreferenceChange}
        handleSubmitPreferences={handleSubmitPreferences}
        handleUserNameInput={handleUserNameInput}
        userImages={userImages} />;
    } else if (view === '/group') {
      View = <Group user={user}
        userImages={userImages}
        group={group} groupName={groupName}
        groupMembers={members}
        pricePoint={pricePoint}
        handleGetOptions={handleGetOptions}
        handleCategoriesInput={handleCategoriesInput}
        getGroupMembers={getGroupMembers}
        getGroupPricePoint={getGroupPricePoint}
        handleViewChange={handleViewChange}
        randomizer={randomizer}
        chooser={chooser}
        showWinner={showWinner}
        directionsPopup={directionsPopup}
        toggleDialog={toggleDialog}
        choiceAddress={choiceAddress}
        users={users}
        choiceName={choiceName} />;
    } else if (view === '/addUserToGroup') {
      View = <AddUserForm
        users={users} tempMember={tempMember}
        handleViewChange={handleViewChange}
        handleNewGroupMember={handleNewGroupMember}
        handleAddUserToGroup={handleAddUserToGroup} />;
    } else if (view === '/removeUserFromGroup') {
      View = <RemoveUserForm
        users={users} tempMember={tempMember}
        handleViewChange={handleViewChange}
        handleNewGroupMember={handleNewGroupMember}
        handleRemoveUserFromGroup={handleRemoveUserFromGroup} />;
    } else if (view === '/options') {
      View = <Options
        options={options}
        handlePass={handlePass}
        handleChooseOption={handleChooseOption} />;
    } else {
      View = <Home
        groups={groups}
        getGroupMembers={getGroupMembers}
        handleViewChange={handleViewChange}
        handleGroupSetState={handleGroupSetState}
        userImage={userImage} />;


      View = <Title handleViewChange={handleViewChange} />;
    }

    return (
      <div>
        <div>
          <Header handleViewChange={handleViewChange} handleSignInWithGoogle={handleLoginClick} handleSignOutWithGoogle={handleSignOutWithGoogle} />
        </div>
        <Dialog onBackdropClick={() => { toggleDialog(); }} open={this.state.open}>
          <DialogTitle>Sorry {user} an error has occurred</DialogTitle>
        </Dialog>
        <Dialog onBackdropClick={() => { toggleLoginDialog(); }} open={this.state.login}>
          <DialogTitle>Welcome {user} You have signed in</DialogTitle>
        </Dialog>
        {View}
      </div>

    );
  }
}

export default App;
