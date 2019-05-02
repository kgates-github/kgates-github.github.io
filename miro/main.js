
rtb.onReady(() => {
  rtb.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Sticker to shapes',
        svgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
        positionPriority: 1,
        onClick: async () => {

          // Get selected widgets
          let selectedWidgets = await rtb.board.selection.get()

          // Filter stickers from selected widgets
          let stickers = selectedWidgets.filter(widget => widget.type === 'STICKER')
          const min = Math.min(...stickers.map(s => s.scale))
          console.log(min, stickers)

          // Create shapes from selected stickers
          await rtb.board.widgets.update(stickers.map(sticker => ({
            id: sticker.id,
            scale: 1
          })))

          // Show success message
          rtb.showNotification('Stickers has been converted')
        }
      }
    }
  })
})