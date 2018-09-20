<?php

class Appointment extends CI_Controller {
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

        $this->customer = "customer_".rtrim(strtolower(base64_encode(1)), "==");
        $this->employee = "employee_".rtrim(strtolower(base64_encode(1)), "==");
        $this->appointment = "appointment_".rtrim(strtolower(base64_encode(1)), "==");
        $this->services = "service_".rtrim(strtolower(base64_encode(1)), "==");
        $this->category = "category_".rtrim(strtolower(base64_encode(1)), "==");
        $this->appointment_service_relation = "appointment_service_relation_".rtrim(strtolower(base64_encode(1)), "==");

        // if(!empty($this->session->userdata("salon")))
        //     $salon_id = $this->session->userdata("salon")->id;
        // else
        //     $this->session->set_userdata("salon", array("id"=>1, "name"=>"Suvendu"));
    }

    public function getAppointmentData() {
        $arr = array();
        
        $date = date("Y-m-d", substr($this->input->post("now"),0,10));
        
        $times = json_decode($this->input->post("times"));
        $this->db->select("`".$this->appointment."`.`id` app_id, `".$this->employee."`.`id` emp_id, `".$this->employee."`.`name`, `".$this->appointment."`.`ticket`, `".$this->appointment."`.`date`, `".$this->employee."`.`image`, `".$this->appointment_service_relation."`.`time` start_time, `".$this->appointment_service_relation."`.`end_time`, `".$this->services."`.`id` service_id, `".$this->services."`.`name` service_name, `".$this->services."`.`description` service_desc, `".$this->services."`.`price` service_price, `".$this->services."`.`duration`, `".$this->category."`.`name` category_name, `".$this->category."`.`color` category_color");
        $this->db->from($this->appointment);
        $this->db->join($this->employee, "`".$this->appointment."`.`assigned_emp`=`".$this->employee."`.`id`");
        $this->db->join($this->appointment_service_relation, "`".$this->appointment."`.`id`=`".$this->appointment_service_relation."`.`appoint_id`");
        $this->db->join($this->services, "`".$this->services."`.`id`=`".$this->appointment_service_relation."`.`service_id`");
        $this->db->join($this->category, "`".$this->services."`.`category` = `".$this->category."`.`id`");
        $this->db->where($this->appointment.".date", date("Y-m-d"));
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

            // foreach ($arr as $key => $value) {
            //     foreach ($times as $k => $v) {
            //         # code...
            //     }
            // }

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

    public function getCustAppointments () {
        $cust_id = $this->input->post("cust_id");
        $this->db->select($this->appointment.".*, ".$this->customer.".name");
        $this->db->from($this->appointment);
        $this->db->join($this->customer, $this->customer.".id = ".$this->appointment.".cust_id");
        $this->db->where("cust_id", $cust_id);
        $this->db->order_by("id", "desc");
        $resp = $this->db->get();
        if($resp->num_rows()>0) {
            $data = $resp->result();
            foreach ($data as $key => $value) {

                $this->db->where_in("id", explode(",", $value->services));
                $res = $this->db->get($this->services)->result();
                $value->price = 0;
                foreach ($res as $val) {
                    $value->price = $value->price + $val->price;
                }
                $value->services = $res;
            }
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = $data;
            $this->apiResponse['response_msg'] = 'Appointment tickets found';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Appointment tickets not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function getEmpAppointments () {
        $emp_id = $this->input->post("emp_id");
        $this->db->select($this->appointment.".*, ".$this->employee.".name");
        $this->db->from($this->appointment);
        $this->db->join($this->employee, $this->employee.".id = ".$this->appointment.".assigned_emp");
        $this->db->where("assigned_emp", $emp_id);
        $this->db->order_by("id", "desc");
        $resp = $this->db->get();
        if($resp->num_rows()>0) {
            $data = $resp->result();
            foreach ($data as $key => $value) {
                //$this->db->select_sum("price");
                $this->db->where_in("id", explode(",", $value->services));
                $res = $this->db->get($this->services)->result();
                $value->price = 0;
                foreach ($res as $val) {
                    $value->price = $value->price + $val->price;
                }
                $value->services = $res;
            }
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = $data;
            $this->apiResponse['response_msg'] = 'Appointment tickets found';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Appointment tickets not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function getCustAppointmentDetails () {
        $emp_id = $this->input->post("id");
        $this->db->select($this->appointment.".*, ".$this->customer.".name, ".$this->services.".name service_name, ".$this->services.".price, ".$this->services.".duration");
        $this->db->from($this->appointment);
        $this->db->join($this->customer, $this->customer.".id = ".$this->appointment.".cust_id");
        $this->db->join($this->appointment_service_relation, $this->appointment_service_relation.".appoint_id = ".$this->appointment.".id");
        $this->db->join($this->services, $this->appointment_service_relation.".service_id = ".$this->services.".id");
        $this->db->where("assigned_emp", $emp_id);
        $this->db->order_by("id", "desc");
        $resp = $this->db->get();
        if($resp->num_rows()>0) {
            $data = array();
            $all = array();
            $price = 0;
            foreach ($resp->result() as $key => $value) {
                $data = $value;
                $all[] = array("service_name" => $value->service_name, "price" => $value->price, "duration" => $value->duration);
                $price = $price+$value->price;
                $data->total = $price;
                $data->services = $all;
            }
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = $data;
            $this->apiResponse['response_msg'] = 'Appointment tickets found';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Appointment tickets not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function getEmpAppointmentDetails () {
        $emp_id = $this->input->post("id");
        $this->db->select($this->appointment.".*, ".$this->employee.".name, ".$this->services.".name service_name, ".$this->services.".price, ".$this->services.".duration");
        $this->db->from($this->appointment);
        $this->db->join($this->employee, $this->employee.".id = ".$this->appointment.".assigned_emp");
        $this->db->join($this->appointment_service_relation, $this->appointment_service_relation.".appoint_id = ".$this->appointment.".id");
        $this->db->join($this->services, $this->appointment_service_relation.".service_id = ".$this->services.".id");
        $this->db->where("assigned_emp", $emp_id);
        $this->db->order_by("id", "desc");
        $resp = $this->db->get();
        if($resp->num_rows()>0) {
            // $data = $resp->row();

            // $this->db->where_in("id", explode(",", $data->services));
            // $res = $this->db->get($this->services)->result();
            // $data->price = 0;
            // foreach ($res as $val) {
            //     $data->price = $data->price + $val->price;
            // }
            // $data->services = $res;
            $data = array();
            $all = array();
            $price = 0;
            foreach ($resp->result() as $key => $value) {
                $data = $value;
                $all[] = array("service_name" => $value->service_name, "price" => $value->price, "duration" => $value->duration);
                $price = $price+$value->price;
                $data->total = $price;
                $data->services = $all;
            }
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = $data;
            $this->apiResponse['response_msg'] = 'Appointment tickets found';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Appointment tickets not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

}
?>