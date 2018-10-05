<?php

class Employee_app extends CI_Controller {
    var $customer;
    var $appointment;
    var $employee;
    var $services;
    var $appointment_service_relation;
    public function __construct() {
        parent::__construct();

        header("Access-Control-Allow-Origin: *");
        //header("Content-Type: application/json; charset=UTF-8");

        $this->load->library('session');
        if(empty($this->session->userdata("emp"))) {
            $this->apiResponse['response_code'] = '100';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Server session logged out';

            echo $response = json_encode($this->apiResponse);die;
        } else {
            $id = $this->session->userdata("emp")->salon_id;
        }

        $this->customer = "customer_".rtrim(strtolower(base64_encode($id)), "==");
        $this->employee = "employee_".rtrim(strtolower(base64_encode(1)), "==");
        $this->appointment = "appointment_".rtrim(strtolower(base64_encode($id)), "==");
        $this->category = "category_".rtrim(strtolower(base64_encode($id)), "==");
        $this->services = "service_".rtrim(strtolower(base64_encode($id)), "==");
        $this->appointment_service_relation = "appointment_service_relation_".rtrim(strtolower(base64_encode($id)), "==");
    }

    public function getEmpAppointments () {
        $emp_id = $this->input->post("emp_id");
        $this->db->select($this->appointment.".*, ".$this->customer.".name, ".$this->appointment_service_relation.".price");
        $this->db->from($this->appointment);
        $this->db->join($this->customer, $this->customer.".id = ".$this->appointment.".cust_id");
        $this->db->join($this->appointment_service_relation, $this->appointment_service_relation.".appoint_id = ".$this->appointment.".id");
        $this->db->where("assigned_emp", $emp_id);
        $this->db->order_by("id", "desc");
        $resp = $this->db->get();
        if($resp->num_rows()>0) {
            $data = array();
            $price = 0;
            foreach ($resp->result() as $key => $value) {
                if(empty($data)) {
                    $price = $value->price;
                    $data[$value->id] = $value;
                } else {
                    if(array_key_exists($value->id, $data)) {
                        $price = $price + $value->price;
                        $data[$value->id]->price = $price;
                    } else {
                        $price = 0;
                        $data[$value->id] = $value;
                        $price = $price + $value->price;
                        $data[$value->id]->price = $price;
                    }
                }
            }

            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = array_values($data);
            $this->apiResponse['response_msg'] = 'Appointment tickets found';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Appointment tickets not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function getAppointmentData() {
        $arr = array();
        //$this->input->post("now"),0,10));
        $date = $this->input->post("now");
        if($date=="") {
            $date = date("Y-m-d");
        }
        
        $times = json_decode($this->input->post("times"));
        $this->db->select("`".$this->appointment."`.`id` app_id, `".$this->employee."`.`id` emp_id, `".$this->employee."`.`name`, `".$this->appointment."`.`ticket`, `".$this->appointment."`.`date`, `".$this->employee."`.`image`, `".$this->appointment_service_relation."`.`time` start_time, `".$this->appointment_service_relation."`.`end_time`, `".$this->services."`.`id` service_id, `".$this->services."`.`name` service_name, `".$this->services."`.`description` service_desc, `".$this->services."`.`price` service_price, `".$this->services."`.`duration`, `".$this->category."`.`name` category_name, `".$this->category."`.`color` category_color");
        $this->db->from($this->appointment);
        $this->db->join($this->employee, "`".$this->appointment."`.`assigned_emp`=`".$this->employee."`.`id`");
        $this->db->join($this->appointment_service_relation, "`".$this->appointment."`.`id`=`".$this->appointment_service_relation."`.`appoint_id`");
        $this->db->join($this->services, "`".$this->services."`.`id`=`".$this->appointment_service_relation."`.`service_id`");
        $this->db->join($this->category, "`".$this->services."`.`category` = `".$this->category."`.`id`");
        if($this->input->post("id")!="") {
            $this->db->where(array($this->appointment.".date" => $date, $this->appointment.".assigned_emp" => $this->input->post("id")));
        } else {
            $this->db->where($this->appointment.".date", $date);
        }
        $resp = $this->db->get();

        if($resp->num_rows()>0) {
            
            foreach ($resp->result() as $key => $value) {
                if($value->image!="") {
                    $value->image = base_url()."assets/images/emp/".$value->image;
                } else {
                    $value->image = base_url()."assets/images/user-no-img.png";
                }
                $data[$value->app_id] = array("appoint_id" => $value->app_id, "emp_id" => $value->emp_id, "emp_name" => $value->name, "ticket" => $value->ticket, "image" => $value->image);
                $arr[$value->app_id][] = array("service_id" => $value->service_id, "service_name" => $value->service_name, "duration" => $value->duration, "height" => ($value->duration*8.5)."px", "date" => $value->date, "start_time" => date('H:i',round(strtotime($value->start_time) / (5 * 60)) * (5 * 60)), "end_time" => $value->end_time, "category_name" => $value->category_name, "color" => $value->category_color);
            }

            foreach ($data as $k => $val) {
                $data[$k]['services'] = $arr[$k];
            }
            
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = array_values($data);
            $this->apiResponse['response_msg'] = 'Event data found';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Event data not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function getSchedules() {
        if($this->input->post("id")) {
            $this->db->where("emp_id", $this->input->post("id"));
            $res = $this->db->get("emp_leave_management_mq");
            if($res->num_rows()>0) {
                $data = array();
                foreach ($res->result() as $key => $value) {
                    $data[] = array("title" => $value->name, "start" => $value->date."T".$value->start_time, "end" => $value->date."T".$value->end_time, "backgroundColor" => "rgb(204, 204, 204)", "borderColor" => "rgb(204, 204, 204)");
                }
                $this->apiResponse['response_code'] = '201';
                $this->apiResponse['response_data'] = $data;
                $this->apiResponse['response_msg'] = 'Data not found';
            } else {
                $this->apiResponse['response_code'] = '201';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Data not found';
            }
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Employee id not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function empDetails() {
        if($this->input->post("id")) {
            $this->db->where("id", $this->input->post("id"));
            $resp = $this->db->get($this->employee);
            $data = $resp->row();
            if($data->image!="") {
                $data->image = base_url()."assets/images/emp/".$data->image;
            } else {
                $data->image = base_url()."assets/images/user-no-img.png";
            }
            if($resp->num_rows()>0) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = $data;
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

    public function empGeneralEdit() {
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

    public function empServiceEdit() {
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

    public function empSecurityEdit() {
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
}