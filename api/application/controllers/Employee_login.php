<?php

class Employee_login extends CI_Controller {
    var $customer;
    var $appointment;
    var $employee;
    var $service;
    var $appointment_service_relation;
    public function __construct() {
        parent::__construct();

        header("Access-Control-Allow-Origin: *");
        //header("Content-Type: application/json; charset=UTF-8");

        $id=1;

        $this->customer = "customer_".rtrim(strtolower(base64_encode($id)), "==");
        $this->employee = "employee_".rtrim(strtolower(base64_encode(1)), "==");
        $this->appointment = "appointment_".rtrim(strtolower(base64_encode($id)), "==");
        $this->service = "service_".rtrim(strtolower(base64_encode($id)), "==");
        $this->appointment_service_relation = "appointment_service_relation_".rtrim(strtolower(base64_encode($id)), "==");
    }

    public function empLogin () {
        $phone = $this->input->post("phone_no");
        if($phone!="") {
            $this->db->where("phone", $phone);
            $res = $this->db->get($this->employee);
            if($res->num_rows()>0) {
                if($res->row()->image!="") {
                    $res->row()->image = base_url()."assets/images/emp/".$res->row()->image;
                } else {
                    $res->row()->image = base_url()."assets/images/user-no-img.png";
                }
                $this->session->set_userdata("emp", $res->row());
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = $res->row();
                $this->apiResponse['response_msg'] = 'Employee data found';
            } else {
                $this->apiResponse['response_code'] = '201';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Login Fail';
            }
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Please provide phone number';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function delete() {
        if($this->input->post("id")) {
            $this->db->where("id", $this->input->post("id"));
            if($this->db->delete($this->employee)) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Employee deleted successfully';
            }
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Employee id not found';
        }
    }

    public function empLogOut() {
        $this->session->sess_destroy();
        $this->apiResponse['response_code'] = '200';
        $this->apiResponse['response_data'] = array();
        $this->apiResponse['response_msg'] = 'Session Destroyed successfully';
    
        echo $response = json_encode($this->apiResponse);die;
    }
}