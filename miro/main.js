rtb.onReady(() => {
  rtb.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Sticker to shapes',
        svgIcon: '<circle cx="12" cy="12" r="9" fill="#ffcc00" fill-rule="evenodd" stroke="ffcc00" stroke-width="2"/>',
        positionPriority: 1,
        onClick: async () => {

          // Get selected widgets
          let selectedWidgets = await rtb.board.selection.get()

          // Filter stickers from selected widgets
          let stickers = selectedWidgets.filter(widget => widget.type === 'STICKER')
          
          //stickers[0].bounds.width = 340;

          stickers.forEach(function (sticker) {
            console.log(sticker);
            sticker.bounds.width = 340;
          })

          // Show success message
          rtb.showNotification('Stickers resized')
        }
      }
    }
  })
})
// 48d3f0dc-5697-4d7f-96fb-05a6fcadeb67