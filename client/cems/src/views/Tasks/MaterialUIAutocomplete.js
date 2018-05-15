import React, {Component} from 'react';
import {connect} from 'react-redux';
import { change } from 'redux-form';
import AutoComplete from 'material-ui/AutoComplete';
import {getFirmsService} from '../../reducers/task';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {getFirms,updateSelectedFirm} from '../../reducers/firm';
import "babel-polyfill";
const muiTheme = getMuiTheme({});

import JSONP              from 'jsonp';

const googleAutoSuggestURL = `
  //suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=`;
  // const googleAutoSuggestURL =`${baseUrl}/firm/get-firm?firmName=`;


class MaterialUIAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    // this.getFirms-this.getFirms.bind(this);
    this.state = {
      dataSource : [],
      inputValue : '',
      searchResults:[]
    }
  }
  
  
  onUpdateInput(inputValue) {
    const self = this;
    this.setState({
      inputValue: inputValue      
    }, function() {
      self.performSearch();
    });
  }

  async performSearch() {
    const
      self = this,
      url  = googleAutoSuggestURL + this.state.inputValue;

    if(this.state.inputValue !== '') {
      
      await this.props.getFirms(this.state.inputValue);      
      this.setState({searchResults: this.props.firms});
      this.setState({
        dataSource:this.props.firmNames
      });
      const firmName=this.state.inputValue;      
      const firmNumber=this.props.firms.filter(firm=>firm.name===firmName).map(firm=>firm.firmNumber)[0];
      if(firmNumber)
        this.props.updateSelectedFirm({firmName:firmName,firmNumber:firmNumber,firmFound:true});
      else
       this.props.updateSelectedFirm({firmName:firmName,firmNumber:firmNumber,firmFound:false});
    }
  }

  render() {
    // console.log("This state Input value ",this.state.inputValue);
    // console.log("selected object --||-- ",this.state.searchResults.filter(firm=>firm.name===this.state.inputValue))
    // const firmNo=this.state.searchResults.filter(firm=>firm.name===this.state.inputValue).map(firm=>firm.firmNumber);
    // console.log("firmNo ......", firmNo[0]);
    
    return <MuiThemeProvider muiTheme={muiTheme} >
      <AutoComplete
        dataSource    = {this.state.dataSource}
        onUpdateInput = {this.onUpdateInput}
         />
      </MuiThemeProvider>
  }
}


export default connect(
  (state, ownProps) => ({firms:state.firm.firms,firmNames:state.firm.firmNames}),
  {getFirms,updateSelectedFirm}
)(MaterialUIAutocomplete)