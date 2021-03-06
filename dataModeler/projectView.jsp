	<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

	<!DOCTYPE html>
	<html lang="en">

	  <head>

		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="description" content="">
		<meta name="author" content="">

		<title>SB Admin - Blank Page</title>

		<!-- Bootstrap core CSS-->
		<link href="/toddatamodel/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

		<!-- Custom fonts for this template-->
		<link href="/toddatamodel/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

		<!-- Page level plugin CSS-->
		<link href="/toddatamodel/vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
		
	<script>

	</script>

	<style>
	.custom-modal-dialog{
		   width: 800px;
		   height: 100px;
		   margin:0 auto;
		   display:table;
		   position: absolute;
		   left: 0;
		   right:0;
		   top: 50%; 
		   border:1px solid;
		   -webkit-transform:translateY(-50%);
		   -moz-transform:translateY(-50%);
		   -ms-transform:translateY(-50%);
		   -o-transform:translateY(-50%);
		   transform:translateY(-50%); 
	}


	.scrollit {
		overflow:scroll;
		height:300px;
		width:480px
	}
	</style>

		<!-- Custom styles for this template-->
	 <link href="/toddatamodel/css/sb-admin.css" rel="stylesheet">



	  </head>

	  <body id="page-top">

	<nav class="navbar navbar-expand navbar-dark bg-dark static-top">
	<!--      <a class="navbar-brand mr-1" href="index.html">Start Bootstrap</a> -->
	<button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
			<i class="fas fa-bars"></i>
		  </button>
		  
	<kbd class='offset-md-11 float-right'>${member.firstName}</kbd>

		  
		</nav>





		<div id="wrapper">
		  <!-- Sidebar -->
		  <ul class="sidebar navbar-nav">
		<li class="nav-item">
		
		<!--<a class="nav-link btn" data-toggle="modal" data-target="#createProjectModal" >Create Project</a>--> 
		</li>
		<li class="nav-item">
		<a class="nav-link btn" data-toggle="modal" data-target="#openProjectModal" >Open Project</a> 
		</li>
		<li class="nav-item">
		<a class="nav-link btn" data-toggle="modal" data-target="#saveProjectModal" >Save Project</a> 
		</li>
		
		<li class="nav-item">
		<a class="nav-link" href="/toddatamodel/webservice/memberService/logout">Logout</a>
		</li>
		
		  </ul>

	<div id="openProjectModal" name="openProjectModal" class="modal " role="dialog">
	<div class="modal-dialog">
	<div class="modal-content">
	<div class="modal-header">
	<h4 class="modal-title">Open project</h4>
	<button type="button" class="close" data-dismiss="modal">&times;</button>
	</div>
	<div class="modal-body">
	<h3>Poject:</h3>
	<div class="form-group">
	<div class="form-label-group">
	<select class="form-control" name="projectList" id="projectList" >

	<c:forEach items="${allProjects}" var="item">

	<option value="${item.code	}">${item.title}<br></option>

	</c:forEach>

	</select>
	</div>
	<label class="${errorBean.nameDnoneDnone} help-block label-danger">${errorBean.title}</label>
	</div>

	<button class="btn btn-primary" onclick="openProject()" >open</button>
	</div>
	<div class="modal-footer">
	<!--<a class="btn btn-primary btn-block" onclick="javascript:submitCreateProjectForm()">Create Project</a>-->
	</div>
	</div>
	</div>
	</div>
	<!--table create modal -->

	<div id="createTableModal" name="createTableModal" class="modal modal" role="dialog">
	<div class="modal-dialog">
	<div class="modal-content">
	<div class="modal-header">
	<h4 class="modal-title">Create Table</h4>
	<button type="button" class="close" data-dismiss="modal">&times;</button>
	</div>
	<div class="modal-body ">
	<div class="form-group">
	<div class="form-label-group">
	<input type="text" name="nameOfTable" id="nameOfTable" class="form-control" placeholder="Name of  Table" required="required">
	<label for="nameOfTable">Name Of Table</label>
	</div>
	<label class="${errorBean.nameDnone} help-block label-danger" id="tableNameError">${errorBean.name}</label>
	</div>

	<ul  class="nav nav-tabs" id="tabContent">
	<li class="nav-link tab active"><a href="#table-info" data-toggle="tab">Table-Info </a></li>
	<li><a class="nav-link tab"href="#fields"  data-toggle="tab">Fields</a></li>
	 </ul>

	<div class="tab-content">
	 <div class="tab-pane active" id="table-info">
	<div class="form-group">
	<div class='form-row'>
	<div class='col-md-6'>
	<div class="form-label-group">
	Engine:
	</div>
	</div>
	<div class='col-md-6'>
	<div class="form-label-group">

	<select class="form-control" name="engine" id="engine" >

	<c:forEach items="${databaseEngines}" var="item">

	<option value="${item.name}">${item.name}<br></option>

	</c:forEach>

	</select>
	</div>
	<label class="${errorBean.engineDnone} help-block label-danger">${errorBean.engine}</label>
	</div>
	</div>
	</div>



	<div class="form-group">
	<div class='form-row'>
	<div class='col-md-6'>
	<div class="form-label-group">
	Note:
	</div>
	</div>
	<div class='col-md-6'>
	<div class="form-label-group ">
	<textarea class="form-control" rows="5" id="note" name="note" placeholder="Note" required="required"></textarea>
	<label for="note">Note</label>
	</div>
	<label class="${errorBean.nameDnone} help-block label-danger">${errorBean.name}</label>
	</div>
	</div>
	</div>
	</div>

	<div class="tab-pane" id="fields">
	<div class="scrollit">
	<table class="table table-striped" id="myTable">
	<thead>
	<tr>
	<th>S.No</th>
	<th>Name</th>
	<th>Datatype</th>
	<th>Attributes</th>
	<th>Default</th>
	<th>Precision</th>
	<th>check</th>
	<th>Operation</th> 
	</tr>
	</thead>
	<tbody>
	</tbody> 
	</table>
	</div>
	<div id="addFieldForm" align="center">

	<div class="form-group">
	<div class='form-row'>
	<div class='col-sm-4'>
	<div class="form-label-group">
	<h5>Name :</h5>
	</div>
	</div>
	<div class='col-sm-6'>
	<div class="form-label-group ">
	<input type="text" name="fieldName" id="fieldName" class="form-control" placeholder="Field Name" required="required">
	<label for="fieldName">Field Name</label>
	</div>
	<label class="${errorBean.fieldName} help-block label-danger">${errorBean.Fieldname}</label>
	</div>
	</div>
	</div>

	<div class="form-group">
	<div class='form-row'>
	<div class='col-sm-4'>
	<div class="form-label-group">
	Datatype:
	</div>
	</div>
	<div class='col-sm-6'>
	<div class="form-label-group ">

	<select class="form-control" name="fieldDatatype" id="fieldDatatype"  onchange="selectedDataType()">

	<c:forEach items="${datatypes}" var="item">

	<option value="${item.datatype}">${item.datatype}<br></option>

	</c:forEach>
	</select>
	</div>
	<label class="${errorBean.fieldDatatype} help-block label-danger">${errorBean.fieldDatatype}</label>
	</div>
	</div>
	</div>

	<div class="form-group">
	<div class='form-row'>
	<div class='col-sm-4'>
	<div class="form-label-group">
	Width:
	</div>
	</div>
	<div class='col-sm-6'>
	<div class="form-label-group ">
	<input type="text" name="fieldWidth" id="fieldWidth" class="form-control" placeholder="fieldWidth" required="required">
	<label for="fieldWidth">Width</label>
	</div>
	<label class="${errorBean.fieldWidth} help-block label-danger">${errorBean.fieldWidth}</label>
	</div>
	</div>
	</div>


	<div class="form-group">
	<div class='form-row'>
	<div class='col-sm-4'>
	<div class="form-label-group">
	Precision
	</div>
	</div>
	<div class='col-sm-6'>
	<div class="form-label-group ">
	<input type="text" name="precisionValue" id="precisionValue" class="form-control" placeholder="precisionValue" required="required">
	<label for="precisionValue">precisionValue</label>
	</div>
	<label class="${errorBean.precisionValue} help-block label-danger">${errorBean.precisionValue}</label>
	</div>
	</div>
	</div>


	<div class="form-group">
	<div class='form-row'>
	<div class='col-sm-4'>
	<div class="form-label-group">
	Attribute
	</div>
	</div>
	<div class='col-sm-6'>
	<div class="form-label-group  form-inline ">
	NN  
	<input type="checkBox" name="notNull" id="notNull" class="form-control" placeholder="notNull" required="required">
	UK  
	<input type="checkBox" name="uniqueKey" id="uniqueKey" class="form-control" placeholder="uniqueKey" required="required">
	PK  
	<input type="checkBox" name="primaryKey" id="primaryKey" class="form-control" placeholder="primaryKey" required="required">
	AI 	 
	<input type="checkBox" name="autoIncrement" id="autoIncrement" class="form-control" placeholder="autoIncrement" required="required">

	</div>
	<label class="${errorBean.Attribute} help-block label-danger">${errorBean.Attribute}</label>
	</div>
	</div>
	</div>


	<div class="form-group">
	<div class='form-row'>
	<div class='col-sm-4'>
	<div class="form-label-group">
	Check:
	</div>
	</div>
	<div class='col-sm-6'>
	<div class="form-label-group ">
	<input type="text" name="fieldCheck" id="fieldCheck" class="form-control" placeholder="fieldCheck" required="required" >
	<label for="fieldCheck">Check</label>
	</div>
	<label class="${errorBean.fieldCheck} help-block label-danger">${errorBean.fieldCheck}</label>
	</div>
	</div>
	</div>

	<div class="form-group">
	<div class='form-row'>
	<div class='col-sm-4'>
	<div class="form-label-group">
	Default
	</div>
	</div>
	<div class='col-sm-6'>
	<div class="form-label-group ">
	<input type="text" name="defaultValue" id="defaultValue" class="form-control" placeholder="defaultValue" required="required">
	<label for="defaultValue">defaultValue</label>
	</div>
	<label class="${errorBean.defaultValue} help-block label-danger">${errorBean.defaultValue}</label>
	</div>
	</div>
	</div>



	<div class="form-group">
	<div class='form-row'>
	<div class='col-sm-4'>
	<div class="form-label-group">
	Note:
	</div>
	</div>
	<div class='col-sm-6'>
	<div class="form-label-group ">
	<input type="text" name="fieldNote" id="fieldNote" class="form-control" placeholder="fieldNote" required="required">
	<label for="fieldNote">Note</label>
	</div>
	<label class="${errorBean.fieldNote} help-block label-danger">${errorBean.fieldNote}</label>
	</div>
	</div>
	</div>




	<div class="form-group">
	<div class="form-label-group">
	<button type='button' onclick='addField()' class="btn btn-primary btn-block">ADD</button>


	</div>
	</div>




	</div>

	<div id="updateFieldForm" style="display:none">
	</div>
	<div id="deleteFieldForm" style="display:none">
	</div>






	</div> 
	</div>






	</div>
	<div class="modal-footer">

	<!--<a class="btn btn-primary btn-block" onclick="javascript:submitCreateProjectForm()">Create Project</a>-->
	</div>
	</div>
	</div>
	</div>

	<div id="projectInfo">



	</div>


			 <div >
			 <canvas id="myCanvas" width="1123" height="510" style="border:1px solid #000000">
			 
			 </canvas>
			 </div>
			 
			

		  <div id="content-wrapper">
			 
			 
	 
			<!-- Sticky Footer -->
			<footer class="sticky-footer">
			  <div class="container my-auto">
				<div class="copyright text-center my-auto">
				  <span>Copyright � Nikhil soni  2018</span>
				</div>
			  </div>
			</footer>

		  </div>
		  <!-- /.content-wrapper -->

		</div>
		<!-- /#wrapper -->

		<!-- Scroll to Top Button-->
		<a class="scroll-to-top rounded" href="#page-top">
		  <i class="fas fa-angle-up"></i>
		</a>
		<script src="/toddatamodel/vendor/jquery/jquery.min.js"></script>
		<!-- Core plugin JavaScript-->
		<script src="/toddatamodel/vendor/jquery-easing/jquery.easing.min.js"></script>

		<!-- Bootstrap core JavaScript-->

		<script src="/toddatamodel/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
		<script src="/toddatamodel/webservice/js/TMService.js"></script>
	<script src="/toddatamodel/webservice/js/project.js"></script>
	<script src="/toddatamodel/js/homepage.js"></script>
	<script src="/toddatamodel/js/projectView.js"></script>
	<!--<script src="/toddatamodel/js/fontmetrics.js"></script>-->
	  </body>

	 </html>