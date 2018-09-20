<?php
class MY_Controller extends CI_Controller 
{
	public function __construct() {
		parent::__construct();
		
		$user_session = $this->session->userdata('user_session');
		
		if (empty($user_session) && $this->uri->segment(1) != 'login' && $this->uri->segment(1) != 'logout') {
			redirect('login');
		}
		
		if (!empty($user_session) && $this->uri->segment(1) == 'login') {
			redirect('dashboard');
		}
	}
}