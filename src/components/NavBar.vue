<template>
  <b-navbar toggleable="sm" type="light" variant="light" class="shadow-sm mb-3 bg-white rounded">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/demands/add" exact-active-class="active" class="text-uppercase">Add demand</b-nav-item>
        <b-nav-item to="/demands/list" exact-active-class="active" class="text-uppercase">All demands</b-nav-item>
        <b-nav-item to="/user/demands" exact-active-class="active" class="text-uppercase">Your demands</b-nav-item>
        <b-nav-item to="/user/profile" exact-active-class="active" class="text-uppercase">Profile</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>
