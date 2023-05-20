<template>
<div class="sb-nav-fixed">
    <nav class="navbar navbar-expand-lg navbar-dark bg mb-5 text-w">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <router-link to="/LoginPage"  class="nav-link text-white  fw-bold hovers">تسجيل دخول  </router-link>
            </li>   
            <li class="nav-item">
            <router-link to="/"  class="nav-link text-white fw-bold hovers">انشاء حساب  </router-link>
            </li> 
        </ul>
        </div>
    </div>
    </nav>
    <router-view/>
    
</div>
</template>

<script>

export default {
    
};
</script>
<style scoped>
.bg {
    background-color: #f48982;
}
.hovers:hover{
    color: black !important; 
}

</style>
