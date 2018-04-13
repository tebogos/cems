import React from "react";
import ReactSelect from "react-select";
import styled from 'styled-components';

const MultiSelect = styled(ReactSelect)`
	&.Select--multi  {

		.Select-value {
			display: inline-flex;
			align-items: center;
		}		
	}

	& .Select-placeholder {
		font-size: smaller;
	}
`

export (props) => <MultiSelect multi {...props} />