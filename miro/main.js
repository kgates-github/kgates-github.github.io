
rtb.onReady(() => {
  rtb.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Sticker resizer',
        svgIcon: '<circle cx="12" cy="12" r="9" fill="#cc9900" fill-rule="evenodd" stroke="#cc9900" stroke-width="2"/>',
        positionPriority: 1,
        onClick: async () => {
          rtb.board.ui.openLeftSidebar('sidebar.html')
          /*
          // Get selected widgets
          let selectedWidgets = await rtb.board.selection.get()

          // Filter stickers from selected widgets
          let stickers = selectedWidgets.filter(widget => widget.type === 'STICKER')
          const scales = stickers.map(s => s.scale)
          const min = Math.min(...scales)
          const max = Math.max(...scales)
          const avg = scales.reduce((a, b) => a + b) / stickers.length
          
          // Create shapes from selected stickers
          await rtb.board.widgets.update(stickers.map(sticker => ({
            id: sticker.id,
            scale: min
          })))

          // Show success message
          rtb.showNotification('Stickers have been resized')
          */
        }
      }
    }
  })
})
