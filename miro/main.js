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
          
          stickers.forEach(function (sticker) {
            console.log(sticker.id);
          })
          

          // Delete selected stickers
          //await rtb.board.widgets.deleteById(stickers.map(sticker => sticker.id))

          // Create shapes from selected stickers
          //await rtb.board.widgets.create(stickers.map(sticker => ({
            //type: 'shape',
            //text: sticker.text,
            //x: sticker.x,
            //y: sticker.y,
            //width: sticker.bounds.width,
            //height: sticker.bounds.height,
          //})))

          // Show success message
          rtb.showNotification('Stickers has been converted')
        }
      }
    }
  })
})
// 48d3f0dc-5697-4d7f-96fb-05a6fcadeb67