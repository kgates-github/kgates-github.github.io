

rtb.onReady(() => {
  rtb.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Sticker resizer',
        svgIcon: '<rect x="0" y="0" width="10" height="10" stroke="black" stroke-width="2"/><rect x="0" y="0" width="5" height="5" stroke="black" stroke-width="2"/>',
        positionPriority: 1,
        onClick: async () => {
          rtb.board.ui.openLeftSidebar('sidebar.html')
        }
      }
    }
  })
})
