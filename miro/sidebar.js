rtb.onReady(() => {
  // subscribe on user selected widgets
  rtb.addListener(rtb.enums.event.SELECTION_UPDATED, getWidget)
  getWidget()
})

const resizeButton = document.getElementById('resizeButton')
var selectedWidgets = null
console.log(resizeButton)

async function getWidget() {
  // Get selected widgets
  selectedWidgets = await rtb.board.selection.get()
}

resizeButton.onclick = (e) => {
  console.log("!", this)
  setSize()
}

async function setSize() {
  let selectedWidgets = await rtb.board.selection.get()
  // Filter stickers from selected widgets
  let stickers = selectedWidgets.filter(widget => widget.type === 'STICKER')
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
