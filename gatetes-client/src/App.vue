<template>
  <div id="app">
    <div id="container">
      <nav class="navbar  is-primary" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://www.vilanetcon.org">
            <img src="https://www.vilanetcon.org/templates/yootheme/cache/logo-18-bc11b5e0.png" width="112" height="28">
          </a>

          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbar" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">
              Home
            </a>

          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary">
                  <strong>Registro</strong>
                </a>
                <a class="button is-light">
                  Inicio de sesión
                </a>
              </div>
            </div>
          </div>
        </div>


</nav>
    </div>
    <div class="container">
      <router-view/>      
    </div>    
  </div>
</template>

<style>
</style>
