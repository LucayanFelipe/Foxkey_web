<template>
  <div id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

      <!-- Sidebar -->
      <Sidebar />

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
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
              <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                  class="fas fa-download fa-sm text-white-50"></i> Gerar relatório</a>
            </div>

            <!-- Content Row -->
            <div class="row">
              <!-- Earnings (Monthly) Card Example -->
              <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2 ml-3">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-2">
                          Vencidas</div>

                        <div class="h5 mb-0 font-weight-bold text-gray-800">$2,492</div>
                      </div>
                      <div class="col-auto text-gray-800">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-2 mr-3">12/03/24</div>
                        <i class="fas fa-calendar fa-2x text-gray-300 ml-2"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>




            </div>

            <!-- Content Row -->
            <div class="row">
              <!-- Area Chart -->
              <div class="col-xl-8 col-lg-7">

                <div class="card shadow mb-4">

                  <div class="py-2 p-3 mt-2 d-flex flex-row align-items-center justify-content-between">
                    <div> <a href="#" class="btn btn-success btn-icon-split">
                        <span class="text">Abrir caixa</span>
                      </a></div>
                    <div>
                      <a href="#" class="btn btn-danger btn-icon-split">
                        <span class="text">Fechar caixa</span>
                      </a>
                    </div>
                  </div>

                  <!-- Card Body -->
                  <div class="card-body">
                    <div class="chart-area">

                      <!-- aqui poe as coisa -->
                      <!-- DataTales Example -->
                      <div class="card shadow mb-4">
                        <div class="card-header py-3">
                          <div class="d-flex justify-content-between">
                            <div class="mt-3">
                              <h6 class="m-0 font-weight-bold text-primary">Vender produtos</h6>
                            </div>
                            <div>
                              <a href="#" class="btn btn-primary btn-icon-split">
                                <span class="text">adicionar produtos</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                              <thead>
                                <tr>
                                  <th>produto</th>
                                  <th>quantidade</th>
                                  <th>Em estoque</th>
                                  <th>preço unitário</th>
                                  <th>ação</th>
                                </tr>
                              </thead>

                              <tbody>
                                <tr v-for="(employee, index) in employees" :key="index">
                                  <td>{{ employee.produto }}</td>
                                  <td>{{ employee.qtd }}</td>
                                  <td>{{ employee.estoque }}</td>
                                  <td>{{ employee.unit }}</td>
                                  <td>{{ employee.acao }}</td>

                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>



                      <canvas id="myAreaChart">
                      </canvas>


                    </div>
                  </div>
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
              <span>Copyright &copy; FoxKey 2025</span>
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

    <LogoutModal />
  </div>
</template>

<script>
import Sidebar from '../../src/components/SideBar.vue';
import Topbar from '../../src/components/Topbar.vue';
import LogoutModal from '../../src/components/LogoutModal.vue';
import 'datatables.net'
import 'datatables.net-dt'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

export default {

  data() {
    return {
      currentYear: new Date().getFullYear(),
      employees: [
        { produto: 'Coca cola 2 litros', qtd: '2', estoque: '540', unit: 12.00, acao: 'excluir' },
        // ... outros dados da tabela
      ],
      dataTable: null // Para armazenar a instância do DataTable
    };
  },

  components: {
    Sidebar,
    Topbar,
    LogoutModal,
  },
  name: 'HomeView',
  mounted() {
    // Initialize scripts when component is mounted
    this.loadScripts();
  },
  methods: {
    loadScripts() {

      // Initialize charts and other plugins
      if (typeof Chart !== 'undefined') {
        // Area Chart
        if (document.getElementById('myAreaChart')) {
          // Initialize area chart
        }

        // Pie Chart
        if (document.getElementById('myPieChart')) {
          // Initialize pie chart
        }
      }
    }
  }
}
</script>

<style scoped></style>
