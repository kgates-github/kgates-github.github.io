rtb.onReady(() => {
  // subscribe on user selected widgets
  rtb.addListener(rtb.enums.event.SELECTION_UPDATED, getWidget)
  const resizeButton = document.getElementById('resizeButton')
  const tip = document.getElementById('tip')
  var selectedWidgets = null
  getWidget()
})

resizeButton.onclick = (e) => {
  resize()
}

async function getWidget() {
  // Get selected widgets
  selectedWidgets = await rtb.board.selection.get()
  if (selectedWidgets.length) tip.style.display = 'none';
  else tip.style.display = 'block';
  resize()
}

async function resize() {
  // Filter stickers from selected widgets
  let stickers = selectedWidgets.filter(widget => widget.type === 'STICKER')
  
  // Separate square and rect stickers
  const squareStickers = stickers.filter(s => s.bounds.height / s.bounds.width > 1.0)
  const rectStickers = stickers.filter(s => s.bounds.height / s.bounds.width < 1.0)
  
  setSize(squareStickers)
  setSize(rectStickers)

  // Show success message
  rtb.showNotification('Stickers have been resized')
}

async function setSize(stickers) {
  const scales = stickers.map(s => s.scale)
  const min = Math.min(...scales)
  const max = Math.max(...scales)
  const avg = scales.reduce((a, b) => a + b) / stickers.length
 
  await rtb.board.widgets.update(stickers.map(sticker => ({
    id: sticker.id,
    scale: min
  })))
}
