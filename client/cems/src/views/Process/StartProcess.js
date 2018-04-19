import React from 'react';
import {connect} from 'react-redux';
import MaterialUIAutocomplete from '../Tasks/MaterialUIAutocomplete';
import getFirms from '../../reducers/firm';
import {Badge, Row, Col, Card, CardHeader, CardFooter, CardBody, Label, Input} from 'reactstrap';


  class StartProcess extends React.Component{




    render(){

        return(
            <div>
       <Card>
         <CardHeader>
            Start Process
         </CardHeader>
         <CardBody>
           <MaterialUIAutocomplete />
           <h1>{this.props.selectedFirm.firmNumber}</h1>
          </CardBody>
    </Card>
                </div>
        )
    }
}

export default connect((state)=>({firms:state.firm.firms,selectedFirm:state.firm.selectedFirm}),{getFirms})(StartProcess);

