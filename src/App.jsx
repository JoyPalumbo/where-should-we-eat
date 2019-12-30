//! dot you are working on the on change function for the group name input there seem
//! to be a problem with event.target.value, event is undefined
//! need to figure out what react magic you want
import React from 'react';
import axios from 'axios';
import Preferences from './Preferences.jsx';
import SignIn from './SignIn.jsx';
import Header from './Header.jsx';
import Home from './Home.jsx';
import CreateGroup from './CreateGroup.jsx';
import UserSettings from './UserSettings.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      user: 'newUser',
      groups: [1, 2, 3, 4, 5],
      dietaryRestriction: 'none',
      image: null,
      group: {
        groupName: null,
        pricePoint: '',
      },
    };

    this.HandleViewChange = this.HandleViewChange.bind(this);
    this.HandlePreferenceChange = this.HandlePreferenceChange.bind(this);
    this.HandleSignInWithGoogle = this.HandleSignInWithGoogle.bind(this);
    this.HandleNewGroupName = this.HandleNewGroupName.bind(this);
    this.HandleNewGroupPricePoint = this.HandleNewGroupPricePoint.bind(this);
    this.HandleNewGroupSubmit = this.HandleNewGroupSubmit.bind(this);
    this.HandleUserSettings = this.HandleUserSettings.bind(this);
  }

  HandleViewChange(view) {
    console.log(`${view} button clicked`);
    this.setState({ view: `/${view}` }, () => {
    });
  }

  HandleSignInWithGoogle() {
    //! Being checked with Auth Dec 29
    axios.get('/api/login')
      .then(console.log('success'))
      .then(this.setState({ user: 'DOT' }))
      .then(this.HandleViewChange('/userSettings'))
      .catch((err) => {
        console.log('error in handsigninwithgoogle', err);
      // send error back to client
      });
  }

  HandleUserSettings(k, v) {
    axios.post(`/api/users/:${this.state.user}/${k}`, {
      k: v,
    }).then(
      this.setState({ [k]: v }),
    )
      .then(
        console.log('Yay'),
      )
      .catch((err) => {
        console.error('error handleprefeerence change', err);
      });
  }

  HandlePreferenceChange(k, v) {
    axios.patch(`/api/users/:${this.state.user}/${k}`, {
      k: v,
    })
      .then(
        this.setState({ [k]: v }),
      )
      .then(
        console.log('Yay'),
      )
      .catch((err) => {
        console.error('error handleprefeerence change', err);
      });
  }

  HandleNewGroupPricePoint(newPricePoint) {
    this.setState({
      group: {
        groupName: this.state.group.groupName,
        pricePoint: newPricePoint,
      },
    });
    console.log(this.state);
  }

  HandleNewGroupSubmit() {
    const { groupName, pricePoint } = this.state.group;
    axios.post('/api/groups', {
      groupName,
      pricePoint,
      userName: this.state.user,
    })
      .catch((err) => {
        console.error('submiterr', err);
      });
  }

  HandleNewGroupName(e) {
    this.setState({
      group: {
        groupName: e.target.value,
        pricePoint: this.state.group.pricePoint,
      },
    });
  }


  render() {
    const { view, groups } = this.state;
    const {
      HandlePreferenceChange, HandleViewChange, HandleSignInWithGoogle, HandleNewGroupName, HandleNewGroupPricePoint, HandleNewGroupSubmit, HandleUserSettings
    } = this;
    let View;
    if (view === '/login') {
      View = <SignIn HandleSignInWithGoogle={HandleSignInWithGoogle}/>;
    } else if (view === '/profile') {
      View = <Preferences PreferenceChange={HandlePreferenceChange}/>;
    } else if (view === '/createGroup') {
      View = <CreateGroup
      HandleViewChange={HandleViewChange}
      HandleNewGroupName={HandleNewGroupName}
      HandlePreferenceChange={HandlePreferenceChange}
      HandleNewGroupPricePoint={HandleNewGroupPricePoint}
      HandleNewGroupSubmit={HandleNewGroupSubmit}
      />;
    } else if (view === '/userSetting') {
      View = <UserSettings HandleUserSettings={HandleUserSettings}/>;
    } else {
      View = <Home groups={groups}/>;
    }

    return (
            <div>
                <Header HandleViewChange={HandleViewChange} />
                {View}
        </div>

    );
  }
}


export default App;
