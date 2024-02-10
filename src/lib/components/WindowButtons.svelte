<script lang="ts">
  import {
    X,
    Minus,
    ChevronsLeftRight
  } from "lucide-svelte";
</script>

<div class="inline-flex items-center space-x-2 m-3 [:hover&>div>*]:opacity-40">
  <div class="bg-red-500 rounded-full w-3.5 h-3.5 focus:opacity-50">
    <X size=14 class="opacity-0"/>
  </div>
  <div class="bg-yellow-500 rounded-full w-3.5 h-3.5 focus:opacity-50">
    <Minus size=14 class="opacity-0"/>
  </div>
  <div class="bg-green-500 rounded-full w-3.5 h-3.5 focus:opacity-50">
    <ChevronsLeftRight size=14 class="opacity-0 rotate-45"/>
  </div>
</div>