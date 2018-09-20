<?php

class User extends CI_Controller {
    var $salon_id = "";
    var $customer;
    var $appointment;
    var $employee;
    var $service;
    public function __construct() {
        parent::__construct();
        $this->load->library('session');

        $this->customer = "customer_".rtrim(strtolower(base64_encode(1)), "==");
        $this->employee = "employee_".rtrim(strtolower(base64_encode(1)), "==");
        $this->appointment = "appointment_".rtrim(strtolower(base64_encode(1)), "==");
        $this->service = "service_".rtrim(strtolower(base64_encode(1)), "==");
        
        if(!empty($this->session->userdata("salon"))) 
            $this->salon_id = $this->session->userdata("salon")->id;
        else
            $this->salon_id = 1;

    }

    public function isLogedin() {
        header("Access-Control-Allow-Origin: *");
        $cust = $this->session->userdata("cust");
        echo json_encode($cust);die;
    }

    public function login() {
        header("Access-Control-Allow-Origin: *");
        //header("Content-Type: application/json; charset=UTF-8");
        $salon_id = $this->salon_id;
        if($this->input->post()) {
            $data = $this->input->post();
            $this->db->where("phone_no", $data['phone_no']);
            $cust = $this->db->get($this->customer);
            if($cust->num_rows()>0) {
                $this->session->set_userdata("cust", $cust->row());
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = $cust->row();
                $this->apiResponse['response_msg'] = 'User logged in successfully';
            } else {
                $this->apiResponse['response_code'] = '201';
                $this->apiResponse['response_data'] = $data;
                $this->apiResponse['response_msg'] = 'Phone No is not match, login as new user';
            }
        } else {
            $this->apiResponse['response_code'] = '202';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Please provide valid input';    
        }

        echo $response = json_encode($this->apiResponse);die;
    }

    public function new_cust_add() {
        header("Access-Control-Allow-Origin: *");
       // header("Content-Type: application/json; charset=UTF-8");
        if($this->input->post()) {
            $data = $this->input->post();
            $this->db->where("phone_no", $data['phone_no']);
            $cust = $this->db->get($this->customer);
            if($cust->num_rows()==0) {
                if($this->db->insert($this->customer, $data)) {
                    $data['id']=$this->db->insert_id();
                    $this->session->set_userdata("cust", $data);
                    $this->apiResponse['response_code'] = '200';
                    $this->apiResponse['response_data'] = $data;
                    $this->apiResponse['response_msg'] = 'User logged in successfully';
                }
            } else {
                $this->apiResponse['response_code'] = '201';
                $this->apiResponse['response_data'] = $data;
                $this->apiResponse['response_msg'] = 'Phone No is already exist';
            }
        } else {
            $this->apiResponse['response_code'] = '202';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Please provide valid input';    
        }

        echo $response = json_encode($this->apiResponse);die;
    }

    // public function logout() {
    //     header("Access-Control-Allow-Origin: *");
    //     $this->session->sess_destroy("cust");
    //     echo json_encode(array("status"=>1));die;
    // }
}
