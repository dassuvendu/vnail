<?php

class Gift extends CI_Controller {
    var $customer;
    var $appointment;
    var $employee;
    var $services;
    var $appointment_service_relation;
    var $gift_card;
    public function __construct() {
        parent::__construct();

        header("Access-Control-Allow-Origin: *");
        //header("Content-Type: application/json; charset=UTF-8");

        $this->load->library('session');

        $this->customer = "customer_".rtrim(strtolower(base64_encode(1)), "==");
        $this->employee = "employee_".rtrim(strtolower(base64_encode(1)), "==");
        $this->appointment = "appointment_".rtrim(strtolower(base64_encode(1)), "==");
        $this->services = "service_".rtrim(strtolower(base64_encode(1)), "==");
        $this->category = "category_".rtrim(strtolower(base64_encode(1)), "==");
        $this->appointment_service_relation = "appointment_service_relation_".rtrim(strtolower(base64_encode(1)), "==");
        $this->gift_card = "gift_card_".rtrim(strtolower(base64_encode(1)), "==");

        // if(!empty($this->session->userdata("salon")))
        //     $salon_id = $this->session->userdata("salon")->id;
        // else
        //     $this->session->set_userdata("salon", array("id"=>1, "name"=>"Suvendu"));
    }

    public function getGiftCard() {
        $this->db->join($this->customer, $this->customer.".id = ".$this->gift_card.".from");
        $resp = $this->db->get($this->gift_card);
        if($resp->num_rows()>0) {
            foreach ($resp->result() as $key => $value) {
                if($value->expier_date=="0000-00-00")
                    $value->expier_date = "None";
                else
                    $value->expier_date = date("d M, Y", strtotime($value->expier_date));
            }
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = $resp->result();
            $this->apiResponse['response_msg'] = 'Gift card data found';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Gift card data not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function addGiftCard() {
        if($this->input->post()) {
            $data = $this->input->post();
            $data['card_number'] = $this->card_number_generator();
            if($this->db->insert($this->gift_card, $data)) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Gift card added successfully';
            } else {
                $this->apiResponse['response_code'] = '202';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Something went wrong';
            }
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Found no input';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function editGiftCard() {
        if($this->input->post()) {
            $id = $this->input->post("id");
            $data = $this->input->post();
            unset($data['id']);
            $this->db->where("id", $id);
            if($this->db->update($this->gift_card, $data)) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Gift card updated successfully';
            }
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Found no input';
        }
    }

    public function getGiftCardDetail() {
        if($this->input->post("id")) {
            $this->db->where("id", $this->input->post("id"));
            $res = $this->db->get($this->gift_card);
            if($res->num_rows()>0) {
                if($res->row()->expier_date=="0000-00-00")
                    $res->row()->expier_date = "None";
                else
                    $res->row()->expier_date = date("m/y", strtotime($res->row()->expier_date));
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = $res->row();
                $this->apiResponse['response_msg'] = 'Gift card found';
            } else {
                $this->apiResponse['response_code'] = '202';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Gift card not found';
            }
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Gift card id not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function card_number_generator() {
        $chars = "012345678909876543219874563210".time();
        $res = "";
        for ($i = 0; $i < 16; $i++) {
            $res .= $chars[mt_rand(0, strlen($chars)-1)];
        }
        return $res;
    }

}