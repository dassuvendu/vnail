<?php

class Employee extends CI_Controller {
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

        // if(!empty($this->session->userdata("salon")))
        //     $salon_id = $this->session->userdata("salon")->id;
        // else
        //     $this->session->set_userdata("salon", array("id"=>1, "name"=>"Suvendu"));
    }

    public function getEmployee() {
        $resp = $this->db->get($this->employee);
        if($resp->num_rows()>0){
            $data = $resp->result();
            foreach ($data as $key => $value) {
                if($value->image!="") {
                    $value->image = base_url()."assets/images/emp/".$value->image;
                } else {
                    $value->image = base_url()."assets/images/user-no-img.png";
                }
            }
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = $data;
            $this->apiResponse['response_msg'] = 'Employee data found';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Data not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function getFreeEmployee() {
        $this->db->where("is_appointed", 0);
        $resp = $this->db->get($this->employee);
        if($resp->num_rows()>0){
            foreach ($resp->result() as $key => $value) {
                if($value->image!="") {
                    $value->image = base_url()."assets/images/emp/".$value->image;
                } else {
                    $value->image = base_url()."assets/images/user-no-img.png";
                }
            }
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = $resp->result();
            $this->apiResponse['response_msg'] = 'Employee data found';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Data not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function assignEmp() {
        if($this->input->post()){
            $this->db->where("id", $this->input->post('id'));
            if($this->db->update($this->appointment, array("assigned_emp"=>$this->input->post('assigned_emp'), "status"=>2))){
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Employee assigned to a appointment';
            } else {
                $this->apiResponse['response_code'] = '201';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Something went wrong, Please try again';
            }
            echo $response = json_encode($this->apiResponse);die;
        }
    }

    public function addEmployee() {
        if($this->input->post()) {
            //if(!isset($this->input->post("id"))) {
                if($this->db->insert($this->employee, $this->input->post())) {
                    $this->apiResponse['response_code'] = '200';
                    $this->apiResponse['response_data'] = array();
                    $this->apiResponse['response_msg'] = 'Employee added successfully';
                }
            /*} else {
                $data = $this->input->post();
                unset($data['id']);
                $this->db->where("id", $data['id']);
                if($this->db->update($this->employee, $data)) {
                    $this->apiResponse['response_code'] = '200';
                    $this->apiResponse['response_data'] = array();
                    $this->apiResponse['response_msg'] = 'Employee edited successfully';
                }
            }*/
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Field must be filled';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function empDetails() {
        if($this->input->post("id")) {
            $this->db->where("id", $this->input->post("id"));
            $resp = $this->db->get($this->employee);
            if($resp->num_rows()>0) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = $resp->row();
                $this->apiResponse['response_msg'] = 'Employee data found';
            } else {
                $this->apiResponse['response_code'] = '202';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Employee data not found';
            }
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Employee id does not exist';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function editEmp() {
        if($this->input->post()) {
            $id = $this->input->post("id");
            $data = $this->input->post();
            unset($data['id']);
            $this->db->where("id", $id);
            if($this->db->update($this->employee, $data)) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Employee data updated';
            } else {
                $this->apiResponse['response_code'] = '201';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Something went wrong';
            }
        } else {
            $this->apiResponse['response_code'] = '202';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'No data found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function getTurnList() {
        $this->db->select($this->employee.".id, ".$this->employee.".name, ".$this->employee.".image, ".$this->appointment.".ticket, ".$this->appointment.".status, ".$this->appointment.".assigned_emp, ".$this->appointment_service_relation.".price");
        $this->db->from($this->employee);
        $this->db->join($this->appointment, $this->employee.".id = ".$this->appointment.".assigned_emp", "left");
        $this->db->join($this->appointment_service_relation, $this->appointment_service_relation.".appoint_id = ".$this->appointment.".id", "left");
        //$this->db->where($this->appointment.".status", 2);
        $resp = $this->db->get();
        $arr = array();
        $price = 0;
        if($resp->num_rows()>0) {
            foreach ($resp->result() as $key => $value) {
                if($value->image!="") {
                    $value->image = base_url()."assets/images/emp/".$value->image;
                } else {
                    $value->image = base_url()."assets/images/user-no-img.png";
                }
                if(empty($arr)) {
                    $arr[$value->id] = $value;
                    if($value->status == 3) {
                        $price = $price+$value->price;
                        $arr[$value->id]->price = $price;
                    }
                } else {
                    if(array_key_exists($value->id, $arr)) {
                        if($value->status == 2)
                            $arr[$value->id]->status = $value->status;
                        if($value->status == 3) {
                            $price = $price+$value->price;
                            $arr[$value->id]->price = $price;
                        }
                    } else {
                        $arr[$value->id] = $value;
                        if($value->status == 3) {
                            $price = $price+$value->price;
                            $arr[$value->id]->price = $price;
                        }
                        $price = 0;
                    }
                }
            }
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = array_values($arr);
            $this->apiResponse['response_msg'] = 'Turn list data found';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'No data found';
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
}