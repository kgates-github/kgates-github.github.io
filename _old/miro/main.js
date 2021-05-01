

rtb.onReady(() => {
  rtb.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Sticker resizer',
        svgIcon: '<rect x="0" y="0" width="20" height="20" stroke="black" stroke-width="1"/><rect x="0" y="0" width="5" height="5" stroke="red" stroke-width="1"/>',
        positionPriority: 1,
        onClick: async () => {
          rtb.board.ui.openLeftSidebar('sidebar.html')
        }
      }
    }
  })
})
