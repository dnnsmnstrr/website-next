<script context="module">
  // import  DragDropTouch  from 'svelte-drag-drop-touch' // for mobile platforms
  import { asDraggable } from 'svelte-drag-and-drop-actions'
</script>

<script>
  let DraggableX = 20, DraggableY = 20, DraggableWidth = 80, DraggableHeight = 30
  let ArenaWidth = 400, ArenaHeight = 400

  function onDragMove (x,y, dx,dy) { DraggableX = x; DraggableY = y }
  function onDragEnd  (x,y, dx,dy) { DraggableX = x; DraggableY = y }
</script>

<div style="
  display:block; position:relative;
  width:{ArenaWidth}px; height:{ArenaHeight}px; margin:20px;
  border:dotted 1px black; border-radius:4px;
">
  <div style="
    display:block; position:absolute;
    left:{DraggableX}px; top:{DraggableY}px; width:{DraggableWidth}px; height:{DraggableHeight}px;
    background:forestgreen; color:white; line-height:30px; text-align:center; cursor:move;
  " use:asDraggable={{
    minX:0,minY:0, maxX:ArenaWidth-DraggableWidth,maxY:ArenaHeight-DraggableHeight,
    onDragStart:{x:DraggableX,y:DraggableY}, onDragMove, onDragEnd
  }}
  >Drag me!</div>
</div>
