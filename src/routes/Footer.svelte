<script>
	import { OWNER_NAME } from "$lib/config";

  const year = new Date().getFullYear();
</script>

<footer class="pb-1 flex justify-center gap-2 [&>*]:opacity-30">
  <p>© {year} {OWNER_NAME}</p>
  <span>•</span>
  <a href="/imprint" class="hover:opacity-70 transition-opacity">Imprint</a>
</footer>