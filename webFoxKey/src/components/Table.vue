<template>
  <div id="page-top">
    <!-- Page Wrapper -->
    <div id="wrapper">
      <!-- Sidebar -->
      <Sidebar />
      <!-- End of Sidebar -->

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <!-- Topbar -->
          <Topbar />
          <!-- End of Topbar -->

          <!-- Begin Page Content -->
          <div class="container-fluid">
            <!-- Page Heading -->
            <h1 class="h3 mb-2 text-gray-800">Tables</h1>
            <p class="mb-4">
              DataTables is a third party plugin that is used to generate the demo table below.
              For more information about DataTables, please visit the
              <a target="_blank" href="https://datatables.net">official DataTables documentation</a>.
            </p>

            <!-- DataTales Example -->
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Age</th>
                        <th>Start date</th>
                        <th>Salary</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Age</th>
                        <th>Start date</th>
                        <th>Salary</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      <tr v-for="(employee, index) in employees" :key="index">
                        <td>{{ employee.name }}</td>
                        <td>{{ employee.position }}</td>
                        <td>{{ employee.office }}</td>
                        <td>{{ employee.age }}</td>
                        <td>{{ employee.startDate }}</td>
                        <td>{{ employee.salary }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright &copy; Your Website {{ currentYear }}</span>
            </div>
          </div>
        </footer>
        <!-- End of Footer -->
      </div>
      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <LogoutModal />
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import Topbar from './Topbar.vue';
import LogoutModal from './LogoutModal.vue';
import $ from 'jquery';
import 'datatables.net'
import 'datatables.net-dt'


export default {
  name: 'TablesPage',
  components: {
    Sidebar,
    Topbar,
    LogoutModal
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      employees: [
        { name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', age: 61, startDate: '2011/04/25', salary: '$320,800' },
        { name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', age: 63, startDate: '2011/07/25', salary: '$170,750' },
        // ... outros dados da tabela
      ],
      dataTable: null // Para armazenar a instância do DataTable
    };
  },
  mounted() {
    this.initDataTable();
  },
  beforeUnmount() {
    // Destruir a instância do DataTable quando o componente for desmontado
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  },
  methods: {
    initDataTable() {
      this.$nextTick(() => {
        // Verificar se a tabela existe no DOM
        const table = $('#dataTable');
        if (table.length) {
          this.dataTable = table.DataTable({
            responsive: true,
            // Outras opções de configuração podem ser adicionadas aqui
          });
        }
      });
    }
  }
};
</script>

<style scoped>
/* Importação do CSS dentro do estilo scoped */

/* Estilos adicionais para personalização */
.dataTables_wrapper .dataTables_filter input {
  margin-left: 0.5em;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
}

.dataTables_wrapper .dataTables_length select {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px;
}

.dataTables_wrapper .dataTables_paginate .paginate_button {
  padding: 0.5em 1em;
  margin: 0 2px;
  border: 1px solid transparent;
  border-radius: 4px;
}

.dataTables_wrapper .dataTables_paginate .paginate_button.current {
  background: #6777ef;
  color: white !important;
  border: 1px solid #6777ef;
}
</style>