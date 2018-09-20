import { Injectable } from '@angular/core';
//import { Observable, of } from 'rxjs';
import { HttpClient } from  '@angular/common/http';
import {Http, Headers, URLSearchParams} from '@angular/http';
//import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	
  	constructor(
  		private  httpClient:  HttpClient, 
  		private http: Http,
  		private router: Router
  	) {}

	//base_url = "https://wiseapps.online/paris/";

  	// for test
  	/*getContacts(){
    	return  this.httpClient.get(`${this.API_URL}/paris/api/user/test`);
    	return  this.httpClient.get('/api/user/test');
	}*/

	isLogedin(){
		return  this.httpClient.get('https://wiseapps.online/paris/api/user/isLogedin');
	}

	loginCheck(data){
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('phone_no', data.phone_no);
        //urlSearchParams.append('password', 'dg');
        let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/user/login', body, { headers:headers });
	}

	newCustAdd(data){
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('phone_no', data.phone_no);
        urlSearchParams.append('name', data.name);
        let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/user/new_cust_add', body, { headers:headers });
    	//return false;
	}

	salonOwnerLogin(data){
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('email', data.email);
        urlSearchParams.append('password', data.password);
        let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/salon/salonOwnerLogin', body, { headers:headers });
	}

	isSalonLoggedin() {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.get('https://wiseapps.online/paris/api/salon/isSalonLoggedin');
	}

	getServices(){
		return  this.http.get('https://wiseapps.online/paris/api/salon/getServices');
	}

	getWaitingCust(){
		return  this.http.get('https://wiseapps.online/paris/api/salon/getWaitingCust');
	}

	setAppointment(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('services', data);
		let body = urlSearchParams.toString();
		console.warn(data);
        return this.http.post('https://wiseapps.online/paris/api/salon/setAppointment', body, { headers:headers });
	}

	logout() {
		return  this.http.get('https://wiseapps.online/paris/api/user/logout');
	}

	getFreeEmployee() {
		return  this.http.get('https://wiseapps.online/paris/api/employee/getFreeEmployee');
	}

	assignEmp(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('id', data.id);
		urlSearchParams.append('assigned_emp', data.assigned_emp);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/employee/assignEmp', body, { headers:headers });
	}

	getAllCustomer() {
		return  this.http.get('https://wiseapps.online/paris/api/customer/getAllCustomer');
	}

	searchCustomer(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('name', data);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/customer/searchCustomer', body, { headers:headers });
	}

	cust_details(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('id', data.id);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/customer/details', body, { headers:headers });
	}

	allServices() {
		return  this.http.get('https://wiseapps.online/paris/api/salon/getServices');
	}

	allEmployee() {
		return  this.http.get('https://wiseapps.online/paris/api/employee/getEmployee');
	}

	searchService(data){
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('name', data);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/salon/searchService', body, { headers:headers });
	}

	editCust(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('name', data.name);
		urlSearchParams.append('id', data.id);
		urlSearchParams.append('gender', data.gender);
		urlSearchParams.append('dob', data.dob);
		urlSearchParams.append('address', data.address);
		urlSearchParams.append('phone_no', data.phone_no);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/customer/editCustomer', body, { headers:headers });
	}

	addService(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('name', data.name);
		urlSearchParams.append('description', data.description);
		urlSearchParams.append('price', data.price);
		urlSearchParams.append('category', data.category);
		urlSearchParams.append('duration', data.duration);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/salon/addService', body, { headers:headers });
	}

	addEmployee(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('name', data.name);
		urlSearchParams.append('email', data.email);
		urlSearchParams.append('phone', data.phone);
		urlSearchParams.append('address', data.address);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/employee/addEmployee', body, { headers:headers });
	}

	emp_details(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('id', data.id);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/employee/empDetails', body, { headers:headers });
	}

	editEmp(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('name', data.name);
		urlSearchParams.append('id', data.id);
		urlSearchParams.append('gender', data.gender);
		urlSearchParams.append('email', data.email);
		urlSearchParams.append('address', data.address);
		urlSearchParams.append('phone', data.phone);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/employee/editEmp', body, { headers:headers });
	}

	editService(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('name', data.name);
		urlSearchParams.append('id', data.id);
		urlSearchParams.append('category', data.category);
		urlSearchParams.append('duration', data.duration);
		urlSearchParams.append('description', data.description);
		urlSearchParams.append('price', data.price);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/salon/editService', body, { headers:headers });
	}

	serviceDetail(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('id', data.id);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/salon/serviceDetail', body, { headers:headers });
	}

	getCategory() {
		return this.http.get('https://wiseapps.online/paris/api/salon/getCategory');
	}

	getPackage() {
		return this.http.get('https://wiseapps.online/paris/api/package/getPackage');
	}

	packageDetail(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('id', data.id);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/package/packageDetail', body, { headers:headers });
	}

	editPackage(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('name', data.name);
		urlSearchParams.append('id', data.id);
		console.warn(data.services);
		let element:string = "";
		for (let i = 0; i < data.services.length; i++) {
			element += data.services[i].item_id+",";
		}
		console.log(element);
		urlSearchParams.append('services', element);
		urlSearchParams.append('duration', data.duration);
		urlSearchParams.append('description', data.description);
		urlSearchParams.append('price', data.price);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/package/editPackage', body, { headers:headers });
	}

	getTurnList() {
		return this.http.get('https://wiseapps.online/paris/api/employee/getTurnList');
	}

	setCustAppointment(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('emp_id', data.emp_id);
		urlSearchParams.append('app_id', data.app_id);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/customer/setCustAppointment', body, { headers:headers });
	}

	getAppointmentData(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('now', data.now);
		urlSearchParams.append('times', data.times);
		let body = urlSearchParams.toString();
		return this.http.post('https://wiseapps.online/paris/api/appointment/getAppointmentData', body, { headers:headers });
	}

	getEmpAppointments(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('emp_id', data.id);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/appointment/getEmpAppointments', body, { headers:headers });
	}

	getCustAppointments(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('cust_id', data.id);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/appointment/getCustAppointments', body, { headers:headers });
	}

	getEmpAppointmentDetails(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('id', data.id);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/appointment/getEmpAppointmentDetails', body, { headers:headers });
	}

	getCustAppointmentDetails(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('id', data.id);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/appointment/getCustAppointmentDetails', body, { headers:headers });
	}

	getGiftCard() {
		return this.http.get('https://wiseapps.online/paris/api/gift/getGiftCard');
	}

	addGiftCard(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('from', data.from[0].id);
		urlSearchParams.append('assign_to', data.assign_to[0].id);
		urlSearchParams.append('amount', data.amount);
		urlSearchParams.append('expier_date', data.expier_date);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/gift/addGiftCard', body, { headers:headers });
	}

	getGiftCardDetail(data) {
		var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('id', data.id);
		let body = urlSearchParams.toString();
        return this.http.post('https://wiseapps.online/paris/api/gift/getGiftCardDetail', body, { headers:headers });
	}
}
