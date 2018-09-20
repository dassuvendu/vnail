<?php
class MY_Model extends CI_Model
{
	public function __construct() {
		parent::__construct();
	}
	
	function common_select($table='',$condition='',$sortArr='',$limit = ''){
		$CI =& get_instance();
		if ($sortArr != '' && is_array($sortArr)){
			foreach ($sortArr as $sortRow){
				if (is_array($sortRow)){
				
					$CI->db->order_by($sortRow['field'],$sortRow['type']);
				}
			}
		}
		if($limit !=''){
			$CI->db->limit($limit);
		}
		//echo $this->db->last_query(); 
		return $CI->db->get_where($table,$condition);
	}
	
	function common_list($table,$join_array,$where_array,$order_by_array,$group_by_array,$limit_array)
	{
		$CI =& get_instance();
		$CI->db->select('*');
		$CI->db->from($table);
		
		if ($join_array != '' && is_array($join_array))
		{
			foreach ($join_array as $key=>$value)
			{				
				$CI->db->join($key,$value,'left');
			}
		}
		if ($where_array != '' && is_array($where_array))
		{
			foreach ($where_array as $wkey=>$wvalue)
			{				
				$CI->db->where($wkey,$wvalue);
			}
		}		
		if ($order_by_array != '' && is_array($order_by_array))
		{
			foreach ($order_by_array as $okey=>$ovalue)
			{				
				$CI->db->order_by($okey,$ovalue);
			}
		}		
		if ($group_by_array != '' && is_array($group_by_array))
		{
			foreach ($group_by_array as $gkey=>$gvalue)
			{				
				$CI->db->group_by($gkey);
			}
		}
		if ($limit_array != '' && is_array($limit_array))
		{
			foreach ($limit_array as $lkey=>$lvalue)
			{				
				$CI->db->limit($lkey);
			}
		}
			
		$query = $CI->db->get();
		
		if($query->num_rows() > 0)
		{
			return $query->result_array();
		}
		else{
			return false;
		}
	}	
	
	function common_insert($table,$post_array)
	{
		$CI =& get_instance();
		$CI->db->insert($table,$post_array);
		$insert = $CI->db->insert_id();
		
		if($insert > 0)
		{
			return $insert;
		}
		else{
			return false;
		}
	}
	
	function common_update($table,$post_array,$where,$id)
	{
		$CI =& get_instance();
		$CI->db->where($where,$id);
		$query = $CI->db->update($table,$post_array);
		
		if(!empty($query))
		{
			return true;
		}
		else{
			return false;
		}
	}
	
	function common_update_array($table,$post_array,$where_array)
	{
		$CI =& get_instance();
		if ($where_array != '' && is_array($where_array))
		{
			foreach ($where_array as $wkey=>$wvalue)
			{				
				$CI->db->where($wkey,$wvalue);
			}
		}
		$query = $CI->db->update($table,$post_array);
		
		if(!empty($query))
		{
			return true;
		}
		else{
			return false;
		}
	}
	
	function common_delete($table,$where,$id)
	{
		$CI =& get_instance();
		$CI->db->where($where,$id);
		$query = $CI->db->delete($table);
		
		if(!empty($query))
		{
			return true;
		}
		else{
			return false;
		}
	}
}