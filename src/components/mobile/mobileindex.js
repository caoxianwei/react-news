import React, { Component } from 'react';
import MobileHeader from './mobileheader';
import MobileFooter from './mobilefooter';
import '../../assets/css/mobile.css';

export default class PCHeader extends Component {
	render(){
		return (
			<div>
				<MobileHeader />
				<MobileFooter />
			</div>
		)
	}
}