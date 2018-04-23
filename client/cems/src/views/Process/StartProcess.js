

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';
import {getFirmsService} from '../../reducers/task';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {getFirms,updateSelectedFirm} from '../../reducers/firm';
import "babel-polyfill";
const muiTheme = getMuiTheme({});
import NewProcessForm from '../../components/NewProcessForm';
import showResults from './showResults';
import { Values } from 'redux-form-website-template';
import MaterialUIAutocomplete from '../Tasks/MaterialUIAutocomplete';
import {getDefinitions} from '../../reducers/processDefinitions';
import {postProcessForm} from '../../lib/newProcessFormService';
import DefaultUpload from '../../components/DefaultUpload';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
// import {Badge, Row, Col, Card, CardHeader, CardFooter, CardBody, Label, Input} from 'reactstrap';


  class StartProcess extends React.Component{
   constructor(props){
     super(props);
     this.state={googleUrl:""};
   }

   componentWillMount(){
    this.props.getDefinitions();
   }
   
    render(){
      const file = 'https://storage.googleapis.com/siyandiza/lift-wage-table-2017.pdf'
const type = 'pdf'
      const updateUrl=(file)=>{
        const googleUrl=file.xhr.response;
        this.setState({googleUrl:googleUrl})
      }
   const   submitProcessFrom=(values)=>{
  if(values.firms||values.firms.length>0){
    postProcessForm(values);
  }
  else
    alert("the firm value is null")
   }
       console.log("Difinitions sssssss",this.props.difinitions) 
        return(
            <div>
    <MuiThemeProvider muiTheme={muiTheme} >
       <Card>
       {/* <CardHeader
      title="Start Process Whith AAA"
      subtitle="Subtitle"
     
    /> */}
          <CardTitle>
            Start Process
            <p>  {this.state.googleUrl} </p>
          </CardTitle>
        
         <CardText>
         <FileViewer
        fileType={type}
        filePath={file}
        errorComponent={CustomErrorComponent}
        onError={this.onError} />
    
           <MaterialUIAutocomplete />
           <DefaultUpload updateUrl={updateUrl} />
           <h1>{this.props.selectedFirm.firmNumber}</h1>
           <NewProcessForm firmNumber={this.props.selectedFirm.firmNumber}
            firmFound={this.props.selectedFirm.firmFound} definitions={this.props.definitions} onSubmit={submitProcessFrom} />
               <Values form="NewProcessForm" />  

           
          </CardText>
        </Card>
        </MuiThemeProvider >
                </div>
        )
    }
}

export default connect((state)=>({firms:state.firm.firms,selectedFirm:state.firm.selectedFirm,definitions:state.definitions.definitions}),{getDefinitions})(StartProcess);

