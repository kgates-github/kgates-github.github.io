
rtb.onReady(() => {
  rtb.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Sticker resizer',
        svgIcon: '<circle cx="12" cy="12" r="9" fill="#cc9900" fill-rule="evenodd" stroke="#cc9900" stroke-width="2"/>',
        positionPriority: 1,
        onClick: async () => {
          rtb.board.ui.openLeftSidebar('sidebar.html')
        }
      }
    }
  })
})
