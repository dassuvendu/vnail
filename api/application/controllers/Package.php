<?php

class Package extends CI_Controller {
    var $salon_id = "";
    var $customer;
    var $appointment;
    var $employee;
    var $service;
    var $category;
    var $packages;
    public function __construct() {
        parent::__construct();

        header("Access-Control-Allow-Origin: *");
        //header("Content-Type: application/json; charset=UTF-8");

        $this->load->library('session');

        $this->customer = "customer_".rtrim(strtolower(base64_encode(1)), "==");
        $this->employee = "employee_".rtrim(strtolower(base64_encode(1)), "==");
        $this->appointment = "appointment_".rtrim(strtolower(base64_encode(1)), "==");
        $this->service = "service_".rtrim(strtolower(base64_encode(1)), "==");
        $this->category = "category_".rtrim(strtolower(base64_encode(1)), "==");
        $this->packages = "packages_".rtrim(strtolower(base64_encode(1)), "==");

        if(!empty($this->session->userdata("salon"))) 
            $this->salon_id = $this->session->userdata("salon")->id;
        else
            $this->salon_id = 1;
    }

    public function getPackage() {
        $resp = $this->db->get($this->packages);
        if($resp->num_rows()>0) {
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = $resp->result();
            $this->apiResponse['response_msg'] = 'Packages found';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Packages not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function packageDetail() {
        if($this->input->post("id")) {
            $this->db->where("id", $this->input->post("id"));
            $resp = $this->db->get($this->packages);

            $arr = array();
            $str = "";
            if($resp->num_rows()>0) {
                $this->db->select("id item_id, name item_text");
                $this->db->where_in("id", explode(",", $resp->row()->services));
                $resp1 = $this->db->get($this->service);
                foreach ($resp1->result() as $key => $value) {
                    $str .= $value->item_text.", ";
                }

                $arr['pkg'] = array("pkg" => $resp->row(), "services" => array("services" => $resp1->result()), "pkg_services_str" => rtrim($str, ", "));

                $this->db->select("id item_id, name item_text");
                $resp2 = $this->db->get($this->service);
                $arr['services'] = $resp2->result();
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = $arr;
                $this->apiResponse['response_msg'] = 'Package data found';
            } else {
                $this->apiResponse['response_code'] = '202';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Package data not found';
            }
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Package id not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function editPackage() {
        if($this->input->post()) {
            $id = $this->input->post("id");
            $data = $this->input->post();
            $str = "";
            unset($data['id']);
            //echo "<pre>";print_r($data);die;
            // foreach ($data->services as $key => $value) {
            //     $str .= $value->item_id.",";
            // }
            $data['services']=rtrim($data['services'], ",");
            $this->db->where("id", $id);
            if($this->db->update($this->packages, $data)) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Package edited successfully';
            }
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Field must be filled';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function deletePackage() {
        if($this->input->post("id")) {
            $this->db->where("id", $this->input->post("id"));
            if($this->db->delete($this->packages)) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Package deleted successfully';
            }
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Package id not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }
}