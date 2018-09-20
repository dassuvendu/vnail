<?php

class Customer extends CI_Controller {
    var $salon_id = "";
    var $customer;
    var $appointment;
    var $employee;
    var $service;
    var $appointment_service_relation;
    public function __construct() {
        parent::__construct();

        header("Access-Control-Allow-Origin: *");
        //header("Content-Type: application/json; charset=UTF-8");

        $this->load->library('session');

        $this->customer = "customer_".rtrim(strtolower(base64_encode(1)), "==");
        $this->employee = "employee_".rtrim(strtolower(base64_encode(1)), "==");
        $this->appointment = "appointment_".rtrim(strtolower(base64_encode(1)), "==");
        $this->service = "service_".rtrim(strtolower(base64_encode(1)), "==");
        $this->appointment_service_relation = "appointment_service_relation_".rtrim(strtolower(base64_encode(1)), "==");

        if(!empty($this->session->userdata("salon"))) 
            $this->salon_id = $this->session->userdata("salon")->id;
        else
            $this->salon_id = 1;
    }

    public function getAllCustomer() {
        $resp = $this->db->get($this->customer);
        if($resp->num_rows()>0) {
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = $resp->result();
            $this->apiResponse['response_msg'] = 'Customer data found';

        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'data not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function searchCustomer() {
        if($this->input->post()) {
            $data = $this->input->post("name");
            $this->db->where(("name LIKE '%$data%'"));
            $resp = $this->db->get($this->customer);
            if($resp->num_rows()>0) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = $resp->result();
                $this->apiResponse['response_msg'] = 'Customer data found';

            } else {
                $this->apiResponse['response_code'] = '201';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'data not found';
            }
        } else {
            $this->apiResponse['response_code'] = '202';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Please enter any charecter';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function details() {
        if($this->input->post()) {
            $this->db->where("id", $this->input->post("id"));
            $resp = $this->db->get($this->customer);
            if($resp->num_rows()>0) {
                $tickets = "None";
                $price = 0;
                $data = $resp->row();
                $data->dob = date("m/d/Y", strtotime($data->dob));
                $data->fname = explode(" ", $data->name)[0];
                $data->lname = explode(" ", $data->name)[1];
                $this->db->where("cust_id", $data->id);
                $app = $this->db->get($this->appointment);
                foreach ($app->result() as $key => $value) {

                    $data->last_visit = $value->date;
                    $data->total_visits = $key+1;
                    if($value->status==1) {
                        $tickets .= "#".$value->ticket.", ";
                    }
                    if($value->status==3) {
                        $this->db->select_sum("price");
                        $this->db->where("appoint_id", $value->id);
                        $p = $this->db->get($this->appointment_service_relation)->row()->price;
                        if($p!="") {
                            $price = $price+$p;
                        }
                    }
                }
                $data->tickets = rtrim($tickets, ", ");
                $data->total_spent = $price;
                //echo "<pre>";print_r($data);die;
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = $data;
                $this->apiResponse['response_msg'] = 'Customer details found';
            } else {
                $this->apiResponse['response_code'] = '201';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Customer details not found';
            }
        } else {
            $this->apiResponse['response_code'] = '202';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Customer id not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function editCustomer() {
        if($this->input->post("id")) {
            $id = $this->input->post("id");
            $data = $this->input->post();
            unset($data['id']);
            $data['dob'] = date("Y-m-d", strtotime($data['dob']));
            $this->db->where("id", $id);
            if($this->db->update($this->customer, $data)) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = $data;
                $this->apiResponse['response_msg'] = 'Customer details updated';
            }
        } else {
            $this->apiResponse['response_code'] = '202';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Customer id not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function setCustAppointment() {
        $this->db->where(array("id" => $this->input->post("app_id"), "status" => 1));
        if($this->db->get($this->appointment)->num_rows()>0){
            $this->db->where("id", $this->input->post("app_id"));
            if($this->db->update($this->appointment, array("assigned_emp" => $this->input->post("emp_id"), "status" => 2))) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Appointment sceduled successfully';
            } else {
                $this->apiResponse['response_code'] = '202';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Something went wrong';
            }
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Appointment not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }
}
?>