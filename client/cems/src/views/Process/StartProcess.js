

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
import { Values } from 'redux-form-website-template';
import MaterialUIAutocomplete from '../Tasks/MaterialUIAutocomplete';
// import {getDefinitions} from '../../reducers/processDefinitions';
import {postProcessForm} from '../../lib/newProcessFormService';
import DefaultUpload from '../../components/DefaultUpload';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import { bindActionCreators } from 'redux'
import RegisterFirmForm from '../../components/RegisterFirmForm/RegisterFirmForm';
// import {Badge, Row, Col, Card, CardHeader, CardFooter, CardBody, Label, Input} from 'reactstrap';


  class StartProcess extends React.Component{
   constructor(props){
     super(props);
     this.state={file:[]}
   }

   componentWillMount(){
    this.props.getDefinitions();
    // this.props.dispatch("GET_DIFINITIONS")
   }
   
    render(){
      const file = 'https://storage.googleapis.com/siyandiza/lift-wage-table-2017.pdf'
const type = 'pdf'
      const updateUrl=(file)=>{
        const googleUrl=file.xhr.response;
        console.log(" googleUrl------file  --- ",file);
        
        this.setState({googleUrl:googleUrl})
      }
      const getProgress=(file)=>{
        // const googleUrl=file.xhr.response;
        let tmp=[{name:file.name,type:file.type}];
             
        let tempstate=  this.state.file.concat(tmp); 
        console.log(" getProgress------file  --- <<<<--->>>",tempstate);
        this.setState({file:tempstate})
      }
      console.log("this.state.file",this.state.file);
      
   const   submitProcessFrom=(values)=>{
  if(values.firms){
    postProcessForm(values,this.props.showMessage);
  }
  else
    alert("the firm value is null")
   }
      console.log("Props ....:::",this.props);
      
        return(
            <div>
       <Card>
       {/* <CardHeader
      title="Start Process Whith AAA"
      subtitle="Subtitle"
     
    /> */}
          <CardTitle>
            Start Process
              {/* {this.state.googleUrl.map(url=><p>url</p>)}  */}
          </CardTitle>
        
         <CardText>
         {/* <FileViewer
        fileType={type}
        filePath={file}
        errorComponent={CustomErrorComponent}
        onError={this.onError} /> */}
    
           <MaterialUIAutocomplete />
           <DefaultUpload updateUrl={updateUrl}  getProgress={getProgress}/>
           <h1>{this.props.selectedFirm.firmNumber}</h1>
           {
          //   this.props.definitions.definitions.length>0?
          //  <NewProcessForm firmNumber={this.props.selectedFirm.firmNumber}
          //   firmFound={this.props.selectedFirm.firmFound} definitions={this.props.definitions} onSubmit={submitProcessFrom} />
          //   :<h2>Loading...</h2>
          this.props.definitions.length>0?
           <RegisterFirmForm taskId="33333333" assignee="tebogos@gmail.com"
             taskType="Register" onSubmit={submitProcessFrom} />
            :<h2>Loading...</h2>
           }

               <Values form="NewProcessForm" />  

           
          </CardText>
        </Card>
                </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
  return {
    getDefinitions: () => dispatch({ type: "GET_DIFINITIONS" }),
    showMessage:(message)=>dispatch({type:"SHOW_MESSAGE",payload:message})
  };
};

export default connect((state)=>({firms:state.firm.firms,selectedFirm:state.firm.selectedFirm,definitions:state.definitions.definitions}),mapDispatchToProps)(StartProcess);

