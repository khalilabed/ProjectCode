<template>
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand-->
        <router-link to="/" class="navbar-brand ps-3 pe-4" href="index.html">لوحة التحكم</router-link>
        <!-- Sidebar Toggle-->
        <!-- Navbar Search-->
        <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        </form>
        <!-- Navbar-->
        <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                <ul class="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdown">
                    <li><router-link :to="{ name: 'LoginPage' }" class="dropdown-item" >Logout</router-link></li>
                </ul>
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <router-link :to="{ name: 'HomePage' }"  class="nav-link">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt ps-2"></i></div>
                            الرئيسة
                        </router-link>
                        <router-link :to="{ name: 'ChartPage' }"  class="nav-link" >
                            <div class="sb-nav-link-icon"><i class="fas fa-chart-area ps-2"></i></div>
                            متوسط المصروف
                        </router-link>
                        <router-link :to="{ name: 'TablePage' }" class="nav-link" >
                            <div class="sb-nav-link-icon"><i class="fas fa-table ps-2"></i></div>
                            تسجيل المصروفات
                        </router-link>
                        <router-link :to="{ name: 'TotalSalary' }" class="nav-link">
                            <div class="sb-nav-link-icon"><i class="fas fa-table ps-2"></i></div>
                            الراتب الاجمالي
                        </router-link >
                        <router-link :to="{ name: 'TablePage' }"  class="nav-link">
                            <div class="sb-nav-link-icon"><i class="fas fa-table ps-2"></i></div>
                            تسجيل المصروفات
                        </router-link>
                        <router-link :to="{ name: 'ExpenseList' }" class="nav-link">
                            <div class="sb-nav-link-icon"><i class="fas fa-table ps-2"></i></div>
                            قائمة المصروفات
                        </router-link>
                    </div>
                </div>
            </nav>
        </div>
    </div>
     <router-view/>
</template>

<script>
export default {};
</script>
<style scoped>

</style>


