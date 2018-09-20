<?php

class Salon extends CI_Controller {
    var $salon_id = "";
    var $customer;
    var $appointment;
    var $employee;
    var $service;
    var $category;
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
        $this->category = "category_".rtrim(strtolower(base64_encode(1)), "==");
        $this->appointment_service_relation = "appointment_service_relation_".rtrim(strtolower(base64_encode(1)), "==");

        if(!empty($this->session->userdata("salon"))) 
            $this->salon_id = $this->session->userdata("salon")->id;
        else
            $this->salon_id = 1;
    }

    public function salonOwnerLogin() {
        if($this->input->post()) {
            $data = $this->input->post();
            $this->db->where("email", $data['email']);
            $salon = $this->db->get("salons");
            if($salon->num_rows()>0) {
                if($salon->row()->password == md5($data['password'])) {
                    $this->session->set_userdata("salon", $salon->row());

                    $this->apiResponse['response_code'] = '200';
                    $this->apiResponse['response_data'] = $salon->row();
                    $this->apiResponse['response_msg'] = 'Owner logged in successfully';
                } else {
                    $this->apiResponse['response_code'] = '203';
                    $this->apiResponse['response_data'] = array();
                    $this->apiResponse['response_msg'] = 'Password is incorrect';
                }
            } else {
                $this->apiResponse['response_code'] = '201';
                $this->apiResponse['response_data'] = $data;
                $this->apiResponse['response_msg'] = 'Email ID is incorrect';
            }
        } else {
            $this->apiResponse['response_code'] = '202';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Please provide valid input';    
        }

        echo $response = json_encode($this->apiResponse);die;
    }

    public function isSalonLoggedin() {
        if($this->session->has_userdata("salon")) {
            $salons = $this->session->userdata("salon");
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = $salons;
            $this->apiResponse['response_msg'] = 'Salon already logged in';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Salon logged out, login again';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function salonLogOut() {
        if($this->session->sess_destroy()) {
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Session Destroyed successfully';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function getServices() {
        $this->db->select($this->service.'.*, '.$this->category.'.name category, '.$this->category.'.id cat_id');
        $this->db->join($this->category, $this->service.'.category = '.$this->category.'.id', 'left');
        $resp = $this->db->get($this->service);
        $data = array();
        $arr = array();
        foreach ($resp->result() as $key => $value) {
            $data[$value->cat_id]["category_id"] = $value->cat_id;
            $data[$value->cat_id]["name"] = $value->category;
            $data[$value->cat_id]["value"][] = $value;
        }
        foreach ($data as $key => $value) {
            $arr[] = (object)$value;
        }
        //echo "<pre>";print_r($arr);die;
        if($resp->num_rows()>0) {
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = $arr;
            $this->apiResponse['response_msg'] = 'Data Found';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Data not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function getWaitingCust() {
        $resp = $this->db->query("SELECT `".$this->appointment."`.*, `".$this->customer."`.`name`, `".$this->service."`.`name` service_name, `".$this->service."`.`price` 
            FROM `".$this->appointment."` 
            JOIN `".$this->customer."` ON `".$this->appointment."`.`cust_id` = `".$this->customer."`.`id` 
            JOIN `".$this->appointment_service_relation."` ON `".$this->appointment."`.`id` = `".$this->appointment_service_relation."`.`appoint_id` 
            JOIN `".$this->service."` ON `".$this->appointment_service_relation."`.`service_id` = `".$this->service."`.`id` 
            WHERE `".$this->appointment."`.`status` = 1 AND `".$this->appointment."`.`assigned_emp` = 0");
        
        if($resp->num_rows()>0) {
            $arr = array();
            $service_name = "";
            $price = 0;
            foreach ($resp->result() as $key => $value) {
                if(empty($arr)) {
                    $service_name .= $value->service_name.", ";
                    $price = $price+$value->price;
                } else if(array_key_exists($value->id, $arr)) {
                    $service_name .= $value->service_name.", ";
                    $price = $price+$value->price;
                } else {
                    $service_name .= $value->service_name.", ";
                    $price = $price+$value->price;

                    $service_name = "";
                    $price = 0;
                }
                $arr[$value->id] = $value;
                $arr[$value->id]->service_name = rtrim($service_name, ", ");
                $arr[$value->id]->price = $price;
            }
            //echo "<pre>";print_r($arr);die;
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = array_values($arr);
            $this->apiResponse['response_msg'] = 'Data Found';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Data not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function setAppointment() {
        $services = trim($this->input->post('services'), ",");
        if($services!="") {
            $this->db->where_in("id", explode(",", $services));
            $all_service = $this->db->get($this->service);

            if($all_service->num_rows()>0) {
                $data['cust_id'] = $this->session->userdata("cust")->id;
                $data['ticket'] = rand(1,100).time();
                $data['date'] = date("Y-m-d");
                $data['time'] = date("H:i:s");

                if($this->db->insert($this->appointment, $data)) {
                    $last_id = $this->db->insert_id();
                    $service_arr = array();
                    foreach ($all_service->result() as $key => $value) {
                        $service_arr[] = array("appoint_id"=>$last_id, "service_id"=>$value->id, "date"=>$data['date'], "time"=>$data['time'], "end_time"=>date("H:i:s", strtotime("+".$value->duration." minutes", strtotime($data['time']))), "price"=>$value->price);
                        $data['time'] = date("H:i:s", strtotime("+".$value->duration." minutes", strtotime($data['time'])));
                    }
                    if($this->db->insert_batch($this->appointment_service_relation, $service_arr)) {
                        $this->apiResponse['response_code'] = '200';
                        $this->apiResponse['response_data'] = array();
                        $this->apiResponse['response_msg'] = 'Appointment sceduled successfully';
                    }
                } else {
                    $this->apiResponse['response_code'] = '201';
                    $this->apiResponse['response_data'] = array();
                    $this->apiResponse['response_msg'] = 'Something went wrong';
                }
            } else {
                $this->apiResponse['response_code'] = '201';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Something went wrong';
            }
        } else {
            $this->apiResponse['response_code'] = '202';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Please provide minimum one service';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function searchService() {
        if($this->input->post()) {
            $data = $this->input->post("name");
            $this->db->where(("name LIKE '%$data%'"));
            $resp = $this->db->get($this->service);
            if($resp->num_rows()>0) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = $resp->result();
                $this->apiResponse['response_msg'] = 'Service data found';

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

    public function serviceDetail() {
        if($this->input->post("id")) {
            $this->db->select($this->service.'.*, '.$this->category.'.name category, '.$this->category.'.id cat_id');
            $this->db->join($this->category, $this->service.'.category = '.$this->category.'.id', 'left');
            //$resp = $this->db->get($this->service);
            $this->db->where($this->service.".id", $this->input->post("id"));
            $resp = $this->db->get($this->service);
            $cat = $this->db->get($this->category);
            $arr = array("service" => $resp->row(), "category" => $cat->result());
            if($resp->num_rows()) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = $arr;
                $this->apiResponse['response_msg'] = 'Service data found';
            } else {
                $this->apiResponse['response_code'] = '201';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Service data not found';
            }
        } else {
            $this->apiResponse['response_code'] = '202';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Service id is not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function addService() {
        if($this->input->post()) {
            //if(!isset($this->input->post("id"))) {
                if($this->db->insert($this->service, $this->input->post())) {
                    $this->apiResponse['response_code'] = '200';
                    $this->apiResponse['response_data'] = array();
                    $this->apiResponse['response_msg'] = 'Service added successfully';
                }
            /*} else {
                $data = $this->input->post();
                unset($data['id']);
                $this->db->where("id", $data['id']);
                if($this->db->update($this->service, $data)) {
                    $this->apiResponse['response_code'] = '200';
                    $this->apiResponse['response_data'] = array();
                    $this->apiResponse['response_msg'] = 'Service edited successfully';
                }
            }*/
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Field must be filled';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function editService() {
        if($this->input->post()) {
            $id = $this->input->post("id");
            $data = $this->input->post();
            unset($data['id']);
            $this->db->where("id", $id);
            if($this->db->update($this->service, $data)) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Service edited successfully';
            }
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Field must be filled';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function deleteService() {
        if($this->input->post("id")) {
            $this->db->where("id", $this->input->post("id"));
            if($this->db->delete($this->service)) {
                $this->apiResponse['response_code'] = '200';
                $this->apiResponse['response_data'] = array();
                $this->apiResponse['response_msg'] = 'Service deleted successfully';
            }
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Service id not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }

    public function getCategory () {
        $resp = $this->db->get($this->category);
        if($resp->num_rows()>0) {
            $this->apiResponse['response_code'] = '200';
            $this->apiResponse['response_data'] = $resp->result();
            $this->apiResponse['response_msg'] = 'Category found';
        } else {
            $this->apiResponse['response_code'] = '201';
            $this->apiResponse['response_data'] = array();
            $this->apiResponse['response_msg'] = 'Category not found';
        }
        echo $response = json_encode($this->apiResponse);die;
    }
}
