import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

const PurpleRadio = withStyles({
  root: {
    color: deepPurple[400],
    '&$checked': {
      color: deepPurple[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

/**
 *
 * The Preferences view is rendered after they click Create an Account on the Title page.
 * After choosing their preferences (which are stored in the database), they are asked to authenticate
 * with Google, which opens a new window. The original window will take them to their Home page.
 *
 */

const Preferences = (props) => {
  const {
    handlePreferenceChange,
    koala, bilby, kangaroo, sugarGlider,
    oppossum,
    handleSignInWithGoogle,
    handleSubmitPreferences,
    handleUserNameInput,
    handleViewChange,
  } = props;
  const onclick = () => {
    handleSubmitPreferences('post');
    handleSignInWithGoogle();
    handleViewChange('home');
  };
  return (
    <div>
      <ul>
        <h1>Pick A User Name</h1>
        <input id='userName'type='text' onChange={handleUserNameInput}/>
        <h1>Select a User Image </h1>
        <RadioGroup row="true" aria-label="image" name="image">
          <img className='userImages' src={oppossum} width="130" height="121" border="5"/>
          <FormControlLabel className='radio'value={oppossum} control={<PurpleRadio color="#730099" />} onClick={() => handlePreferenceChange('image', 'https://cdn.discordapp.com/attachments/635332255178424335/661017399109353502/image3.jpg')}/>
          <img className='userImages' src={koala} width="130" height="121" border="5"/>
          <FormControlLabel className='radio'value={koala} control={<PurpleRadio color='#9900cc' />} onClick={() => handlePreferenceChange('image', 'https://cdn.discordapp.com/attachments/635332255178424335/661017399109353505/image4.jpg')}/>
          <img className='userImages' src={bilby} width="130" height="121" border="5"/>
          <FormControlLabel className='radio'value={bilby} control={<PurpleRadio />} onClick={() => handlePreferenceChange('image', 'https://cdn.discordapp.com/attachments/635332255178424335/661017398496854074/image1.jpg')} />
          <img className='userImages' src={kangaroo} width="130" height="121" border="5"/>
          <FormControlLabel className='radio'value={kangaroo} control={<PurpleRadio />} onClick={() => handlePreferenceChange('image', 'https://cdn.discordapp.com/attachments/635332255178424335/661017398496854075/image2.jpg')} />
          <img className='userImages' src={sugarGlider} width="130" height="121" border="5"/>
          <FormControlLabel className='radio'value={sugarGlider} control={<PurpleRadio />} onClick={() => handlePreferenceChange('image', 'https://cdn.discordapp.com/attachments/635332255178424335/661017398068903937/image0.jpg')} />
        </RadioGroup>
        <h2> Select Dietary Restrictions</h2>
        <RadioGroup defaultValue='none' aria-label="dietary restriction" name="dietary restriction">
          <FormControlLabel color='#9900cc' className='radio'value="Vegan" control={<PurpleRadio color='default' />} label="Vegan" onClick={() => handlePreferenceChange('dietaryRestriction', 'Vegan')}/>
          <FormControlLabel className='radio'value="Vegetarian" control={<PurpleRadio color='default' />} label="Vegetarian" onClick={() => handlePreferenceChange('dietaryRestriction', 'Vegetarian')} />
          <FormControlLabel className='radio'value="Kosher" control={<PurpleRadio color='default' />} label="Kosher" onClick={() => handlePreferenceChange('dietaryRestriction', 'Kosher')}/>
          <FormControlLabel className='radio'value="Gluten Free" control={<PurpleRadio color='default' />} label="Gluten Free" onClick={() => handlePreferenceChange('dietaryRestriction', 'Gluten Free')} />
          <FormControlLabel className='radio'value="Halal" control={<PurpleRadio color='default' />} label="Halal" onClick={() => handlePreferenceChange('dietaryRestriction', 'Halal')} />
          <FormControlLabel className='radio'value="None" control={<PurpleRadio color='default' />} label="None" onClick={() => handlePreferenceChange('dietaryRestriction', 'None')}/>
        </RadioGroup>
      </ul>
      <Button variant="contained" style={{ background: '#9900cc', color: 'white' }} onClick={() => { onclick(); }}>Submit & SignIn with Google</Button>
    </div>
  );
};

export default Preferences;
