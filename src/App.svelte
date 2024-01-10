<script>
  import Homepage from "./pages/Homepage.svelte";
  import Mypage from "./pages/Mypage.svelte";
  import Write from "./pages/Write.svelte";
  import NotFound from "./pages/Notfound.svelte";
  import Router from "svelte-spa-router";
  import "./css/style.css";

  const routes = {
    "/": Homepage,
    "/mypage": Mypage,
    "/write": Write,
    "*": NotFound,
  };
</script>

<Router {routes} />
