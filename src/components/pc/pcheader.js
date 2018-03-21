import React, { Component } from 'react';
import { Row, Col, Menu, Icon, Button, Form, Input, Modal, Tabs, message} from 'antd';

//import logo from '../../assets/img/logo2.png'

const MenuItem = Menu.Item;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class FormRegister extends Component {
	constructor(){
		super();
		this.state = {
			confirmDirty: false,
		};
		this.registeSubmit = this.registeSubmit.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
		this.validateToNextPassword = this.validateToNextPassword.bind(this);
		this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
	}
	registeSubmit(e){
		e.preventDefault();
		console.log('注册')
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        message.success('注册成功!')
	        this.props.form.resetFields();
	      }
	    });
	}
	compareToFirstPassword(rule, value, callback){
		const form = this.props.form;
	    if (value && value !== form.getFieldValue('r_password')) {
	      callback('两次密码不一致!');
	    } else {
	      callback();
	    }
	}
	validateToNextPassword(rule, value, callback){
		const form = this.props.form;
	    if (value && this.state.confirmDirty) {
	      form.validateFields(['confirm'], { force: true });
	    }
	    callback();
	}
	handleConfirm(e){
		var value = e.target.value;
		this.setState({confirmdirty: this.state.confirmdirty || !!value});
	}
	render(){
		let {getFieldDecorator} = this.props.form;
		return (
			<Form layout='vertical' id="form2" ref={(form2) => {this.form_2 = form2}} onSubmit={this.registeSubmit}>
				<FormItem label="账号">
					{
						getFieldDecorator('r_username', {
							rules: [{ 
								required: true, message: '请输入账号!'
							}],
						})( <Input placeholder="请输入您的帐号" className="radiusInput"/> )
					}
				</FormItem>
				<FormItem label="密码">
					{
						getFieldDecorator('r_password', {
							rules: [{
								required: true, message: '请输入密码!'
							},{
								validator: this.validateToNextPassword
							}],
						})( <Input type="password" placeholder="请输入您的密码" className="radiusInput"/>)
					}
				</FormItem>
				<FormItem label="确认密码">
					{
						getFieldDecorator('r_confirmpassword', {
							rules: [{ 
								required: true, message: '请再次输入密码!'
							},{
								validator: this.compareToFirstPassword
							}]
						})( <Input type="password" placeholder="请再次输入您的密码" className="radiusInput" onBlur={this.handleConfirm}/>)
					}
				</FormItem>
				<Button type="primary" htmlType="submit" form="form2">注册</Button>
			</Form>
		)
	}
}
const RegisterForm = Form.create({})(FormRegister);

class FormLogin extends Component {
	constructor(){
		super();
		this.loginSubmit = this.loginSubmit.bind(this);
	}
	loginSubmit(e){
		e.preventDefault();
		console.log('登录')
		this.props.form.validateFieldsAndScroll((err,values) => {
			if(!err){
				console.log('Received values of form: ', values);
				message.success('登陆成功!');
				this.props.form.resetFields();
				this.props.setModalVisible(false);
				this.props.registerHandler(true);
				this.props.setNickName(values.username);
			}
		})
	}
	render(){
		let {getFieldDecorator} = this.props.form;
		return (
			<Form layout='vertical' id="form1" hideRequiredMark ref={(form1)=>this.form_1 = form1} onSubmit={this.loginSubmit}>
				<FormItem label="账号">
					{
						getFieldDecorator('username', {
							rules: [{ required: true, message:'请输入账号!'}]
						})( <Input placeholder="请输入您的帐号" className="radiusInput"/> )
					}
				</FormItem>
				<FormItem label="密码">
					{
						getFieldDecorator('password', {
							rules: [{ required: true, message: "请输入密码!"}]
						})( <Input type="password" placeholder="请输入您的密码" className="radiusInput"/>)
					}
				</FormItem>
				<Button type="primary" htmlType="submit" form="form1">登录</Button>
			</Form>
		)
	}
}
const LoginForm = Form.create({})(FormLogin);

export default class PCHeader extends Component {
	constructor(){
		super();
		this.state = {
			register: false,
			visible: false,
			nickname: ''
		};
		this.setModalVisible = this.setModalVisible.bind(this);
		this.registerHandler = this.registerHandler.bind(this);
		this.setNickName = this.setNickName.bind(this);
	}
	setModalVisible(value){
		this.setState({
			visible: value
		})
	}
	registerHandler(value){
		this.setState({
			register: value
		})
	}
	setNickName(value){
		this.setState({
			nickname: value
		})
	}
	render(){
		var lastMenuItem = !this.state.register
		?
		<Button onClick={this.setModalVisible.bind(null,true)}><Icon type="appstore" /><span>注册/登录</span></Button>
		:
		<div>
			<Button type="primary">{this.state.nickname}</Button>
			&nbsp;&nbsp;
			<Button type="dashed" href="/user" target="_blank" className="usercenter">个人中心</Button>
			&nbsp;&nbsp;
			<Button type="ghost" onClick={this.registerHandler.bind(null,false)}>退出</Button>
		</div>;
		
		return (
			<header>
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" className="logo">
							<img src={require('../../assets/img/logo2.png')} alt="logo"/>
							<span>ReactNews</span>
						</a>
					</Col>
					<Col span={16} style={{position: 'relative'}}>
						<Menu
							mode='horizontal'
							defaultSelectedKeys={['1']}
						>
							<MenuItem key='1'><Icon type="appstore" /><span>头条</span></MenuItem>
							<MenuItem key='2'><Icon type="appstore" /><span>社会</span></MenuItem>
							<MenuItem key='3'><Icon type="appstore" /><span>国内</span></MenuItem>
							<MenuItem key='4'><Icon type="appstore" /><span>国际</span></MenuItem>
							<MenuItem key='5'><Icon type="appstore" /><span>娱乐</span></MenuItem>
							<MenuItem key='6'><Icon type="appstore" /><span>体育</span></MenuItem>
							<MenuItem key='7'><Icon type="appstore" /><span>科技</span></MenuItem>
							<MenuItem key='8'><Icon type="appstore" /><span>时尚</span></MenuItem>
						</Menu>
						<div className="loginpanel">
							{lastMenuItem}
						</div>
					</Col>
					<Col span={2}></Col>
				</Row>
				<Modal
					visible={this.state.visible}
					title="用户中心"
					onCancel={()=>this.setModalVisible(false)}
					onOk={()=>this.setModalVisible(false)}
					okText="关闭"
					cancelText="取消"
				>
					<Tabs type='card' defaultActiveKey='1' animated={true}>
						<TabPane tab="登录" key="1">
							<LoginForm 
								setModalVisible={this.setModalVisible} 
								registerHandler={this.registerHandler}
								setNickName={this.setNickName}
							/>
						</TabPane>
						<TabPane tab="注册" key="2">
							<RegisterForm />
						</TabPane>
					</Tabs>
				</Modal>
			</header>
		)
	}
}








