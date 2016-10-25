import React, { Component } from 'react';
import base from '../config/Firebase';

import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';



const styles = {
  button: {
    margin: 12
  }
};

class LyricsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stanzaCnt: '',
      firstStanza: '',
      secondStanza: '',
      thirdStanza: '',
      fourthStanza: '',
      chorus: '',
      songNo: null,
      showAlert: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlesongNoSelection = this.handlesongNoSelection.bind(this);
    this.handleStanzaChange = this.handleStanzaChange.bind(this);
    this.handleFirstStanzaChange = this.handleFirstStanzaChange.bind(this);
    this.handleSecondStanzaChange = this.handleSecondStanzaChange.bind(this);
    this.handleThirdStanzaChange = this.handleThirdStanzaChange.bind(this);
    this.handleFourthStanzaChange = this.handleFourthStanzaChange.bind(this);
    this.handleChorusChange = this.handleChorusChange.bind(this);
    this.handleAlertClose = this.handleAlertClose.bind(this);
  }
  componentWillMount() {

  }

  getNoOfStanza() {
    let stanzaCnt = 0;
    stanzaCnt += this.state.firstStanza === '' ? 0 : 1;
    stanzaCnt += this.state.secondStanza === '' ? 0 : 1;
    stanzaCnt += this.state.thirdStanza === '' ? 0 : 1;
    stanzaCnt += this.state.fourthStanza === '' ? 0 : 1;
    return stanzaCnt;
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    if(this.state.songNo != null) {
      base.post(`songs/${this.state.songNo}`, {
        data: {
          stanzaCnt: this.getNoOfStanza(),
          firstStanza: this.state.firstStanza,
          secondStanza: this.state.secondStanza,
          thirdStanza: this.state.thirdStanza,
          fourthStanza: this.state.fourthStanza,
          chorus: this.state.chorus,
          songNo: this.state.songNo,
         }
      })
      .then(() => {
        console.log('successfully updated');
      }).catch(err => {
        // handle error
      });
    }else {
      this.setState({
        showAlert: true
      })
    }

  }

  handlesongNoSelection(event) {
    this.setState({
      songNo: +event.target.value
    })
  }
  handleStanzaChange(event, index, value) {
    console.log(event, index, value);
    this.setState({ stanzaCnt: value });
  }
  handleFirstStanzaChange(event) {
    this.setState({
      firstStanza: event.target.value.trim()
    });
  }
  handleSecondStanzaChange(event) {
    this.setState({
      secondStanza: event.target.value.trim()
    });
  }
  handleThirdStanzaChange(event) {
    this.setState({
      thirdStanza: event.target.value.trim()
    });
  }
  handleFourthStanzaChange(event) {
    this.setState({
      fourthStanza: event.target.value.trim()
    });
  }
  handleChorusChange(event) {
    this.setState({
      chorus: event.target.value.trim()
    });
  }
  handleAlertClose() {
    this.setState({
      showAlert: false
    })
  }


render() {
  const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleAlertClose}
      />,
    ];

  return (
    <div>
      <Dialog
          actions={actions}
          modal={false}
          open={this.state.showAlert}
          onRequestClose={this.handleAlertClose}
        >
          Song No Cannot Be Empty
        </Dialog>
      <form onSubmit={this.handleSubmit}>
        <TextField
          hintText="Song Number"
          floatingLabelText="Song Number"
          type="number"
          onChange={this.handlesongNoSelection}
          /><br />
        <TextField
          hintText="First Stanza"
          fullWidth={true}
          multiLine={true}
          onChange={this.handleFirstStanzaChange}
          />

        <TextField
          hintText="Second Stanza"
          fullWidth={true}
          multiLine={true}
          onChange={this.handleSecondStanzaChange}
          />

        <TextField
          hintText="Third Stanza"
          fullWidth={true}
          multiLine={true}
          onChange={this.handleThirdStanzaChange}
          />

        <TextField
          hintText="Fourth Stanza"
          fullWidth={true}
          multiLine={true}
          onChange={this.handleFourthStanzaChange}
          />

          <TextField
            hintText="chorus"
            fullWidth={true}
            multiLine={true}
            onChange={this.handleChorusChange}
          />

        <RaisedButton label="Submit" primary={true} style={styles.button} type="submit" />
      </form>
    </div>
  )
}

}
export default LyricsForm