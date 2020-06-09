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

    <!-- Custom styles for this template-->
    <link href="/toddatamodel/css/sb-admin.css" rel="stylesheet">
<script src="/toddatamodel/webservice/js/TMService.js"></script>
<script src="/toddatamodel/webservice/js/project.js"></script>
<script src="/toddatamodel/js/homepage.js"></script>











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
	<a class="nav-link" href="/toddatamodel/webservice/memberService/logout">Logout</a>
	</li>
	<li class="nav-item">
	<a class="nav-link btn" data-toggle="modal" data-target="#createProjectModal" >Create Project</a> 
	</li>
      </ul>

<div id="createProjectModal" name="createProjectModal" class="modal " role="dialog">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h4 class="modal-title">Create a new project</h4>
<button type="button" class="close" data-dismiss="modal">&times;</button>
</div>
<div class="modal-body">
<form id="createProjectForm" action="/toddatamodel/webservice/project/create" method="GET">
<div class="form-group">
<div class="form-label-group">
<input type="text" name="argument-1" id="argument-1" class="form-control" placeholder="Name of project" required="required">
<label for="argument-1">Name Of Project</label>
</div>
<label class="${errorBean.nameDnone} help-block label-danger">${errorBean.nameOfProject}</label>
</div>
<div class="form-group">
<div class="form-label-group">
<select class="form-control" name="argument-2" id="argument-2" >

<c:forEach items="${databaseArchitectures}" var="item">

<option value="${item.code}">${item.name}<br></option>

</c:forEach>

</select>


</div>
<label class="${errorBean.dbmsDnone} help-block label-danger">${errorBean.dbms}</label>
</div>
<button class="btn btn-primary" type="submit" >create</button>
</form>
</div>
<div class="modal-footer">
<!--<a class="btn btn-primary btn-block" onclick="javascript:submitCreateProjectForm()">Create Project</a>-->
</div>
</div>
</div>
</div>

      <div id="content-wrapper">

        <div class="container-fluid">


        </div>
        <!-- /.container-fluid -->

        <!-- Sticky Footer -->
        <footer class="sticky-footer">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright © Nikhil soni  2018</span>
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

    <!-- Core plugin JavaScript-->
    <script src="/toddatamodel/vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Bootstrap core JavaScript-->
    <script src="/toddatamodel/vendor/jquery/jquery.min.js"></script>
    <script src="/toddatamodel/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>


  </body>
<script>
$(window).on('load',function(){
if('${showCreateProjectModal}')$("#createProjectModal").modal("show");
});
</script>
</html>