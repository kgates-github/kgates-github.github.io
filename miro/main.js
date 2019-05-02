rtb.onReady(() => {
  rtb.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Sticker to shapes',
        svgIcon: '<circle cx="12" cy="12" r="9" fill="#00ff00" fill-rule="evenodd" stroke="00ff00" stroke-width="2"/>',
        positionPriority: 1,
        onClick: async () => {

          // Get selected widgets
          let selectedWidgets = await rtb.board.selection.get()

          // Filter stickers from selected widgets
          let stickers = selectedWidgets.filter(widget => widget.type === 'STICKER')
          
          stickers.forEach(function (sticker) {
            console.log("!", sticker);
          })

          // Delete selected stickers
          //await rtb.board.widgets.deleteById(stickers.map(sticker => sticker.id))

          // Create shapes from selected stickers
          rtb.board.widgets.update(stickers.map(sticker => ({
            width: sticker.bounds.width,
            height: sticker.bounds.height,
          })))

          // Show success message
          rtb.showNotification('Stickers resized')
        }
      }
    }
  })
})
// 48d3f0dc-5697-4d7f-96fb-05a6fcadeb67