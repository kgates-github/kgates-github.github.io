rtb.onReady(() => {
  // subscribe on user selected widgets
  rtb.addListener(rtb.enums.event.SELECTION_UPDATED, getWidget)
  getWidget()
})

const resizeButton = document.getElementById('resizeButton')
const tip = document.getElementById('tip')
var selectedWidgets = null

async function getWidget() {
  // Get selected widgets
  selectedWidgets = await rtb.board.selection.get()
  if (selectedWidgets.length) tip.style.display = 'none';
  else tip.style.display = 'block';
}

resizeButton.onclick = (e) => {
  setSize()
}

async function setSize() {
  // Filter stickers from selected widgets
  let stickers = selectedWidgets.filter(widget => widget.type === 'STICKER')
  // Only change square stickers
  stickers = stickers.filter(s => s.bounds.height / s.bounds.width > 1.0)
 
  stickers.forEach(s => {
    console.log(s)
  })
  
  const scales = stickers.map(s => s.scale)
  const min = Math.min(...scales)
  const max = Math.max(...scales)
  const avg = scales.reduce((a, b) => a + b) / stickers.length
 
  await rtb.board.widgets.update(stickers.map(sticker => ({
    id: sticker.id,
    scale: min
  })))

  // Show success message
  rtb.showNotification('Stickers have been resized')
}
