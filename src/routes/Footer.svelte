<script>
	import { OWNER_NAME, links } from "$lib/config";

  const currentYear = new Date().getFullYear();
</script>

<footer class="pb-1 flex justify-center gap-2 [&>*]:opacity-30">
  <p>© {currentYear} {OWNER_NAME}</p>
  <span>•</span>
  <a href="/imprint" class="hover:opacity-70 transition-opacity">Imprint</a>
  <span>•</span>
  <a href={links.source} class="hover:opacity-70 transition-opacity">GitHub</a>
</footer>